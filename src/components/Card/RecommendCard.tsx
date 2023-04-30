import React from "react";
import {
  Text,
  Stack,
  HStack,
  Box,
  Flex,
  Grid,
  GridItem,
  Button,
  Progress,
  useColorMode,
  Image,
  Tooltip,
} from "@chakra-ui/react";
import { BsQuestionCircle } from "react-icons/bs";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const RecommendCard: React.FC = () => {
  const { colorMode } = useColorMode();

  return (
    <div>
      <Stack spacing="3">
        <HStack pb="4">
          <Box
            fontWeight="600"
            style={{ color: colorMode === "light" ? "#3d3d3d" : " white" }}
            fontSize="18px"
          >
            추천 강의
          </Box>
          <Tooltip
            hasArrow
            label="수강한 강의 기반으로 추천드려요!"
            placement="top"
            fontSize="12px"
            bg="#2f2f30"
            color="white"
            p="8px 12px"
            borderRadius="lg"
          >
            <Box color="#858585">
              <BsQuestionCircle />
            </Box>
          </Tooltip>
        </HStack>
        <Stack>
          <Image
            h="120px"
            w="100%"
            src="https://cdn.inflearn.com/public/courses/326905/cover/739f7b4b-1a9f-478f-a6a8-1a13bf58cae3/326905-eng.png"
            objectFit="cover"
          />
        </Stack>
        <Box fontSize="12px">
          <Text fontSize="14px" fontWeight="600" noOfLines={1}>
            만들고 비교하며 학습하는 리액트 (React) 만들고 비교하며 학습하는
            리액트 (React)
          </Text>
          <Text>김정환</Text>
          <Text color="#858585">프론트엔드 · 리액트</Text>
          <Text color="#858585">55,000원</Text>
        </Box>
        <HStack justifyContent="flex-end" mt="0">
          <HStack spacing="0" pr="1">
            <Box>1</Box>
            <Box color="#858585">/10</Box>
          </HStack>
          <Button
            size="xs"
            rounded="full"
            bg="white"
            color="#858585"
            px="0"
            style={{ boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.3)" }}
          >
            <FaChevronLeft size="12px" />
          </Button>
          <Button
            size="xs"
            rounded="full"
            bg="white"
            color="#858585"
            px="0"
            style={{ boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.3)" }}
          >
            <FaChevronRight size="12px" />
          </Button>
        </HStack>
      </Stack>
    </div>
  );
};

export default RecommendCard;
