import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";
interface ModalConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}
import React, { useState, useEffect } from "react";

const ModalLecture: React.FC<ModalConfirmProps> = ({ isOpen, onClose ,onSubmit }) => {
  const [modalClick, setModalClick] = useState(true);

  const handleModalClose = () => {
    setModalClick(false);
    onClose();
  };
  const handleModalRegister = () => {
    onSubmit();
    setModalClick(false);

    onClose();
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
        <ModalHeader>강의를 수강하시겠습니까?</ModalHeader>
        <ModalCloseButton onClick={handleModalClose} />
        <ModalBody>
          <br />
          <br />
        </ModalBody>
        <ModalFooter>
          <Button
            variant="ghost"
            colorScheme="pink"
            mr={3}
            onClick={handleModalRegister}
          >
            수강하기
          </Button>
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

export default ModalLecture;
