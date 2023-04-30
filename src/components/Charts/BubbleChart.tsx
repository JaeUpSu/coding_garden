import React from "react";
import Highcharts, { SeriesOptionsType } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HichartsMore from "highcharts/highcharts-more";
import { useColorMode } from "@chakra-ui/react";
import accessibility from "highcharts/modules/accessibility";

HichartsMore(Highcharts);
accessibility(Highcharts);

type PackedBubbleSeriesOptionsType = SeriesOptionsType & {
  packedbubble?: Highcharts.SeriesPackedbubbleOptions;
};

interface BubbleDatum {
  name: string;
  value: number;
}
interface BubbleData {
  name: string;
  data: BubbleDatum[];
}

interface PackedBubbleChartProps {
  id?: string;
  data: BubbleData[];
}

const PackedBubbleChart: React.FC<PackedBubbleChartProps> = ({ id, data }) => {
  const { colorMode } = useColorMode();
  const series: PackedBubbleSeriesOptionsType[] = data?.map((region) => {
    return {
      name: region.name,
      type: "packedbubble",
      data: region.data.map((country) => {
        return {
          name: country.name,
          value: country.value,
        };
      }),
    };
  });
  const options: Highcharts.Options = {
    chart: {
      type: "packedbubble",
      height: "80%",
      backgroundColor: "transparent",
    },
    title: {
      text: "CMGG 회원의 선호하는 언어 비율",
      align: "left",
      style: {
        color: colorMode === "light" ? "black" : "white",
      },
    },
    tooltip: {
      useHTML: true,
      pointFormat: "<b>{point.name}:</b> {point.value}",
    },
    legend: {
      itemStyle: {
        color: colorMode === "light" ? "black" : "white",
      },
    },
    plotOptions: {
      packedbubble: {
        minSize: "30%",
        maxSize: "120%",
        zThreshold: 20,
        layoutAlgorithm: {
          splitSeries: false,
          gravitationalConstant: 0.02,
        },
        dataLabels: {
          enabled: true,
          format: "{point.name}",
          filter: {
            property: "y",
            operator: ">",
            value: 250,
          },
          style: {
            color: colorMode === "light" ? "black" : "white",
            textOutline: "none",
            fontWeight: "normal",
          },
        },
      },
    },
    series: series,
  };

  return (
    <div
      style={{
        border: "1.5px solid rgb(170,170,170,0.6)",
        padding: "5px",
        borderRadius: "10px",
      }}
    >
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{ id }}
      />
    </div>
  );
};

export default PackedBubbleChart;
