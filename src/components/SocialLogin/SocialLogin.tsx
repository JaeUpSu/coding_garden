import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { FaComment } from "react-icons/fa";
import Cookie from "js-cookie";

const SocialLogin = () => {
  const kakaoParams = {
    client_id: "bb66478dd52ba99cc7ade2f8d07abb6c",
    redirect_uri: "http://127.0.0.1:3000/social/kakao",
    response_type: "code",
  };

  const params = new URLSearchParams(kakaoParams).toString();

  const naverParams = {
    response_type: "code",
    client_id: "QaPk9sXFWYjRU4R3qk_J",
    state: "test",
    redirect_uri: "http://127.0.0.1:3000/social/naver",
  };
  const naver_params = new URLSearchParams(naverParams).toString();

  return (
    <VStack width={"100%"} spacing={"3"}>
      <HStack width={"100%"} spacing={"3"} mt={2}>
        <Divider />
        <Text
          textTransform={"uppercase"}
          color="gray.500"
          fontSize={"xs"}
          as="b"
        >
          or
        </Text>
        <Divider />
      </HStack>
      <Button
        as="a"
        href={`https://nid.naver.com/oauth2.0/authorize?${naver_params}`}
        width={"100%"}
        backgroundColor="rgb(3, 199, 90)"
        color={"white"}
        _hover={{
          backgroundColor: "rgb(15, 171, 64)",
        }}
      >
        NAVER 로그인
      </Button>
      <Button
        as="a"
        href={`https://kauth.kakao.com/oauth/authorize?${params}`}
        width={"100%"}
        colorScheme={"yellow"}
        leftIcon={<FaComment />}
      >
        카카오 로그인
      </Button>
    </VStack>
  );
};
export default SocialLogin;
