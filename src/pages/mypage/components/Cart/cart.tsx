import React, { useState } from "react";
import {
  VStack,
  HStack,
  Text,
  Divider,
  Checkbox,
  Flex,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { useQuery } from "@tanstack/react-query";

import { getMockCarts } from "@/services/mocks/api";
import { Cart, Carts } from "@/services/mocks/mock";
import { cartSelectAllState, SelectCartItems } from "@/services/atoms";

import CartItem from "./CartItem";
import Seo from "@/components/Seo/Seo";
import { RequestPayment } from "./RequestPay";
import { ILecture } from "@/typings/PaymentResult";

const MyCart: React.FC = () => {
  const [initSelectedItems, setInitSelectedItems] = useState<SelectCartItems>({
    id: new Array<number>(),
    name: new Array<string>(),
    thumbnail: new Array<string>(),
    instructor: new Array<string>(),
    total_price: 0,
  });
  const mainColor = "#003c93;";
  const [cartItems, setCartItems] = useState<Carts>();
  const [selectedItems, setSelectedItems] = useRecoilState(cartSelectAllState);
  const { isLoading } = useQuery(["carts"], getMockCarts, {
    onSuccess(data) {
      setCartItems(data.mock_data);
      let total_price = 0;
      const newInitSelectedIdArr = new Array<number>();
      const newInitSelectedNameArr = new Array<string>();
      const newInitSelectedThumbnailArr = new Array<string>();
      const newInitSelectedInstructorArr = new Array<string>();
      data.mock_data?.data.map((item: Cart) => {
        newInitSelectedIdArr.push(item.LectureId);
        newInitSelectedNameArr.push(item.lectureTitle);
        newInitSelectedThumbnailArr.push(item.thumbnail);
        newInitSelectedInstructorArr.push(item.instructor.username);
        total_price += item.lectureFee;
      });
      setInitSelectedItems({
        id: newInitSelectedIdArr,
        name: newInitSelectedNameArr,
        thumbnail: newInitSelectedThumbnailArr,
        instructor: newInitSelectedInstructorArr,
        total_price: total_price,
      });
      setSelectedItems({
        id: newInitSelectedIdArr,
        name: newInitSelectedNameArr,
        thumbnail: newInitSelectedThumbnailArr,
        instructor: newInitSelectedInstructorArr,
        total_price: total_price,
      });
    },
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedItems(initSelectedItems);
    } else {
      setSelectedItems({
        id: new Array<number>(),
        name: new Array<string>(),
        thumbnail: new Array<string>(),
        instructor: new Array<string>(),
        total_price: 0,
      });
    }
  };

  const isAllCheck = (): boolean => {
    if (
      cartItems &&
      cartItems.data &&
      cartItems.data.length > selectedItems.id.length
    ) {
      return false;
    } else {
      return true;
    }
  };

  const getPaymentData = () => {
    const name = selectedItems.name.join("/");
    const lectures: ILecture[] = [];
    selectedItems.id.map((item, idx) => {
      const lecture = {
        id: item,
        title: selectedItems.name[idx],
        instructor: selectedItems.instructor[idx],
        thumbnail: selectedItems.thumbnail[idx],
      };
      lectures.push(lecture);
    });
    const paymentData = {
      name: name,
      amount: selectedItems.total_price,
      buyer_email: "buyer@naver.com",
      buyer_name: "김현수",
      buyer_tel: "01012345678",
      lectures: lectures,
      buyer_id: "buyerId",
    };
    return paymentData;
  };

  return (
    <VStack pb="8vh" overflowX="hidden" minW="800px">
      <Seo title="장바구니" />
      {!isLoading ? (
        <VStack
          w="100%"
          maxW="1300px"
          alignItems="flex-start"
          p="10"
          px="20"
          pos="relative"
        >
          <VStack w="100%" alignItems="flex-start" pb={15} textAlign="center">
            <Checkbox
              size="sm"
              role="checkbox"
              fontSize="10px"
              borderColor="gray"
              aria-label="Select All"
              colorScheme={mainColor}
              isChecked={isAllCheck()}
              onChange={handleCheckboxChange}
            >
              전체 선택 ({selectedItems?.id.length})
            </Checkbox>
            <Divider />
          </VStack>
          <HStack justifyContent="space-between" w="100%">
            <VStack spacing={6} w="100%" mt="5">
              {cartItems?.data.map((item: Cart) => (
                <CartItem key={item.LectureId} {...item} />
              ))}
            </VStack>
          </HStack>
          <VStack w="100%" padding="20px 0px">
            <HStack
              px="20"
              pl="45"
              minW="100%" // 수정된 부분
            >
              <Flex justifyContent="space-between" minW="800px" padding="20px">
                <Flex>
                  <Text fontWeight="bold" fontSize="20px" paddingRight="10px">
                    총 결제 금액:
                  </Text>
                  <Text fontWeight="bold" fontSize="20px">
                    {selectedItems.total_price}원
                  </Text>
                </Flex>
                <RequestPayment {...getPaymentData()} />
              </Flex>
            </HStack>
          </VStack>
          <Divider color="rgb(226 232 241)" />
        </VStack>
      ) : null}
    </VStack>
  );
};
export default MyCart;
