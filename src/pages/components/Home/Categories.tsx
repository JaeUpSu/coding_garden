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
import { SiHtml5, SiCss3, SiSpring } from "react-icons/si";
import { FaReact, FaVuejs } from "react-icons/fa";
import { DiDjango } from "react-icons/di";
import { GrSwift } from "react-icons/gr";
import { AiOutlineAndroid } from "react-icons/ai";

interface Props {}

const Categories: React.FC<Props> = (props: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <Flex justifyContent="center" alignItems="center">
        <Box display="flex" gap="5" justifyContent="center">
          <Box
            w="90px"
            cursor="pointer"
            color={colorMode === "light" ? "#333333" : "#ebebeb"}
            _hover={{
              color: "#769dd6",
              "& > div > svg": {
                transform: "translateY(-10px)",
              },
            }}
            onClick={() => {
              handleNavigation("/lectures/basic/html/?page=1");
            }}
          >
            <Box>
              <Box
                as={SiHtml5}
                size="40px"
                transition="transform 0.3s ease-in-out"
                mx="auto"
              />
              <Text fontWeight="600 " pt="10px">
                HTML
              </Text>
            </Box>
          </Box>

          <Box
            w="90px"
            cursor="pointer"
            color={colorMode === "light" ? "#333333" : "#ebebeb"}
            _hover={{
              color: "#769dd6",
              "& > div > svg": {
                transform: "translateY(-10px)",
              },
            }}
            onClick={() => {
              handleNavigation("/lectures/basic/css/?page=1");
            }}
          >
            <Box>
              <Box
                as={SiCss3}
                size="40px"
                transition="transform 0.3s ease-in-out"
                mx="auto"
              />
              <Text fontWeight="600 " pt="10px">
                CSS
              </Text>
            </Box>
          </Box>

          <Box
            w="90px"
            cursor="pointer"
            color={colorMode === "light" ? "#333333" : "#ebebeb"}
            _hover={{
              color: "#769dd6",
              "& > div > svg": {
                transform: "translateY(-10px)",
              },
            }}
            onClick={() => {
              handleNavigation("/lectures/frontend/react/?page=1");
            }}
          >
            <Box>
              <Box
                as={FaReact}
                size="40px"
                transition="transform 0.3s ease-in-out"
                mx="auto"
              />
              <Text fontWeight="600 " pt="10px">
                React
              </Text>
            </Box>
          </Box>

          <Box
            w="90px"
            cursor="pointer"
            color={colorMode === "light" ? "#333333" : "#ebebeb"}
            _hover={{
              color: "#769dd6",
              "& > div > svg": {
                transform: "translateY(-10px)",
              },
            }}
            onClick={() => {
              handleNavigation("/lectures/frontend/vue/?page=1");
            }}
          >
            <Box>
              <Box
                as={FaVuejs}
                size="40px"
                transition="transform 0.3s ease-in-out"
                mx="auto"
              />
              <Text fontWeight="600 " pt="10px">
                Vue.js
              </Text>
            </Box>
          </Box>

          <Box
            w="90px"
            cursor="pointer"
            color={colorMode === "light" ? "#333333" : "#ebebeb"}
            _hover={{
              color: "#769dd6",
              "& > div > svg": {
                transform: "translateY(-10px)",
              },
            }}
            onClick={() => {
              handleNavigation("/lectures/backend/spring/?page=1");
            }}
          >
            <Box>
              <Box
                as={SiSpring}
                size="40px"
                transition="transform 0.3s ease-in-out"
                mx="auto"
              />
              <Text fontWeight="600 " pt="10px">
                Spring
              </Text>
            </Box>
          </Box>

          <Box
            w="90px"
            cursor="pointer"
            color={colorMode === "light" ? "#333333" : "#ebebeb"}
            _hover={{
              color: "#769dd6",
              "& > div > svg": {
                transform: "translateY(-10px)",
              },
            }}
            onClick={() => {
              handleNavigation("/lectures/backend/django/?page=1");
            }}
          >
            <Box>
              <Box
                as={DiDjango}
                size="40px"
                transition="transform 0.3s ease-in-out"
                mx="auto"
              />
              <Text fontWeight="600 " pt="10px">
                Django
              </Text>
            </Box>
          </Box>
          <Box
            w="90px"
            cursor="pointer"
            color={colorMode === "light" ? "#333333" : "#ebebeb"}
            _hover={{
              color: "#769dd6",
              "& > div > svg": {
                transform: "translateY(-10px)",
              },
            }}
            onClick={() => {
              handleNavigation("/lectures/mobile/swift/?page=1");
            }}
          >
            <Box>
              <Box
                as={GrSwift}
                size="40px"
                transition="transform 0.3s ease-in-out"
                mx="auto"
              />
              <Text fontWeight="600 " pt="10px">
                Swift
              </Text>
            </Box>
          </Box>

          <Box
            w="90px"
            cursor="pointer"
            color={colorMode === "light" ? "#333333" : "#ebebeb"}
            _hover={{
              color: "#769dd6",
              "& > div > svg": {
                transform: "translateY(-10px)",
              },
            }}
            onClick={() => {
              handleNavigation("/lectures/mobile/android/?page=1");
            }}
          >
            <Box>
              <Box
                as={AiOutlineAndroid}
                size="40px"
                transition="transform 0.3s ease-in-out"
                mx="auto"
              />
              <Text fontWeight="600 " pt="10px">
                Android
              </Text>
            </Box>
          </Box>
        </Box>
      </Flex>
    </div>
  );
};

export default Categories;
