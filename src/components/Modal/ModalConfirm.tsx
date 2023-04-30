import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({ isOpen, onClose }) => {
  const [modalClick, setModalClick] = useState(true);
  const navigate = useNavigate();
  const handleModalClose = () => {
    setTimeout(() => {
      navigate("/login");
    }, 1500);

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
        <ModalHeader>로그인이 필요합니다</ModalHeader>
        <ModalCloseButton onClick={handleModalClose} />
        <ModalBody>
          <br />
          <br />
        </ModalBody>
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

export default ModalConfirm;
