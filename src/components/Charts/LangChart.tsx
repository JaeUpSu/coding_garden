import { ResponsivePie } from "@nivo/pie";
import React from "react";
import { useQuery } from "@tanstack/react-query";

import { useColorMode } from "@chakra-ui/react";
import {
  Text,
  Stack,
  HStack,
  Box,
  Flex,
  Grid,
  GridItem,
  Button,
} from "@chakra-ui/react";

interface Props {}

interface LangChartData {
  id: string | number;
  value: number;
  category: string;
  [key: string]: any;
}

interface LangChartProps {
  data: LangChartData[];
}

export const data: LangChartData[] = [
  {
    id: "Python",
    // label: "python",
    value: 3,
    category: "backend",
  },
  {
    id: "django",
    label: "django",
    value: 6,
    category: "backend",
  },
  {
    id: "React",
    label: "react",
    value: 6,
    category: "mobile",
  },
  {
    id: "Swift",
    label: "swift",
    value: 2,
    category: "mobile",
  },
  {
    id: "JS",
    label: "javascript",
    value: 6,
    category: "mobile",
  },
];

const LangChart: React.FC<Props> = () => {
  const getCategoryPercentage = (category: string) => {
    const categoryTotal = data
      .filter((item) => item.category === category)
      .reduce((acc, item) => acc + item.value, 0);
    const totalValue = data.reduce((acc, item) => acc + item.value, 0);
    return Math.round((categoryTotal / totalValue) * 100);
  };
  const frontendPercentage = getCategoryPercentage("frontend");
  const backendPercentage = getCategoryPercentage("backend");
  const fullstackPercentage = getCategoryPercentage("fullstack");
  const mobilePercentage = getCategoryPercentage("mobile");

  const getMaxCategory = () => {
    const categories = [
      { name: "프론트엔드", percentage: frontendPercentage },
      { name: "백엔드", percentage: backendPercentage },
      { name: "풀스택", percentage: fullstackPercentage },
      { name: "모바일", percentage: mobilePercentage },
    ];

    const maxCategory = categories.reduce((prev, current) =>
      prev.percentage > current.percentage ? prev : current
    );
    if (Math.abs(frontendPercentage - backendPercentage) <= 5) {
      maxCategory.name = "풀스택";
    }

    return maxCategory;
  };
  const maxCategory = getMaxCategory();

  const { colorMode } = useColorMode();
  return (
    <div>
      <Grid
        templateAreas={`"header header"
                  "langchart langchart"
                  "text text"`}
        gridTemplateRows={"45px 200px 1fr "}
        gridTemplateColumns={"1fr 1fr"}
      >
        <GridItem
          area={"header"}
          fontSize="18px"
          style={{ color: colorMode === "light" ? "#3d3d3d" : " white" }}
          fontWeight="600"
          pb="30px"
        >
          <HStack justifyContent="space-between">
            <Box>수강 언어</Box>
          </HStack>
        </GridItem>
        <GridItem area={"langchart"}>
          <ResponsivePie
            data={data}
            margin={{ top: 10, right: 20, bottom: 20, left: 20 }}
            innerRadius={0.5}
            padAngle={2}
            cornerRadius={4}
            activeOuterRadiusOffset={8}
            colors={{ scheme: "blues" }}
            borderWidth={1}
            borderColor={{
              theme: "grid.line.stroke",
            }}
            tooltip={({ datum }) => {
              const totalValue = data.reduce(
                (acc, item) => acc + item.value,
                0
              );

              const percentage = Math.round(
                (datum.data.value / totalValue) * 100
              );

              return (
                <div
                  style={{
                    color: colorMode === "light" ? "#575757" : "#575757",
                    backgroundColor: "white",
                    padding: "8px",
                    fontSize: "12px",
                    borderRadius: "4px",
                    boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.24)",
                    lineHeight: "1.6",
                    fontWeight: "600",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div>
                      {datum.data.id} :{" "}
                      <span style={{ color: "#000000" }}>{percentage}%</span>
                    </div>
                  </div>
                </div>
              );
            }}
            enableArcLinkLabels={false}
            arcLabel="id"
            arcLabelsSkipAngle={10}
            arcLabelsTextColor="#222877"
          />
          <Box>
            <Text textAlign="center" p={1} fontWeight={600}>
              열심히 학습중
            </Text>
            <Text
              textAlign="center"
              fontSize="14px"
              fontWeight={600}
              color="#b2b2b2"
            >
              곧 {maxCategory.name} 개발자가 될 수 있어요!!
            </Text>
          </Box>
        </GridItem>
      </Grid>
    </div>
  );
};

export default LangChart;
