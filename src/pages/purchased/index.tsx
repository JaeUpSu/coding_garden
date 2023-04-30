// import { VStack, SimpleGrid, Text } from "@chakra-ui/react";
// import { LectureCard } from "./components/LectureCard";

// export function PaymentsResultPage() {
//   const lectures = sessionStorage.getItem("buy_lectures")?.split("^@^");
//   const name = sessionStorage.getItem("buy_username");
//   const idArr =
//     lectures &&
//     lectures[0]?.split(",").map(function (item) {
//       return parseInt(item, 10);
//     });
//   const titleArr = lectures && lectures[1]?.split(",");
//   const thumbnailArr = lectures && lectures[2]?.split(",");
//   const instructorArr = lectures && lectures[3]?.split(",");

//   return (
//     <VStack>
//       <Text fontWeight="bold" fontSize="30px">
//         {name} 님 구매완료
//       </Text>
//       <SimpleGrid
//         spacing={4}
//         templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
//         w="80%"
//       >
//         {idArr?.map((item, idx) => {
//           return (
//             <LectureCard
//               key={idx}
//               id={item}
//               title={titleArr ? titleArr[idx] : ""}
//               thumbnail={thumbnailArr ? thumbnailArr[idx] : ""}
//               instructor={instructorArr ? instructorArr[idx] : ""}
//             />
//           );
//         })}
//       </SimpleGrid>
//     </VStack>
//   );
// }

import React, { useEffect } from "react";
import { useRouter } from "next/router";

import MylectureCard from "@/components/MyLectureCard/MyLectureCard";
import {
  Heading,
  Text,
  Button,
  Container,
  VStack,
  HStack,
  Grid,
  GridItem,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { BsCheckCircle } from "react-icons/bs";

import { getAllLectures } from "@/services/api";
import SkeletonCard from "@/components/LectureCard/SkeletonCard";
import Seo from "@/components/Seo/Seo";
import { skeletonArray } from "@/services/constant";
import SkeletonPurchasedCard from "@/components/LectureCard/SkeletonPurchasedCard";

interface CalculatedLectureItem {
  img: string;
  LectureId: number;
  thumbnail: string;
  lectureDescription: string;
  lectureTitle: string;
  targetAudience: string;
  rating: number;
  instructor: {
    username: string;
  };
}

const PaymentsResultPage: React.FC = () => {
  const router = useRouter();

  const bg = useColorModeValue("gray.50", "gray.800");
  const { isLoading, data, isError } = useQuery(["lecturex"], getAllLectures, {
    onSuccess(data) {
      console.log("all", data.data);
    },
  });

  const onMyPage = () => {
    router.push(`/mypage/lectures`);
  };
  const onWholeLectures = () => {
    router.push(`/lectures/all/all/?page=1`);
  };

  if (isError) {
    router.push("/notfound");
    console.log("hello");
  }
  useEffect(() => {
    if (isError) {
      router.push("/notfound");
    }
  }, [isError, router]);

  return (
    <div>
      <Seo title="구매 완료" />
      <Divider />
      <Grid>
        <Container maxW="container.xl" pt={12}>
          <VStack
            bg={bg}
            borderRadius="md"
            boxShadow="base"
            p={8}
            spacing={5}
            textAlign="center"
            width="100%"
          >
            <BsCheckCircle fill="#9AE6E4" size={58} />
            <Heading as="h1" size={"2xl"}>
              구매가 완료되었습니다!
            </Heading>
            <Text fontSize="xl">
              Thank you for your purchase. You can check the courses you have
              purchased to your mypage.
            </Text>
          </VStack>
          <VStack bg={bg} pb="5" mb="5">
            <HStack mt="6">
              <Button colorScheme="green" onClick={onMyPage}>
                마이페이지
              </Button>
              <Button colorScheme="green" onClick={onWholeLectures}>
                강의 더 찾아보기
              </Button>
            </HStack>
          </VStack>
        </Container>
        <GridItem mx="auto">
          <Grid templateColumns={["repeat(1, 1fr)", "repeat(4, 1fr)"]} gap="5">
            {!isLoading
              ? data?.data?.map((lecture: CalculatedLectureItem) => (
                  <GridItem key={lecture.LectureId} mx="auto">
                    <MylectureCard
                      lectureNumber={lecture.LectureId}
                      img={lecture.thumbnail}
                      lectureDescription={lecture.lectureDescription}
                      lectureTitle={lecture.lectureTitle}
                      targetAudience={lecture.targetAudience}
                      instructor={lecture.instructor.username}
                      isInstructor={true}
                      // rating={lecture.rating}
                    />
                  </GridItem>
                ))
              : skeletonArray.map((_: number, idx: number) => (
                  <SkeletonPurchasedCard key={idx} />
                ))}
          </Grid>
        </GridItem>
      </Grid>
    </div>
  );
};

export default PaymentsResultPage;
