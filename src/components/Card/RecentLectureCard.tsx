import React from "react";
import {
  Text,
  Stack,
  HStack,
  Box,
  Button,
  Progress,
  useColorMode,
} from "@chakra-ui/react";
import { HiOutlineChevronRight } from "react-icons/hi";
import { useRouter } from "next/router";

const RecentLectureCard: React.FC = () => {
  const { colorMode } = useColorMode();
  const router = useRouter();
  const lectureTitle =
    "지브러시 세계로 떠나는 여행자 가이드 (Zbrush) 대시보드 지브러시 세계로 떠나는 여행자 가이드 (Zbrush) 대시보드";

  const MAX_LENGTH = 43;
  let text = lectureTitle;

  if (text.length > MAX_LENGTH) {
    text = text.slice(0, MAX_LENGTH) + "...";
  }
  return (
    <div>
      <Stack direction="column" justifyContent="space-between" h="300px">
        <Stack>
          <HStack justifyContent="space-between" alignItems="flex-end" pb="5">
            <Box
              fontWeight="600"
              style={{ color: colorMode === "light" ? "#3d3d3d" : " white" }}
              fontSize="18px"
            >
              최근 학습 강의
            </Box>
            <Box
              display="flex"
              alignItems="center"
              cursor="pointer"
              _hover={{
                textDecoration: "underline",
              }}
              onClick={() => {
                router.push("/mypage/lecture");
              }}
              fontSize="14px"
              fontWeight="600"
              color="#a6a6a6"
            >
              <Box>전체 보기</Box>
              <Box>
                <HiOutlineChevronRight />
              </Box>
            </Box>
          </HStack>
          <Text
            fontSize="14px"
            fontWeight="600"
            pb="1"
            cursor="pointer"
            _hover={{
              textDecoration: "underline",
            }}
            h="46px"
          >
            {text}
          </Text>
          <HStack justifyContent="space-between" fontSize="12px" pb="1">
            <Box>진도율: 14/18강 (77.78%)</Box>
            <Box color="#bababa" fontWeight="600">
              2달 전
            </Box>
          </HStack>
          <Box>
            <Progress
              value={77.78}
              size="sm"
              rounded="lg"
              bg="#dedede"
              sx={{
                "& div": {
                  backgroundColor: "#769dd6",
                },
              }}
            />
          </Box>
        </Stack>

        <Stack>
          <Button
            bg="#769dd6"
            color="white"
            _hover={{ bg: "#4c7cc2" }}
            _active={{ bg: "#4c7cc2" }}
            borderRadius="lg"
            boxShadow="md"
            fontSize="14px"
          >
            바로 학습
          </Button>
        </Stack>
      </Stack>
    </div>
  );
};

export default RecentLectureCard;
