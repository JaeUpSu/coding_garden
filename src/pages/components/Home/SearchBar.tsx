import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Stack,
  Button,
  InputGroup,
  Input,
  InputRightElement,
  useColorMode,
} from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
interface Props {}
const SearchBar: React.FC<Props> = (props: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [context, setContext] = useState("");
  const router = useRouter();

  // 검색 기능
  const gotoLectures = () => {
    if (context === "") {
      router.push("/lectures/all/all?page=1");
    } else {
      let url = "/lectures/all/all?page=1&search=" + context;
      router.push(url);
      // window.location.reload();
    }
  };
  return (
    <div>
      <InputGroup>
        <Input
          placeholder="배우고싶은 기술스택을 입력해보세요"
          fontSize="13px"
          // borderRadius="100%"
          type="text"
          border="none"
          backgroundColor={
            colorMode === "light" ? "rgb(247 247 250)" : "rgb(247 247 250)"
          }
          color={colorMode === "light" ? "blackAlpha.800" : "blackAlpha.800"}
          _placeholder={
            colorMode === "light"
              ? {
                  color: "rgb(155, 155, 155)",
                }
              : {
                  color: "rgb(155, 155, 155)",
                }
          }
          borderRadius="2xl"
          onChange={(e) => {
            setContext(e.target.value);
          }}
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.keyCode === 13) {
              gotoLectures();
            }
          }}
        />

        <InputRightElement
          height="100%"
          justifyContent="center"
          alignItems="center"
          display="flex"
        >
          <Button
            borderRadius="50%"
            type="button"
            className="Button"
            border="none"
            backgroundColor="#003c93;"
            size="sm"
            width="30px"
            onClick={() => {
              gotoLectures();
            }}
          >
            <span style={{ display: "inline-block", fontSize: "16px" }}>
              <AiOutlineSearch color="white" />
            </span>
          </Button>
        </InputRightElement>
      </InputGroup>
    </div>
  );
};
export default SearchBar;
