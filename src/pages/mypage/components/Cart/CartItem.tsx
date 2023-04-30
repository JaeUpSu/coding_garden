import css from "./CartItem.module.scss";
import { TbLetterX } from "react-icons/tb";
import {
  Box,
  HStack,
  Checkbox,
  Image,
  Text,
  Button,
  Flex,
  Divider,
  Heading,
} from "@chakra-ui/react";

import React from "react";
import { useRecoilState } from "recoil";

import { Cart } from "@/services/mocks/mock";
import { delMockCarts } from "@/services/mocks/api";
import { cartSelectAllState, SelectCartItems } from "@/services/atoms";

const CartItem: React.FC<Cart> = ({
  LectureId,
  thumbnail,
  instructor,
  lectureTitle,
  lectureDifficulty,
  lectureFee,
}: Cart) => {
  const [selectedItems, setSelectedItems] = useRecoilState(cartSelectAllState);

  const handleItemDelete = () => {
    delMockCarts({ LectureId });
  };
  const mainColor = "#003c93;";
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedItems((items: SelectCartItems) => {
      let nextTotalPrice = items.total_price;

      const isSelectedItem = items.id.findIndex(
        (item: number) => item === LectureId
      );
      const selectedItemsId = items.id.filter(
        (item: number) => item !== LectureId
      );
      const selectedItemsName = items.name.filter(
        (item: string) => item !== lectureTitle
      );

      const selectedItemsThumbnail = items.thumbnail.filter(
        (item: string) => item !== thumbnail
      );
      const selectedItemsInstructor = items.instructor.filter(
        (item: string) => item !== instructor.username
      );

      if (e.target.checked) {
        selectedItemsId.push(LectureId);
        selectedItemsName.push(lectureTitle);
        selectedItemsThumbnail.push(thumbnail);
        selectedItemsInstructor.push(instructor.username);

        if (isSelectedItem < 0) {
          nextTotalPrice += lectureFee;
        }
      } else {
        if (isSelectedItem > -1) {
          nextTotalPrice -= lectureFee;
        }
      }

      return {
        id: selectedItemsId,
        name: selectedItemsName,
        thumbnail: selectedItemsThumbnail,
        instructor: selectedItemsInstructor,
        total_price: nextTotalPrice,
      };
    });
  };

  const isCheck = (): boolean =>
    selectedItems.id.includes(LectureId) ? true : false;

  return (
    <Box>
      <Box w="100%" key={LectureId} paddingBottom="30px" margin="0">
        <HStack
          key={LectureId}
          alignItems="flex-start"
          justifyContent="flex-start"
          borderRadius="md"
          w={"100%"}
          my="1"
        >
          <Checkbox
            borderColor="gray"
            size="md"
            colorScheme={mainColor}
            isChecked={isCheck()}
            onChange={handleCheckboxChange}
          />
          <Box w="900px" overflow={"hidden"} display={"flex"}>
            <Image
              src={thumbnail}
              alt="Card Image"
              ml="10px"
              borderRadius={"7px"}
              w="240px"
              h="150px"
            />
            <HStack w="100%" justifyContent="space-between">
              <Box pl="20px">
                <Heading fontWeight={"600"} fontSize={"16px"} mb="8px">
                  {lectureTitle}
                </Heading>
                <Heading fontSize={"13px"} color="#666" mb="16px">
                  {lectureDifficulty}
                </Heading>
                <Flex>
                  <Text fontSize="md" fontWeight="700" mr="1">
                    {lectureFee}
                  </Text>
                  원
                </Flex>
              </Box>
              <Box display={"flex"} alignItems={"flex-start"} h="100%">
                <Button
                  size={"lg"}
                  backgroundColor="transparent"
                  _hover={{
                    backgroundColor: "transparent",
                  }}
                  onClick={handleItemDelete}
                >
                  <TbLetterX />
                </Button>
              </Box>
            </HStack>
          </Box>
        </HStack>
      </Box>
      <Divider color="rgb(226 232 241)" />
    </Box>
  );
};

export default CartItem;
