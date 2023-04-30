import { Box, HStack, Text, VStack, useColorMode } from "@chakra-ui/react";
import { hsl, parseToHsl } from "polished";
import { HslColor } from "polished/lib/types/color";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import accessibility from "highcharts/modules/accessibility";

accessibility(Highcharts);
interface DashboardCardProps {
  title: string;
  value: string;
  bgColor: string;
  boxShadow?: string;
  data: Array<[number, number]>;
}

const DashboardChartCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  bgColor,
  boxShadow,
  data,
}) => {
  const { colorMode } = useColorMode();
  const hslaColor: HslColor = parseToHsl(bgColor);

  const darkerColor = hsl({
    ...hslaColor,
    lightness: hslaColor.lightness - 0.24,
  });

  const lineColor = Number(data[2][1]) > Number(data[3][1]) ? "blue" : "red";

  const options: Highcharts.Options = {
    chart: {
      type: "area",
      backgroundColor: "transparent",
      borderWidth: 0,
      margin: [2, 0, 2, 0],
      height: 20,
      width: 30,
    },
    title: {
      text: undefined,
    },
    series: [
      {
        type: "line",
        data: data,
        color: lineColor,
      },
    ],
    xAxis: {
      visible: false,
    },
    yAxis: {
      visible: false,
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false,
        },
        states: {
          hover: {
            enabled: false,
          },
        },
      },
    },
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      padding="1rem"
      minWidth="200px"
      data-testid="dashboard-chart-card"
      bgColor={colorMode === "light" ? bgColor : darkerColor}
      color={colorMode === "light" ? "black" : "white"}
      boxShadow={boxShadow ? boxShadow : "none"}
    >
      <VStack>
        <Text fontWeight="bold">{title}</Text>
        <HStack>
          <Text fontSize="2xl">{value}</Text>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </HStack>
      </VStack>
    </Box>
  );
};

export default DashboardChartCard;
