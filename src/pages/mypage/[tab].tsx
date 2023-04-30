import React from "react";
import { useRouter } from "next/router";
import { Grid, GridItem } from "@chakra-ui/react";

import MyCart from "./components/Cart/cart";
import DashBoard from "./components/DashBoard/DashBoard";
import MyLectures from "./components/Lectures/Lectures";
import MySideBar from "@/components/Sidebar/MySideBar";
import { getStringParams } from "@/utils/getStringParams";
import MyEditMember from "./components/Edit/MyEditMember";

const MyInfoPage: React.FC = () => {
  const router = useRouter();
  const { tab } = router.query;

  let content;

  if (tab === "dashboard") {
    content = <DashBoard />;
  } else if (tab === "lectures") {
    content = <MyLectures />;
  } else if (tab === "payments") {
    content = <div>Tab 3 content goes here</div>;
  } else if (tab === "cart") {
    content = <MyCart />;
  } else if (tab === "editMember") {
    content = <MyEditMember />;
  } else {
    content = null;
  }

  return (
    <div>
      <Grid
        templateAreas={`"nav main"`}
        gridTemplateColumns={"220px 1fr"}
        w="1300px"
        pt="5"
        pb="5"
        px="4"
        mx="auto"
      >
        <GridItem area={"nav"}>
          <MySideBar activeTab={getStringParams({ params: tab })} />
        </GridItem>
        <GridItem area={"main"} paddingLeft="10">
          {content}
        </GridItem>
      </Grid>
    </div>
  );
};

export default MyInfoPage;
