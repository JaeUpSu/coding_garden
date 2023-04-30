import React from "react";
import {
  Box,
  Stack,
  HStack,
  Flex,
  Text,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import SearchBar from "./SearchBar";
import Categories from "./Categories";

interface Props {}
const Category: React.FC<Props> = (props: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div>
      <Stack
        pt="100px"
        pb="100px"
        justifyContent="center"
        alignItems="center" // Add this line to center the child elements vertically
        textAlign="center"
        spacing="10"
      >
        <Box
          color={colorMode === "light" ? "#5e5e5e" : "#c7c7c7"}
          fontSize="18px"
          fontWeight="600"
        >
          배우고, 나누고, 성장하세요
        </Box>
        <Box w="500px" mx="auto" pb="10">
          <SearchBar />
        </Box>
        <Box
          border="1px solid #c9c9c9"
          borderRadius="lg"
          p="50px 40px 30px 40px"
          position="relative"
        >
          <Text
            color={colorMode === "light" ? "#5e5e5e" : "#c7c7c7"}
            fontSize="18px"
            fontWeight="600"
            position="absolute"
            top="-10px"
            left="-20px"
            bg={colorMode === "light" ? "white" : "#1A202C"}
            px="20px"
            paddingBottom="20px"
          >
            <Text as="span" color="#769dd6" fontSize="20px">
              카테고리
            </Text>
            에 따라 강의를 찾아보세요.
          </Text>

          <Stack>
            <Categories />
          </Stack>
        </Box>
      </Stack>
    </div>
  );
};

export default Category;
