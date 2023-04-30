import css from "./EditMember.module.scss";
import React, { useRef, useState, useEffect } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@tanstack/react-query";
import { RiHomeHeartLine } from "react-icons/ri";

import { imgTypes } from "@/services/constant";
import { avatarState } from "@/services/atoms";
import { useQuery } from "@tanstack/react-query";
import { getMyProfile, changeProfileUser, instance } from "@/services/api";
import { getSecureImgFile } from "@/utils/getSecureImgFile";

import {
  Box,
  Avatar,
  Button,
  Stack,
  Image as ChakraImg,
  HStack,
  Text,
  Input,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import useUser from "./UseUser";

interface UserData {
  username: string;
  email: string;
  password: string;
  passwordCheck: string;
  name: string;
  dateBirth: string;
  gender: string;
  phoneNumber: string;
  position: string;
  skill: string;
  termsOfUse: String;
  avatar: string;
}

const MyEditMember: React.FC = () => {
  const [avatar, setAvatar] = useRecoilState(avatarState);
  const router = useRouter();
  const { colorMode } = useColorMode();
  const [_img, setImg] = useState<string>("");
  const [click, setClick] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { isLoading, data, isError } = useQuery<UserData>(
    ["myprofile"],
    getMyProfile,
    {
      retry: false,
    }
  );
  if (isError) {
    // console.log("hello");
    router.push("/notfound");
  }
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    reset,
    formState: { errors },
  } = useForm<UserData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordCheck: "",
      name: "",
      dateBirth: "",
      gender: "",
      phoneNumber: "",
      position: "",
      skill: "",
      termsOfUse: "",
      avatar: "",
    },
  });
  const mutation = useMutation(changeProfileUser, {
    onMutate: (data) => {
      console.log("mutation start...");
      console.log(data);
    },
    onSuccess: () => {
      console.log("API CALL success...");
      setSuccess(true);
    },
    onError: () => {
      console.log("API CALL error...");
    },
  });
  useEffect(() => {
    if (_img) {
      setAvatar(_img);
    }
  }, [_img, setAvatar]);

  const submitForm: SubmitHandler<FieldValues> = (data) => {
    const userData: UserData = data as UserData;
    mutation.mutate(userData);
  };
  const password = useRef<string>("");
  password.current = watch("password");

  const {
    acceptedFiles: imgFile,
    getRootProps: getImgRootProps,
    getInputProps: getImgInputProps,
  } = useDropzone({
    maxFiles: 1,
    accept: { "image/*": imgTypes },
    onDrop: (acceptedFiles: File[]) => {
      const isRightType = acceptedFiles
        .map((file: File) => file.type.replace("image/", ""))
        .some((elem) => imgTypes.includes("." + elem));
    },
  });

  const img = imgFile.map((file: File, idx: number) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImg(getSecureImgFile(reader.result));
    };
    reader.readAsDataURL(file);
    return (
      <HStack alignItems={"flex-start"} key={idx}>
        <ChakraImg w="150px" h="100px" src={_img} />
        <Text>
          {file.name} - {file.size} bytes
        </Text>
      </HStack>
    );
  });

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  return (
    <>
      <div className={css.Container}>
        <div className={css.Wrapper}>
          <div className={css.TopBox}>
            <form className={css.Form} onSubmit={handleSubmit(submitForm)}>
              <HStack>
                <Box w="50%" h="230px">
                  <Box>
                    <label className={css.label}>프로필 이미지</label>
                  </Box>

                  <HStack w="100%" h="100%" pb="8">
                    <Box {...getImgRootProps()} className={css.dropzone}>
                      <input
                        {...getImgInputProps()}
                        {...register("avatar", { required: true })}
                      />
                      <Avatar
                        size="2xl"
                        bg="#CED4DA"
                        src={_img || ""}
                        icon={
                          _img === "" ? (
                            <RiHomeHeartLine size={90} />
                          ) : undefined
                        }
                      />
                    </Box>
                    <Box pl="3">
                      <Button
                        bg="#003c93"
                        color="white"
                        fontSize="14"
                        p="3"
                        borderRadius="base"
                        _hover={{
                          bg: "#012f70",
                        }}
                      >
                        변경
                      </Button>
                      <Box
                        fontSize="12px"
                        color="blackAlpha.500"
                        fontWeight="700"
                        pt="2"
                      >
                        확장자: png, jpg, jpeg / 용량: 1MB 이하
                      </Box>
                    </Box>
                  </HStack>
                </Box>
                <Box w="50%" h="100%">
                  <Box>
                    <label className={css.label}>아이디</label>
                    <div className={css.buttonflex}>
                      <input
                        value={data?.username}
                        placeholder="아이디를 입력해주세용"
                        className={` ${css.Input} ${css.color}`}
                        {...register("username", {
                          required: true,
                          pattern: /^[a-z0-9]{5,20}$/,
                        })}
                      />
                    </div>
                    <h6 className={css.h6Id}>아이디는 바꿀 수 없습니다</h6>
                  </Box>
                  <Box>
                    <label className={css.label}>성별</label>
                    <div className={css.flexContainer}>
                      <div className={css.genderContainer}>
                        <input
                          checked={data?.gender === "male" ? true : false}
                          id="male"
                          type="radio"
                          className={css.Radio}
                          defaultValue="male"
                          {...register("gender", { required: true })}
                        />
                        <label
                          htmlFor="male"
                          className={
                            data?.gender === "male" ? css.genderlabel : css.none
                          }
                        >
                          남자
                        </label>
                      </div>
                      <div className={css.genderContainer}>
                        <input
                          checked={data?.gender === "female" ? true : false}
                          id="female"
                          type="radio"
                          defaultValue="female"
                          className={`${css.Radio} ${css.radioMargin}`}
                          {...register("gender", { required: true })}
                        />
                        <label
                          className={
                            data?.gender === "female"
                              ? css.genderlabel
                              : css.none
                          }
                          htmlFor="female"
                        >
                          여자
                        </label>
                      </div>
                    </div>
                    <h6 className={css.h6Gender}>성별은 바꿀 수 없습니다</h6>
                    {errors.gender && (
                      <p className={css.errors}>성별은 필수 입력값입니다.</p>
                    )}
                  </Box>
                </Box>
              </HStack>

              <HStack>
                <Box w="50%" h="120px" pr="5">
                  <label className={css.label}>비밀번호</label>
                  <input
                    placeholder="비밀번호를 입력해주세용"
                    type="password"
                    autoComplete="off"
                    className={useColorModeValue(css.Input, css.DarkInput)}
                    {...register("password", {
                      required: true,
                      pattern:
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/,
                    })}
                  />
                  {errors.password && errors.password.type === "required" && (
                    <p className={css.errors}>비밀번호는 필수 입력값입니다.</p>
                  )}
                  {errors.password && errors.password.type === "pattern" && (
                    <p className={css.errors}>
                      비밀번호는 8~20자 사이여야 하며 문자,숫자,특수문자를
                      조합해야합니다.
                    </p>
                  )}
                </Box>
                <Box w="50%" h="120px">
                  <label className={css.label}>비밀번호 확인</label>
                  <input
                    placeholder="비밀번호를 한번 더 치세용"
                    type="password"
                    autoComplete="off"
                    className={useColorModeValue(css.Input, css.DarkInput)}
                    {...register("passwordCheck", {
                      required: true,
                      validate: {
                        check: (val) => {
                          // console.log(val);
                          console.log(getValues("password"));
                          if (getValues("password") !== val) {
                            return "error";
                          }
                        },
                      },
                    })}
                  />

                  {errors.passwordCheck && (
                    <p className={css.errors}>비밀번호가 틀립니다.</p>
                  )}
                </Box>
              </HStack>

              <HStack>
                <Box w="50%" h="120px" pr="5">
                  <label className={css.label}>이름</label>
                  <input
                    placeholder="이름을 입력해주세용"
                    defaultValue={data?.name}
                    className={useColorModeValue(css.Input, css.DarkInput)}
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <p className={css.errors}>이름은 필수 입력값입니다.</p>
                  )}
                </Box>
                <Box w="50%" h="120px">
                  <label className={css.label}>생년월일</label>
                  <input
                    defaultValue={data?.dateBirth}
                    type="date"
                    className={useColorModeValue(css.Input, css.DarkInput)}
                    {...register("dateBirth", { required: true })}
                  />
                  {errors.dateBirth && (
                    <p className={css.errors}>생년월일은 필수 입력 값입니다.</p>
                  )}
                </Box>
              </HStack>

              <HStack>
                <Box w="50%" h="120px" pr="5">
                  {" "}
                  <label className={css.label}>전화번호</label>
                  <input
                    placeholder="전화번호를 입력해주세용"
                    defaultValue={data?.phoneNumber}
                    type="tel"
                    className={useColorModeValue(css.Input, css.DarkInput)}
                    {...register("phoneNumber", { required: true })}
                  />
                  {errors.phoneNumber && (
                    <p className={css.errors}>전화번호는 필수 입력 값입니다.</p>
                  )}
                  {errors.phoneNumber &&
                    errors.phoneNumber.type === "pattern" && (
                      <p className={css.p}>숫자만 입력가능합니다.</p>
                    )}
                </Box>
                <Box w="50%" h="120px">
                  <label className={css.label}>이메일</label>
                  <input
                    defaultValue={data?.email}
                    placeholder="이메일를 입력해주세용"
                    type="text"
                    className={useColorModeValue(css.Input, css.DarkInput)}
                    {...register("email", {
                      required: true,
                      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
                    })}
                  />
                  {errors.email && (
                    <p className={css.errors}>이메일 형식이 아닙니다.</p>
                  )}
                </Box>
              </HStack>

              <label className={`${css.label} ${css.question}`}>
                이용약관 문의
              </label>
              <div className={css.flex}>
                <label className={css.answer} htmlFor="termsOfUse">
                  이용약관에 동의합니다.
                </label>
                <input
                  checked={true}
                  id="termsOfUse"
                  type="checkbox"
                  className={`${css.Checkbox}`}
                  {...register("termsOfUse", {
                    required: true,
                    pattern: /^[0-9]+$/,
                  })}
                />
              </div>
              {errors.termsOfUse && (
                <p className={css.errors}>
                  이용약관에 동의하지 않으면 가입이 불가능합니다.
                </p>
              )}
              <div className={css.buttonContainer}>
                <button
                  type="submit"
                  className={css.Button}
                  onClick={() => {
                    setClick(true);
                  }}
                >
                  회원정보 수정
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyEditMember;
