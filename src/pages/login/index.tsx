import React, { useState, useEffect } from "react";
import css from "./Login.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/router";
import { isLoggedInVar } from "@/services/apollo";
import { getAccessToken, getRefreshToken } from "@/services/Token";
import { userNameLogin } from "@/services/api";
import { postRefreshToken } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import {
  Box,
  Button,
  HStack,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import SocialLogin from "@/components/SocialLogin/SocialLogin";
import Cookies from "js-cookie";
import ModalBasic from "../../components/Modal/ModalBasic";
import { useRecoilState } from "recoil";
import { userState } from "@/services/atoms";
type FormData = {
  username: string;
  password: string;
  headers: string;
};

const Login: React.FC = () => {
  const [failLogin, setFailLogin] = useState<boolean | null>(null);
  const [click, setClick] = useState<boolean>(false);
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();
  const mutation = useMutation(userNameLogin, {
    onMutate: () => {
      console.log("mutation start...");
    },
    onSuccess: () => {
      console.log("API CALL success...");
      setFailLogin(true);
      isLoggedInVar(true);
      setUser(user);

      router.push("/");
      window.location.reload();
    },
    onError: (e: Error) => {
      setFailLogin(false);
      console.log(e);
      console.log("API CALL error...");
    },
  });

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      isLoggedInVar(true);
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = ({ username, password }) => {
    try {
      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken();
      const isLoggedIn = isLoggedInVar();

      const headers =
        isLoggedIn && refreshToken
          ? {
              Authorization: `Bearer ${accessToken}`,
              "X-Refresh-Token": refreshToken,
            }
          : undefined;

      mutation.mutate({ username, password, headers });
    } catch (error) {
      console.error("login error", error);
    }
  };
  return (
    <>
      <div className={css.Container}>
        <div className={css.Wrapper}>
          <div className={css.TopBox}>
            <div className={css.Logo}>
              <img
                src={useColorModeValue(
                  "/image/CGLOGO.png",
                  "/image/WhiteLOGO2.png"
                )}
                alt="logo"
                width="200"
              />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className={css.Form}>
              {/* <form className={css.Form}> */}
              <div>
                <input
                  className={useColorModeValue(
                    css.IdPassword,
                    css.DarkIdPassword
                  )}
                  placeholder="아이디"
                  type="text"
                  {...register("username", {
                    required: true,
                    maxLength: 20,
                  })}
                />
                {errors.username && errors.username.type === "required" && (
                  <p>아이디를 입력하세요!</p>
                )}
                {errors.username && errors.username.type === "maxLength" && (
                  <p>20자 이하로 입력하세요!</p>
                )}
              </div>
              <div>
                <input
                  className={useColorModeValue(
                    css.IdPassword,
                    css.DarkIdPassword
                  )}
                  placeholder="비밀번호"
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                  })}
                />
                {errors.password && errors.password.type === "required" && (
                  <p>비밀번호를 입력하세요!</p>
                )}
                {errors.password && errors.password.type === "minLength" && (
                  <p>6자 이상 20자 이하로 입력하세요.</p>
                )}
                {errors.password && errors.password.type === "maxLength" && (
                  <p>6자 이상 20자 이하로 입력하세요.</p>
                )}
              </div>
              <Button
                backgroundColor="#003c93"
                type="submit"
                value="로그인"
                _hover={{
                  bg: "#012f70",
                }}
                className={css.Button}
                onClick={() => {
                  setClick(true);
                }}
                isLoading={mutation.isLoading}
              >
                로그인
              </Button>
              <HStack
                fontSize={"sm"}
                pt={3}
                pl={3}
                w={"100%"}
                justifyContent={"center"}
              >
                <Link href={"/find/id"}>아이디 찾기</Link>
                <Text>|</Text>
                <Link href={"/find/password"}>비밀번호 찾기</Link>
              </HStack>
            </form>
            <SocialLogin />
          </div>
        </div>
        {click && failLogin != null && !failLogin ? (
          <ModalBasic
            isOpen={!failLogin}
            successContent={"아이디랑 비밀번호를 확인해주세요"}
            onClose={() => {
              setClick(false);
            }}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};
export default Login;
