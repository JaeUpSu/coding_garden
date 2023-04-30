import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

import { hsl, parseToHsl, rgb } from "polished";
import { HslColor } from "polished/lib/types/color";
import {
  Grid,
  GridItem,
  HStack,
  Box,
  Image,
  Stack,
  Button,
  Divider,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { BsShare } from "react-icons/bs";
import { RiHomeHeartLine } from "react-icons/ri";
import { faChalkboardTeacher } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getLectureDetail } from "@/services/api";
import StarRating from "@/components/StarRating/StarRating";
import VideoList from "@/pages/components/Detail/VideoIndex/VideoIndex";
import Review from "@/pages/components/Detail/Reviews/Review";
import ReviewForm from "@/pages/components/Detail/Reviews/ReviewForm";

interface Instructor {
  username: string;
  instructorField: string | null;
  instructorAbout: string;
  instructorCareer: string;
}

interface Category {
  name: string;
  classification: string;
  parent: Category | null;
}

interface Review {
  id: number;
  reply: any[];
  user: {
    username: string;
  };
  created_at: string;
  updated_at: string;
  is_same_user: boolean;
  rating: number;
  content: string;
}

interface LectureData {
  LectureId: number;
  lectureTitle: string;
  lectureDifficulty: string;
  lectureDescription: string;
  targetAudience: string;
  lectureFee: number;
  thumbnail: string;
  isOpened: boolean;
  grade: number | null;
  instructor: Instructor;
  categories: Category;
  reviews: Review[];
  reviews_num: number;
  rating: number;
  total_student: number;
}

interface VideoData {
  id: number;
  title: string;
  description: string;
  videoLength: number;
}

const DetailLectures: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loginCheck, setLoginCheck] = useState(true);
  const [lectureData, setLectureData] = useState<LectureData | null>(null);
  const { isLoading, error, data, isError } = useQuery(
    ["lectureInfo", id],
    () => getLectureDetail(Number(id)),

    {
      retry: false,
    }
  );

  const [loadMoreCount, setLoadMoreCount] = useState(0);
  const { colorMode, toggleColorMode } = useColorMode();
  const hslaColor: HslColor = parseToHsl(rgb(240, 245, 252));

  // L 값을 10% 낮춤
  const darkerColor = hsl({
    ...hslaColor,
    lightness: hslaColor.lightness - 0.7,
  });

  const handleLoadMore = () => {
    setLoadMoreCount(loadMoreCount + 1);
  };
  const reviewsToShow = 5 * (loadMoreCount + 1); // 처음 5개, 10개, 15개 이런 식으로 늘어남.

  useEffect(() => {
    if (!isLoading && !error) {
      setLectureData(data);
    }
  }, [data, isLoading, error]);

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {data && (
        <Grid
          w="1300px"
          pt="5"
          pb="5"
          px="5"
          mx="auto"
          templateAreas={`"info"
                  "contents"
                  "reviews"`}
        >
          <GridItem
            bgColor={colorMode === "light" ? rgb(240, 245, 252) : darkerColor}
            borderRadius="3xl"
            h="400px"
            area={"info"}
            px="20"
            py="10"
            fontWeight="bold"
          >
            <HStack h="100%">
              <Box w="45%" borderRadius="full">
                <Image
                  src={data.lecture_data.thumbnail}
                  alt="lecture image"
                  borderRadius="10px"
                  boxShadow="lg"
                  objectFit="cover"
                />
              </Box>
              <Box w="10%"></Box>
              <Box w="45%">
                <Stack h="100%" spacing={3}>
                  <Box>{data.lecture_data.categories?.parent?.name}</Box>
                  <Box fontSize="24">{data.lecture_data.lectureTitle}</Box>
                  <Box pb="8">
                    <FontAwesomeIcon icon={faChalkboardTeacher} />
                    &nbsp;{data.lecture_data.instructor.username}
                  </Box>
                  <Box>
                    <StarRating rating={data.lecture_data.rating} />(
                    {data.lecture_data.rating})
                  </Box>
                  <Box>
                    {data.lecture_data.reviews_num}개의 수강평 ∙{" "}
                    {data.lecture_data.total_student}명의 수강생
                  </Box>
                  <Box>
                    <Stack direction="row" spacing={4}>
                      <Button
                        colorScheme="black"
                        variant="outline"
                        w="150px"
                        // onClick={handleRegisterClick}
                      >
                        <RiHomeHeartLine size={20} /> &nbsp;&nbsp;
                        {data.is_enrolled ? "수강중" : "수강하기"}
                      </Button>
                      <Button colorScheme="black" variant="outline" w="150px">
                        <BsShare /> &nbsp;&nbsp;공유하기
                      </Button>
                    </Stack>
                  </Box>
                </Stack>
              </Box>
            </HStack>
          </GridItem>
          <GridItem
            area={"contents"}
            display="flex"
            justifyContent="center"
            py="10"
          >
            <Stack w="800px">
              <Box fontSize="22" paddingTop="10">
                <Text as="span" fontWeight="bold">
                  {data.lecture_data.targetAudience}
                </Text>
                를 위해 준비한
                <br />
                <Text as="span" fontWeight="bold">
                  [{data.lecture_data.categories.parent.name} /
                  {data.lecture_data.categories.name}]
                </Text>{" "}
                강의입니다.
              </Box>
              <Box fontSize="22" fontWeight="bold" py="3">
                강의소개
              </Box>
              <Box pb="10">{data.lecture_data.lectureDescription}</Box>
              <Divider borderColor="gray.300" />
              <Box fontSize="22" fontWeight="bold" py="10">
                목 차{" "}
                <Box as="span" fontSize="16" fontWeight="600" color="#A6A6A6">
                  총 {data.video_data.length}개
                </Box>
              </Box>
              <Box pb="10">
                {data.video_data?.map((video: VideoData, index: number) => (
                  <VideoList
                    key={video.id}
                    videoTitle={video.title}
                    videoLength={video.videoLength}
                  />
                ))}
              </Box>

              <Divider borderColor="gray.300" />
            </Stack>
          </GridItem>
          <GridItem
            area={"reviews"}
            py="3"
            display="flex"
            justifyContent="center"
          >
            <Stack w="800px">
              <ReviewForm
                reviewsNum={data.lecture_data.reviews_num}
                ratingScore={data.lecture_data.rating}
                lectureNum={data.lecture_data.LectureId}
              />
              <Box fontSize="18px" fontWeight="600" pt="10" pb="5">
                Reviews
              </Box>
              <Divider />
              <Box pt="3"></Box>
              {data.lecture_data.reviews
                ?.slice(0, reviewsToShow)
                .map((review: Review) => (
                  <Review
                    key={review.id}
                    username={review.user.username}
                    rating={review.rating}
                    content={review.content}
                    created_at={review.created_at.slice(0, 10)}
                    reply={review.reply}
                    lectureNum={data.lecture_data.LectureId}
                    reviewNum={review.id}
                    is_same_user={review.is_same_user}
                  />
                ))}
              {data.lecture_data.reviews.length > reviewsToShow && (
                <Box
                  display="flex"
                  justifyContent="center"
                  border="1px solid #DCDCDC"
                  rounded="5"
                  color="#958E96"
                >
                  <Button w="100%" variant="ghost" onClick={handleLoadMore}>
                    수강평 더보기
                  </Button>
                </Box>
              )}
            </Stack>
          </GridItem>
        </Grid>
      )}
    </div>
  );
};

export default DetailLectures;
