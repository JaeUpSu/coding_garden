import React from "react";
import { useRouter } from "next/router";
import {
  Box,
  Stack,
  HStack,
  Flex,
  Text,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { HiArrowRight } from "react-icons/hi";
interface Props {}
const GoDashBoard: React.FC<Props> = (props: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  return (
    <div>
      <Stack justifyContent="center" textAlign="center" spacing="10" pt="100px">
        <Box
          fontSize="30px"
          fontWeight="600"
          textShadow="2px 2px 1px rgba(0, 0, 255, 0.1)"
        >
          <Text>
            CORDING GARDEN에서 우리는{" "}
            <Text as="span" color="#769dd6">
              코드의 씨앗
            </Text>
            을 심습니다.
          </Text>
          <Text>우리는 함께 창조하고, 혁신하고, 영감을 줍니다.</Text>
        </Box>
        <Box>
          <Text
            fontSize="18px"
            color={colorMode === "light" ? "#656669" : "#c7c7c7"}
          >
            CORDING GARDEN에서 우리의 잠재력은 더 커질 수 있습니다.
          </Text>
        </Box>
        <Box>
          <Button
            border="2px solid #769dd6"
            bg="white"
            color="#769dd6"
            _hover={{ bg: "#4c7cc2", color: "white" }}
            borderRadius="lg"
            boxShadow="md"
            padding="26px"
            onClick={() => {
              router.push("/mypage");
            }}
          >
            <Text pr="2" fontSize="20px" fontWeight="400">
              Go to Dashboard
            </Text>
            <HiArrowRight size="14px" />
          </Button>
        </Box>
      </Stack>
    </div>
  );
};
export default GoDashBoard;
