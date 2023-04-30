import React, { useState } from "react";
import GoDashBoard from "./components/Home/GoDashBoard";
import Employment from "./components/Home/Employment";
import Category from "./components/Home/Category";
import PopularLecture from "@/components/PopularClass/PopularClass";
import NewLecture from "@/components/NewClass/NewClass";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorMode,
} from "@chakra-ui/react";

function HomePage(): React.ReactElement {
  const { colorMode } = useColorMode();

  return (
    <div>
      <GoDashBoard />
      <Category />
      <Tabs
        maxW={"6xl"}
        mx="auto"
        sx={{ borderColor: "#F7F7FA", borderWidth: 3 }}
      >
        <TabList
          justifyContent="center"
          color={colorMode === "light" ? "#656669" : "#c7c7c7"}
        >
          <Tab
            mx="auto"
            width="100%"
            fontSize="24px"
            fontWeight="600"
            textShadow="2px 2px 1px rgba(0, 0, 255, 0.1)"
            _selected={{ color: "#769dd6", borderColor: "#769dd6" }}
            pb="30px"
          >
            신규 강의
          </Tab>
          <Tab
            mx="auto"
            width="100%"
            fontSize="24px"
            fontWeight="600"
            textShadow="2px 2px 1px rgba(0, 0, 255, 0.1)"
            _selected={{ color: "#769dd6", borderColor: "#769dd6" }}
            pb="30px"
          >
            인기 강의
          </Tab>
        </TabList>
        <TabPanels pt="20px">
          <TabPanel>
            <NewLecture />
          </TabPanel>
          <TabPanel>
            <PopularLecture />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Employment />
    </div>
  );
}
export default HomePage;
