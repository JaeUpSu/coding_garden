import React, { useState, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  useDisclosure,
  Input,
  Image as ChakraImg,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { imgTypes } from "@/services/constant";
import { useDropzone } from "react-dropzone";
import { getSecureImgFile } from "@/utils/getSecureImgFile";

import { AiOutlineCheckCircle } from "react-icons/ai";

const ModalRegister: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [_img, setImg] = useState<string>("");
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const nameRef = useRef(null);

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

      if (!isRightType || acceptedFiles.length > 1) {
        alert("이미지 파일 하나만 등록이 가능합니다! \n(jpg, png, jpeg, webp)");
      }
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
  return (
    <div>
      <Button
        display="flex"
        alignItems="center"
        fontSize="15px"
        fontWeight="500"
        // padding="10px 10px 0px 0px"
        mr="16px"
        size={"md"}
        onClick={onOpen}
        backgroundColor="transparent"
        _hover={{ backgroundColor: "transparent" }}
        width="100px"
        leftIcon={<AiOutlineCheckCircle />}
      >
        강사 신청
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>강사 신청</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="0">
            <FormControl>
              <FormLabel>자기 소개</FormLabel>
              <Input
                height="100px"
                ref={nameRef}
                placeholder="Introduce"
                // onBlur={() => setInputStyle({})}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>신청 분야</FormLabel>
              <Input
                placeholder="Application Field"
                // onBlur={() => setInputStyle({})}
              />
            </FormControl>

            {/* <FormControl mt={4}>
              <FormLabel>경력</FormLabel>
              <Input placeholder="Career" />
            </FormControl> */}
            <FormControl id={"img"} my="6">
              <FormLabel fontWeight={"bold"} id={"img"}>
                관련 분야 자격증 올리기
              </FormLabel>
              <VStack
                backgroundColor={"#fafafa"}
                border="1px dashed gray"
                cursor="pointer"
                p="7"
                {...getImgRootProps({ className: "dropzone" })}
              >
                <input {...getImgInputProps()} aria-labelledby="img" />
                <p style={{ color: "#777" }}>
                  이미지는 클릭 또는 드래그해서 올려주세요 <br />
                  (jpg, png, jpeg, webp)
                </p>
              </VStack>
              <aside>
                <Text fontWeight={"bold"} mt="6" mb="2">
                  이미지파일
                </Text>
                {img}
              </aside>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button backgroundColor="#003c93" mr={3} color="white">
              신청하기
            </Button>
            <Button onClick={onClose}>취소</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ModalRegister;
