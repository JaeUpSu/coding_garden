import React from "react";
import { useRouter } from "next/router";
import {
  Box,
  HStack,
  Stack,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { RiHomeHeartLine } from "react-icons/ri";

import { TiThSmall } from "react-icons/ti";
import { SiHtml5, SiCss3, SiReact, SiSpring, SiDjango } from "react-icons/si";
import { FaVuejs } from "react-icons/fa";
import { DiAndroid } from "react-icons/di";
import { GrSwift } from "react-icons/gr";

const Category: React.FC = () => {
  const router = useRouter();
  const { bigCategory, smallCategory } = router.query;
  return (
    <div>
      <Stack w="100%" fontWeight="600">
        {/* <Box px="1" paddingBottom="3">
          메뉴
        </Box>
        <Divider /> */}
        <HStack
          px="5"
          py="2"
          fontSize="18px"
          cursor="pointer"
          _hover={{
            borderRadius: "lg",
            color: "white",
            bg: "#003C93",
          }}
          onClick={() => {
            router.push("/lectures/all/all/?page=1");
          }}
          borderRadius={
            bigCategory === "all" && smallCategory === "all" ? "lg" : undefined
          }
          color={
            bigCategory === "all" && smallCategory === "all"
              ? "white"
              : undefined
          }
          bg={
            bigCategory === "all" && smallCategory === "all"
              ? "#003C93"
              : undefined
          }
        >
          <Box>전체강의</Box>
        </HStack>
        <Divider color={useColorModeValue("gray.300", "white")} />
        <HStack
          px="5"
          py="2"
          cursor="pointer"
          _hover={{
            borderRadius: "lg",
            color: "white",
            bg: "#003C93",
          }}
          onClick={() => {
            router.push("/lectures/basic/all/?page=1");
          }}
          borderRadius={
            bigCategory === "basic" && smallCategory === "all"
              ? "lg"
              : undefined
          }
          color={
            bigCategory === "basic" && smallCategory === "all"
              ? "white"
              : undefined
          }
          bg={
            bigCategory === "basic" && smallCategory === "all"
              ? "#003C93"
              : undefined
          }
        >
          <Box>기초 코딩</Box>
        </HStack>
        <HStack
          fontSize="14px"
          px="5"
          py="2"
          cursor="pointer"
          _hover={{
            borderRadius: "lg",
            color: "white",
            bg: "#769dd6",
          }}
          borderRadius={
            bigCategory === "basic" && smallCategory === "html"
              ? "lg"
              : undefined
          }
          color={
            bigCategory === "basic" && smallCategory === "html"
              ? "white"
              : undefined
          }
          bg={
            bigCategory === "basic" && smallCategory === "html"
              ? "#769dd6"
              : undefined
          }
          onClick={() => {
            router.push("/lectures/basic/html/?page=1");
          }}
        >
          <SiHtml5 />
          <Box>HTML</Box>
        </HStack>
        <HStack
          fontSize="14px"
          px="5"
          py="2"
          cursor="pointer"
          _hover={{
            borderRadius: "lg",
            color: "white",
            bg: "#769dd6",
          }}
          onClick={() => {
            router.push("/lectures/basic/css/?page=1");
          }}
          borderRadius={
            bigCategory === "basic" && smallCategory === "css"
              ? "lg"
              : undefined
          }
          color={
            bigCategory === "basic" && smallCategory === "css"
              ? "white"
              : undefined
          }
          bg={
            bigCategory === "basic" && smallCategory === "css"
              ? "#769dd6"
              : undefined
          }
        >
          <SiCss3 />
          <Box>CSS</Box>
        </HStack>
        <Divider color={useColorModeValue("gray.300", "white")} />
        <HStack
          px="5"
          py="2"
          cursor="pointer"
          _hover={{
            borderRadius: "lg",
            color: "white",
            bg: "#003C93",
          }}
          onClick={() => {
            router.push("/lectures/frontend/all/?page=1");
          }}
          borderRadius={
            bigCategory === "frontend" && smallCategory === "all"
              ? "lg"
              : undefined
          }
          color={
            bigCategory === "frontend" && smallCategory === "all"
              ? "white"
              : undefined
          }
          bg={
            bigCategory === "frontend" && smallCategory === "all"
              ? "#003C93"
              : undefined
          }
        >
          <Box>프론트엔드</Box>
        </HStack>
        <HStack
          fontSize="14px"
          px="5"
          py="2"
          cursor="pointer"
          _hover={{
            borderRadius: "lg",
            color: "white",
            bg: "#769dd6",
          }}
          onClick={() => {
            router.push("/lectures/frontend/react/?page=1");
          }}
          borderRadius={
            bigCategory === "frontend" && smallCategory === "react"
              ? "lg"
              : undefined
          }
          color={
            bigCategory === "frontend" && smallCategory === "react"
              ? "white"
              : undefined
          }
          bg={
            bigCategory === "frontend" && smallCategory === "react"
              ? "#769dd6"
              : undefined
          }
        >
          <SiReact />
          <Box>React</Box>
        </HStack>
        <HStack
          fontSize="14px"
          px="5"
          py="2"
          cursor="pointer"
          _hover={{
            borderRadius: "lg",
            color: "white",
            bg: "#769dd6",
          }}
          onClick={() => {
            router.push("/lectures/frontend/vue/?page=1");
          }}
          borderRadius={
            bigCategory === "frontend" && smallCategory === "vue"
              ? "lg"
              : undefined
          }
          color={
            bigCategory === "frontend" && smallCategory === "vue"
              ? "white"
              : undefined
          }
          bg={
            bigCategory === "frontend" && smallCategory === "vue"
              ? "#769dd6"
              : undefined
          }
        >
          {" "}
          <FaVuejs />
          <Box>Vue</Box>
        </HStack>
        <Divider color={useColorModeValue("gray.300", "white")} />
        <HStack
          px="5"
          py="2"
          cursor="pointer"
          _hover={{
            borderRadius: "lg",
            color: "white",
            bg: "#003C93",
          }}
          onClick={() => {
            router.push("/lectures/backend/all/?page=1");
          }}
          borderRadius={
            bigCategory === "backend" && smallCategory === "all"
              ? "lg"
              : undefined
          }
          color={
            bigCategory === "backend" && smallCategory === "all"
              ? "white"
              : undefined
          }
          bg={
            bigCategory === "backend" && smallCategory === "all"
              ? "#003C93"
              : undefined
          }
        >
          <Box>백엔드</Box>
        </HStack>
        <HStack
          fontSize="14px"
          px="5"
          py="2"
          cursor="pointer"
          _hover={{
            borderRadius: "lg",
            color: "white",
            bg: "#769dd6",
          }}
          onClick={() => {
            router.push("/lectures/backend/spring/?page=1");
          }}
          borderRadius={
            bigCategory === "backend" && smallCategory === "spring"
              ? "lg"
              : undefined
          }
          color={
            bigCategory === "backend" && smallCategory === "spring"
              ? "white"
              : undefined
          }
          bg={
            bigCategory === "backend" && smallCategory === "spring"
              ? "#769dd6"
              : undefined
          }
        >
          {" "}
          <SiSpring />
          <Box>Spring</Box>
        </HStack>
        <HStack
          fontSize="14px"
          px="5"
          py="2"
          cursor="pointer"
          _hover={{
            borderRadius: "lg",
            color: "white",
            bg: "#769dd6",
          }}
          onClick={() => {
            router.push("/lectures/backend/django/?page=1");
          }}
          borderRadius={
            bigCategory === "backend" && smallCategory === "django"
              ? "lg"
              : undefined
          }
          color={
            bigCategory === "backend" && smallCategory === "django"
              ? "white"
              : undefined
          }
          bg={
            bigCategory === "backend" && smallCategory === "django"
              ? "#769dd6"
              : undefined
          }
        >
          {" "}
          <SiDjango />
          <Box>Django</Box>
        </HStack>
        <Divider color={useColorModeValue("gray.300", "white")} />
        <HStack
          px="5"
          py="2"
          cursor="pointer"
          _hover={{
            borderRadius: "lg",
            color: "white",
            bg: "#003C93",
          }}
          onClick={() => {
            router.push("/lectures/mobile/all/?page=1");
          }}
          borderRadius={
            bigCategory === "mobile" && smallCategory === "all"
              ? "lg"
              : undefined
          }
          color={
            bigCategory === "mobile" && smallCategory === "all"
              ? "white"
              : undefined
          }
          bg={
            bigCategory === "mobile" && smallCategory === "all"
              ? "#003C93"
              : undefined
          }
        >
          <Box>모바일</Box>
        </HStack>
        <HStack
          fontSize="14px"
          px="5"
          py="2"
          cursor="pointer"
          _hover={{
            borderRadius: "lg",
            color: "white",
            bg: "#769dd6",
          }}
          onClick={() => {
            router.push("/lectures/mobile/swift/?page=1");
          }}
          borderRadius={
            bigCategory === "mobile" && smallCategory === "swift"
              ? "lg"
              : undefined
          }
          color={
            bigCategory === "mobile" && smallCategory === "swift"
              ? "white"
              : undefined
          }
          bg={
            bigCategory === "mobile" && smallCategory === "swift"
              ? "#769dd6"
              : undefined
          }
        >
          {" "}
          <GrSwift />
          <Box>Swift</Box>
        </HStack>
        <HStack
          fontSize="14px"
          px="5"
          py="2"
          cursor="pointer"
          _hover={{
            borderRadius: "lg",
            color: "white",
            bg: "#769dd6",
          }}
          onClick={() => {
            router.push("/lectures/mobile/android/?page=1");
          }}
          borderRadius={
            bigCategory === "mobile" && smallCategory === "android"
              ? "lg"
              : undefined
          }
          color={
            bigCategory === "mobile" && smallCategory === "android"
              ? "white"
              : undefined
          }
          bg={
            bigCategory === "mobile" && smallCategory === "android"
              ? "#769dd6"
              : undefined
          }
        >
          {" "}
          <DiAndroid />
          <Box>Android</Box>
        </HStack>
      </Stack>
    </div>
  );
};

export default Category;
