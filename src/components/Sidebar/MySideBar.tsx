import React from "react";
import { useRouter } from "next/router";
import {
  Box,
  HStack,
  Stack,
  Divider,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";

import { CgDanger } from "react-icons/cg";
import { MdPayment } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { RiHomeHeartLine } from "react-icons/ri";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsPlayCircle, BsFileEarmarkText } from "react-icons/bs";

interface Props {
  activeTab: string;
}

const MySideBar: React.FC<Props> = ({ activeTab }: Props) => {
  const router = useRouter();
  const dividerColor = useColorModeValue("gray.300", "gray.700");

  return (
    <div>
      <Stack w="100%" fontWeight="600">
        <HStack px="5" py="2" fontSize="18px">
          <Box>마이 페이지</Box>
        </HStack>
        <Divider color={dividerColor} />
        <HStack px="5" py="2">
          <Box>대시보드</Box>
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
            router.push("/mypage/dashboard");
          }}
          borderRadius={activeTab === "" ? "lg" : undefined}
          color={activeTab === "" ? "white" : undefined}
          bg={activeTab === "" ? "#769dd6" : undefined}
        >
          <BsFileEarmarkText />
          <Box>학습 관리</Box>
        </HStack>

        <Divider color={dividerColor} />
        <HStack px="5" py="2">
          <Box>수강 강의</Box>
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
            router.push("/mypage/lectures");
          }}
          borderRadius={activeTab === "lectures" ? "lg" : undefined}
          color={activeTab === "lectures" ? "white" : undefined}
          bg={activeTab === "lectures" ? "#769dd6" : undefined}
        >
          {" "}
          <BsPlayCircle />
          <Box>수강중인 강의</Box>
        </HStack>

        <Divider color={dividerColor} />
        <HStack px="5" py="2">
          <Box>수강신청 관리</Box>
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
            router.push("/mypage/payments");
          }}
          borderRadius={activeTab === "payments" ? "lg" : undefined}
          color={activeTab === "payments" ? "white" : undefined}
          bg={activeTab === "payments" ? "#769dd6" : undefined}
        >
          <MdPayment />
          <Box>결제 내역</Box>
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
            router.push("/mypage/cart");
          }}
          borderRadius={activeTab === "cart" ? "lg" : undefined}
          color={activeTab === "cart" ? "white" : undefined}
          bg={activeTab === "cart" ? "#769dd6" : undefined}
        >
          <AiOutlineShoppingCart />
          <Box>수강바구니</Box>
        </HStack>
        <Divider color={dividerColor} />
        <HStack px="5" py="2">
          <Box>회원정보 수정</Box>
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
            router.push("/mypage/editMember");
          }}
          borderRadius={activeTab === "editMember" ? "lg" : undefined}
          color={activeTab === "editMember" ? "white" : undefined}
          bg={activeTab === "editMember" ? "#769dd6" : undefined}
        >
          <FiSettings />
          <Box>정보 수정</Box>
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
            // router.push("/mypage/delete");
          }}
        >
          <CgDanger size={16} />
          <Box>회원 탈퇴</Box>
        </HStack>
        <HStack pt="20">
          <Box>
            <Avatar bg="#CED4DA" icon={<RiHomeHeartLine size={35} />} />
          </Box>
          <Stack pl="2" spacing={0}>
            <Box fontSize="16">blairMoon</Box>
            <Box fontSize="14" color="#707070">
              Student
            </Box>
          </Stack>
        </HStack>
      </Stack>
    </div>
  );
};

export default MySideBar;
