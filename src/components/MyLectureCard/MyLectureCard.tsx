import React from "react";
import { Card, CardBody } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  Text,
  Button,
  Stack,
  Image,
  Heading,
  HStack,
  Box,
  Progress,
} from "@chakra-ui/react";

import StarRating from "@/components/StarRating/StarRating";
import { BsPlayCircle } from "react-icons/bs";

interface MylectureCardProps {
  lectureNumber: number;
  lectureFee?: number;
  lectureDescription: string;
  lectureTitle: string;
  targetAudience: string;
  instructor: string;
  rating?: number;
  isInstructor?: boolean;
  img: string;
}

const MylectureCard: React.FC<MylectureCardProps> = ({
  lectureNumber,
  img,
  lectureDescription,
  lectureTitle,
  instructor,
  targetAudience,
  isInstructor,
  lectureFee,
  rating,
}) => {
  const router = useRouter();
  const MAX_LENGTH = 37;
  let text = lectureTitle;

  if (text.length > MAX_LENGTH) {
    text = text.slice(0, MAX_LENGTH) + "...";
  }

  const fee = lectureFee; // assume amount is 10000
  const formattedFee = fee?.toLocaleString(); // "10,000"

  return (
    <Card
      width="230px"
      height="260px"
      direction={{ base: "column" }}
      variant="outline"
      overflow="hidden"
    >
      <Box
        onClick={() => {
          router.push(`/lectures/${lectureNumber}`);
        }}
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "100%" }}
          maxH="150px"
          height="100%"
          src={img}
          alt="Card"
          _hover={{ cursor: "pointer" }}
        />
      </Box>
      <Stack>
        <CardBody _hover={{ cursor: "pointer" }} px="1" py="0">
          <Box
            onClick={() => {
              router.push(`/lectures/${lectureNumber}`);
            }}
          >
            <Heading
              fontSize="14px"
              h="45px"
              py="2"
              _hover={{ cursor: "pointer" }}
            >
              {text}
            </Heading>
            <Text fontSize="14px" fontWeight="600" color="#666666">
              {instructor}
            </Text>
          </Box>
          <HStack justify="space-between" fontSize="12px">
            <Box>
              {rating ? <StarRating rating={rating} /> : null}
              {isInstructor ? null : (
                <Text fontSize="16" fontWeight="600">
                  ₩{formattedFee}
                </Text>
              )}
            </Box>

            <Text>
              <Button
                p="0"
                zIndex={100}
                type="button"
                bg="ghost"
                onClick={(e) => {
                  // e.preventDefault();

                  router.push(`/lectureplay/${lectureNumber}/1`);
                }}
              >
                <BsPlayCircle size={30} />
              </Button>
            </Text>
          </HStack>
        </CardBody>
      </Stack>
    </Card>
  );
};

export default MylectureCard;
