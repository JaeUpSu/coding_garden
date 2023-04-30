import React from "react";
import { useState, useEffect } from "react";
import LectureCard from "@/components/LectureCard/LectureCard";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

import {
  Box,
  Grid,
  GridItem,
  InputGroup,
  Button,
  HStack,
  VStack,
  Text,
  Select,
  Tag,
  TagLabel,
  TagCloseButton,
  useColorMode,
  Skeleton,
} from "@chakra-ui/react";
import { getLectureAndCategoryAndSearch } from "@/services/api";

import { ILectureData } from "@/typings/LectureData";
import { skeletonArray } from "@/services/constant";
import SkeletonCard from "@/components/LectureCard/SkeletonCard";
import { getNumberParams } from "@/utils/getNumberParams";
import { getStringParams } from "@/utils/getStringParams";
import Category from "@/pages/components/Lectures/Category";

interface CategoriesNames {
  [key: string]: string;
}

const WholeLectures: React.FC = () => {
  const router = useRouter();
  const pageSize: number = 30;
  const { colorMode } = useColorMode();
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [pages, setPages] = useState<number[]>([]);
  const { bigCategory, smallCategory, page, search } = router.query;
  const pageNum = getNumberParams({ params: page }).valueOf();

  const [queryLoading, setIsLoading] = useState(true);
  const [tags, setTags] = useState<string[]>(["입문", "초급", "중급", "고급"]);

  useEffect(() => {
    if (
      typeof bigCategory !== "undefined" &&
      typeof smallCategory !== "undefined" &&
      typeof page !== "undefined"
    ) {
      setIsLoading(false);
    }
  }, [bigCategory, smallCategory, page]);

  const { isLoading, data } = useQuery(
    [
      "lectureSearch",
      bigCategory,
      smallCategory,
      page,
      search === "" ? undefined : search,
    ],
    getLectureAndCategoryAndSearch,
    {
      enabled: !queryLoading,
      onSuccess: (data) => console.log(data),
    }
  );
  const totalPages: number = Math.ceil(data?.totalNum / pageSize) || 0;
  const categoriesNames: CategoriesNames = {
    basic: "기초강의",
    all: "전체강의",
    frontend: "프론트엔드",
    backend: "백엔드",
    mobile: "모바일",
    react: "프론트엔드/react",
    vue: "프론트엔드/vue.js",
    html: "기초코딩/html",
    spring: "백엔드/spring",
    django: "백엔드/django",
    swift: "모바일/swift",
    css: "기초코딩/css",
    android: "모바일/android",
  };

  const handleTagReturn = () => {
    setTags(["입문", "초급", "중급", "고급"]);
  };
  const handleTagClose = (index: number) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };
  const handlePageChange = async (newPage: number) => {
    router.push(`/lectures/${bigCategory}/${smallCategory}?page=${newPage}`);
  };

  useEffect(() => {
    const pageNumbers = [];
    let startPage, endPage;

    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else if (page) {
      if (pageNum <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (pageNum + 1 >= totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = pageNum - 2;
        endPage = pageNum + 2;
      }
    }

    if (endPage && startPage) {
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }
    setPages(pageNumbers);
  }, [page, totalPages]);

  useEffect(() => {
    setTags(["입문", "초급", "중급", "고급"]);
  }, [smallCategory]);

  return (
    <div>
      <Grid
        templateAreas={`"nav main"`}
        // gridTemplateRows={'100px 1fr'}
        gridTemplateColumns={"220px 1fr"}
        w="1300px"
        pt="5"
        pb="5"
        px="4"
      >
        <GridItem area={"nav"}>
          <Category />
        </GridItem>
        <GridItem area={"main"} py="2" paddingLeft="10">
          <HStack
            justify="space-between"
            mx="auto"
            alignItems="flex-start"
            marginBottom="25px"
          >
            <Box w="20%" fontSize="18px" fontWeight="600">
              {isLoading ? (
                <Skeleton width="50%">loading...</Skeleton>
              ) : smallCategory === "all" ? (
                `${categoriesNames[getStringParams({ params: bigCategory })]} `
              ) : (
                `${
                  categoriesNames[getStringParams({ params: smallCategory })]
                } `
              )}
            </Box>

            <Select
              placeholder="강의 필터"
              size="md"
              width="200px"
              marginTop="30px"
            >
              <option value="option1">최신순</option>
              <option value="option2">인기순</option>
              <option value="option3">평점순</option>
              <option value="option3">가격순</option>
            </Select>
          </HStack>
          <HStack spacing={4} paddingBottom="20px">
            {tags.map((level, index) => (
              <Tag
                size="md"
                key={index}
                borderRadius="full"
                variant="solid"
                bg="#003c93"
              >
                <TagLabel>{level}</TagLabel>
                <TagCloseButton onClick={() => handleTagClose(index)} />
              </Tag>
            ))}
            <div style={{ cursor: "pointer" }}>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                // css="[object Object]"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => handleTagReturn()}
              >
                <path
                  fill="none"
                  stroke={colorMode === "light" ? "#000" : "#fff"}
                  strokeWidth="2"
                  d="M20,8 C18.5974037,5.04031171 15.536972,3 12,3 C7.02943725,3 3,7.02943725 3,12 C3,16.9705627 7.02943725,21 12,21 L12,21 C16.9705627,21 21,16.9705627 21,12 M21,3 L21,9 L15,9"
                />
              </svg>
            </div>
          </HStack>
          {!isLoading ? (
            <Box mx="auto">
              {data?.data?.length === 0 || data === undefined ? (
                <Box>
                  <Text>
                    <Text as="span" color="red">
                      {getStringParams({ params: search })}
                    </Text>
                    에 대한 검색결과가 없습니다.
                  </Text>
                </Box>
              ) : (
                <Grid templateColumns={"repeat(4, 1fr)"} gap="5">
                  {data?.data?.map((lecture: ILectureData) => (
                    <GridItem key={lecture.LectureId} mx="auto">
                      <LectureCard
                        data={lecture}
                        bigCategory={getStringParams({ params: bigCategory })}
                        smallCategory={getStringParams({
                          params: smallCategory,
                        })}
                      />
                    </GridItem>
                  ))}
                </Grid>
              )}

              <VStack mt="10" w="100%">
                <InputGroup justifyContent="center">
                  <Button
                    leftIcon={<ChevronLeftIcon />}
                    onClick={() =>
                      handlePageChange(pageNum > 1 ? pageNum - 1 : 1)
                    }
                    disabled={pageNum <= 1}
                    mr="2"
                    variant="ghost"
                  >
                    이전
                  </Button>
                  <HStack spacing="2">
                    {pages.map((page: number) => (
                      <Button
                        key={page}
                        colorScheme={
                          page.toString() === pageNum.toString()
                            ? "blue"
                            : "gray"
                        }
                        variant={
                          page.toString() === pageNum.toString()
                            ? "outline"
                            : "ghost"
                        }
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </Button>
                    ))}
                  </HStack>
                  <Button
                    rightIcon={<ChevronRightIcon />}
                    onClick={() =>
                      handlePageChange(
                        pageNum < totalPages ? pageNum + 1 : totalPages
                      )
                    }
                    display={pageNum === totalPages ? "none" : "inline-flex"}
                    disabled={pageNum >= totalPages}
                    ml="2"
                    variant="ghost"
                  >
                    다음
                  </Button>
                </InputGroup>
              </VStack>
            </Box>
          ) : (
            <Grid
              templateColumns={["repeat(1, 1fr)", "repeat(4, 1fr)"]}
              gap="5"
            >
              {skeletonArray.map((_: number, idx: number) => (
                <GridItem key={idx} mx="auto">
                  <SkeletonCard />
                </GridItem>
              ))}
            </Grid>
          )}
        </GridItem>
      </Grid>
    </div>
  );
};
export default WholeLectures;
