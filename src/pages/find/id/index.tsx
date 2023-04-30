import { useState } from "react";
import {
  Input,
  Button,
  Stack,
  Box,
  Text,
  Heading,
  Container,
  VStack,
  useToast,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { findId } from "@/services/api";

interface FormIdData {
  name: string;
  email: string;
  phone_number: string;
}

export default function FindId() {
  const [id, setId] = useState(null);
  const toast = useToast();
  const mutation = useMutation(findId, {
    onSuccess: ({ id }) => {
      setId(id);
    },
    onError: () => {
      toast({
        title: "인증 실패",
        description: "일치하는 회원 정보가 존재하지 않습니다.",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    },
  });
  const { register, handleSubmit, reset } = useForm<FormIdData>();
  const onSubmit: SubmitHandler<FormIdData> = (data) => {
    mutation.mutate(data);
  };
  return (
    <Container p={4} as="form" onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={8}>
        <Heading as="h2" size="lg" mb={4}>
          아이디 찾기
        </Heading>
        <FormControl id="name">
          <FormLabel mb="4" fontWeight="semibold" color="blackAlpha.700">
            이름
          </FormLabel>
          <Input
            type="text"
            {...register("name", { required: true })}
            placeholder="이름을 입력하세요"
          />
        </FormControl>
        <FormControl id="email">
          <FormLabel mb="4" fontWeight="semibold" color="blackAlpha.700">
            이메일
          </FormLabel>
          <Input
            type="email"
            {...register("email", { required: true })}
            placeholder="이메일을 입력하세요"
          />
        </FormControl>

        <FormControl id="phone_number">
          <FormLabel mb="4" fontWeight="semibold" color="blackAlpha.700">
            전화번호
          </FormLabel>
          <Input
            type="number"
            {...register("phone_number", { required: true })}
            placeholder="전화번호를 입력하세요"
          />
        </FormControl>
        <Button
          type="submit"
          w={"100%"}
          backgroundColor="#003c93"
          color="white"
          colorScheme={"navy"}
          isLoading={mutation.isLoading}
        >
          아이디 찾기
        </Button>
        {id ? (
          <Text>
            ID :
            <Heading as="span" size={"lg"}>
              {id}{" "}
            </Heading>
          </Text>
        ) : null}
      </VStack>
    </Container>
  );
}
