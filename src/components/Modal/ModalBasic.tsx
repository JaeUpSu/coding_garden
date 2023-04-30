import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Flex,
} from "@chakra-ui/react";

interface ModalBasicProps {
  isOpen: boolean;

  successContent: string;
  onClose?: () => void;
}
const ModalBasic: React.FC<ModalBasicProps> = ({
  isOpen,

  successContent,
  onClose,
}) => {
  const [modalClick, setModalClick] = useState(true);
  const router = useRouter();
  const handleModalClose = () => {
    if (successContent === "회원가입에 성공하셨습니당당><><") {
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } else if (successContent === "아이디랑 비밀번호를 확인해주세요") {
      setModalClick(false);
      onClose && onClose();
    } else {
      setModalClick(false);
      onClose && onClose();
    }
  };

  return (
    <Modal
      isCentered
      onClose={handleModalClose}
      isOpen={isOpen && modalClick}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <Flex direction="column" alignItems="center">
          <img
            src="/images/logo.png"
            alt="logo"
            width="150"
            style={{ marginTop: "20px" }}
          />
          <ModalHeader marginTop={5}>{successContent}</ModalHeader>
        </Flex>
        <ModalCloseButton onClick={handleModalClose} />
        <ModalBody></ModalBody>
        <ModalFooter>
          <Button
            variant="ghost"
            colorScheme="blue"
            mr={3}
            onClick={handleModalClose}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalBasic;
