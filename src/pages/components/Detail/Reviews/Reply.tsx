import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Stack,
  Box,
  HStack,
  Button,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateReply,
  UpdateReplyParams,
  deleteReply,
  DeleteReplyParams,
} from "@/services/api";

interface ReplyProps {
  username: string;
  content: string;
  created_at: string;
  is_same_user: boolean;
  lectureNum: number;
  reviewNum: number;
  replyNum: number;
}
interface ReplyData {
  content: string;
}

const Reply: React.FC<ReplyProps> = ({
  username,
  content,
  created_at,
  is_same_user,
  lectureNum,
  reviewNum,
  replyNum,
}) => {
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReplyData>();

  const handleUpdateButtonClick = () => {
    setShowUpdateModal(true);
  };

  const onCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const queryClient = useQueryClient();

  const { mutate: updateReplyMutate } = useMutation<
    void,
    Error,
    UpdateReplyParams
  >(updateReply, {
    onSuccess: () => {
      queryClient.invalidateQueries(["lectureInfo"]);
    },
  });

  const { mutate: deleteReplyMutate } = useMutation<
    void,
    Error,
    DeleteReplyParams
  >(deleteReply, {
    onSuccess: () => {
      queryClient.invalidateQueries(["lectureInfo"]);
    },
  });

  const onUpdate = async (data: { content: string }) => {
    try {
      await updateReplyMutate({ lectureNum, reviewNum, replyNum, data });
      setShowUpdateModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteButtonClick = async () => {
    try {
      await deleteReplyMutate({ lectureNum, reviewNum, replyNum });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Stack py="3">
        <Stack bg="rgba(238,238,238,0.4)" px="5" py="5">
          <Box fontWeight="700" color="#958E96">
            {username}
          </Box>
          <Box py="3">{content}</Box>
          <HStack
            color="#A6A6A6"
            fontWeight="600"
            fontSize="14px"
            justifyContent="space-between"
          >
            <Box>{created_at}</Box>
            <HStack>
              {is_same_user && (
                <>
                  <Button
                    fontSize="14px"
                    variant="ghost"
                    onClick={handleUpdateButtonClick}
                  >
                    수정
                  </Button>
                  <Button
                    fontSize="14px"
                    variant="ghost"
                    onClick={handleDeleteButtonClick}
                  >
                    삭제
                  </Button>
                </>
              )}
            </HStack>
          </HStack>
        </Stack>
      </Stack>
      <Modal isOpen={showUpdateModal} onClose={onCloseUpdateModal} isCentered>
        <ModalOverlay />
        <form onSubmit={handleSubmit(onUpdate)}>
          <ModalContent>
            <ModalHeader textAlign="center">
              힘이 되는 수강평을 남겨주세요!
            </ModalHeader>
            <ModalBody>
              <Stack spacing="20px">
                <Textarea
                  {...register("content", { required: true })}
                  placeholder="후기를 작성해주세요"
                  size="lg"
                  focusBorderColor="blue.700"
                  borderColor="gray.300"
                  h="100px"
                  defaultValue={content}
                />
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onCloseUpdateModal}>
                취소
              </Button>
              <Button
                colorScheme="blue"
                type="submit"
                _hover={{ bg: "blue.700" }}
                // isLoading={isUpdating}
              >
                수정
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </div>
  );
};

export default Reply;
