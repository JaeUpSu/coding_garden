import React, { useState } from "react";
import {
  Stack,
  Box,
  Divider,
  HStack,
  Avatar,
  Button,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { RiHomeHeartLine } from "react-icons/ri";

import Reply from "./Reply";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  postReply,
  PostReplyParams,
  updateReview,
  UpdateReviewParams,
  deleteReview,
  DeleteReviewParams,
} from "@/services/api";
import StarRating from "@/components/StarRating/StarRating";

interface ReviewProps {
  username: string;
  rating: number;
  content: string;
  created_at: string;
  is_same_user: boolean;
  reply?: {
    id: number;
    user: { username: string };
    content: string;
    created_at: string;
    is_same_user: boolean;
  }[];
  lectureNum: number;
  reviewNum: number;
}

interface reviewData {
  content: string;
}

const Review: React.FC<ReviewProps> = ({
  username,
  rating,
  content,
  created_at,
  is_same_user,
  reply,
  lectureNum,
  reviewNum,
}) => {
  const [showReplyForm, setShowReplyForm] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<reviewData>();

  const handleReplyButtonClick = () => {
    setShowReplyForm(!showReplyForm);
  };

  const handleCancelButtonClick = () => {
    setShowReplyForm(false);
  };

  const handleUpdateButtonClick = () => {
    setShowUpdateModal(true);
  };

  const onCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const queryClient = useQueryClient();

  const { mutate: postReplyMutate } = useMutation<void, Error, PostReplyParams>(
    postReply,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["lectureInfo"]);
      },
    }
  );

  const { mutate: updateReviewMutate } = useMutation<
    void,
    Error,
    UpdateReviewParams
  >(updateReview, {
    onSuccess: () => {
      queryClient.invalidateQueries(["lectureInfo"]);
    },
  });

  const { mutate: deleteReviewMutate } = useMutation<
    void,
    Error,
    DeleteReviewParams
  >(deleteReview, {
    onSuccess: () => {
      queryClient.invalidateQueries(["lectureInfo"]);
    },
  });

  const onSubmit = async (data: { content: string }) => {
    try {
      await postReplyMutate({
        lectureNum,
        reviewNum,
        data,
      }); // postReply API 요청 보내기
      reset(); // 입력 폼을 초기화
      setShowReplyForm(false); // 답글 작성 창을 숨김
    } catch (error) {
      console.error(error);
    }
  };

  const onUpdate = async (data: { content: string }) => {
    try {
      await updateReviewMutate({ lectureNum, reviewNum, data });
      setShowUpdateModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteButtonClick = async () => {
    try {
      await deleteReviewMutate({ lectureNum, reviewNum });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack pt="4">
      <Stack>
        <HStack pb="3">
          <Box>
            <Avatar bg="#CED4DA" icon={<RiHomeHeartLine size={35} />} />
          </Box>
          <Stack pl="1" fontWeight="700" spacing={1}>
            <Box>
              <StarRating rating={rating} /> {rating}
            </Box>
            <Box color="#958E96">{username}</Box>
          </Stack>
        </HStack>
        <Box>{content}</Box>
        <HStack
          color="#A6A6A6"
          fontWeight="600"
          py="2"
          justifyContent="space-between"
        >
          <HStack>
            <Box>{created_at}</Box>
            <Button variant="ghost" onClick={handleReplyButtonClick}>
              답글 작성
            </Button>
          </HStack>
          <HStack>
            {is_same_user && (
              <>
                <Button variant="ghost" onClick={handleUpdateButtonClick}>
                  수정
                </Button>
                <Button variant="ghost" onClick={handleDeleteButtonClick}>
                  삭제
                </Button>
              </>
            )}
          </HStack>
        </HStack>
      </Stack>

      {showReplyForm && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack
            id="reply_form"
            border="1px solid #DCDCDC"
            px="4"
            py="4"
            bg="rgba(238,238,238,0.3)"
            rounded="5"
          >
            <Box maxH="100px" overflowY="auto" w="100%" h="100%">
              <Textarea
                {...register("content", { required: true })}
                focusBorderColor="blue.700"
                border="1px solid #DCDCDC"
                maxLength={1000}
                h="100px"
                bg="white"
                resize="none"
              />
            </Box>
            <HStack justifyContent="end" w="100%">
              <Button
                type="reset"
                colorScheme="white"
                width="50px"
                height="50px"
                color="black"
                onClick={handleCancelButtonClick}
              >
                취소
              </Button>
              <Button
                type="submit"
                bg="#003C93"
                color="white"
                _hover={{ bg: "#012a66" }}
                _active={{ bg: "#012a66" }}
                borderRadius="lg"
                boxShadow="lg"
                width="50px"
                height="50px"
              >
                등록
              </Button>
            </HStack>
          </Stack>
        </form>
      )}
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
      <Box pb="5">
        {reply &&
          reply.map((reply) => (
            <Reply
              key={reply.id}
              username={reply.user.username}
              content={reply.content}
              created_at={reply.created_at.slice(0, 10)}
              lectureNum={lectureNum}
              reviewNum={reviewNum}
              replyNum={reply.id}
              is_same_user={reply.is_same_user}
            />
          ))}
      </Box>

      <Divider borderColor="gray.300" />
      <Box pt="3"></Box>
    </Stack>
  );
};

export default Review;
