import React, { useEffect, useState } from "react";
import Highcharts, { SeriesLineOptions } from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import {
  useColorMode,
  HStack,
  Button,
  Text,
  Box,
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { stockMenuState } from "../../atoms";
import { ChevronDownIcon } from "@chakra-ui/icons";
import accessibility from "highcharts/modules/accessibility";
import axios from "axios";

accessibility(Highcharts);
interface StockProps {
  names: string[];
  data?: [];
}

const menu = [
  { name: "newStudentsRatio", value: "신규수강률" },
  { name: "completeLectureRatio", value: "완강률" },
  { name: "incomesRatio", value: "수입률" },
];

const StockChart: React.FC<StockProps> = ({ names, data }) => {
  const { colorMode } = useColorMode();
  const [selectedMenu, setSelectMenu] = useRecoilState(stockMenuState);
  const [chartOptions, setChartOptions] = useState<Highcharts.Options>({});

  const onSelect = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { name } = e.currentTarget;
    const selectItem = menu.find((item) => item.name === name);
    if (selectItem) {
      setSelectMenu(selectItem);
    }
  };

  useEffect(() => {
    const seriesOptions: SeriesLineOptions[] = [];
    const colors = ["rgb(130,100,190)", "rgb(100,190,230)", "rgb(180,190,248)"];
    const success = (name: string, data: any) => {
      const i = names.indexOf(name);
      seriesOptions[i] = {
        type: "line",
        name: name,
        data: data,
        color: colors[i],
      };

      if (seriesOptions.filter(Boolean).length === names.length) {
        createChart();
      }
    };

    const createChart = () => {
      const textColor = colorMode === "light" ? "black" : "silver";

      setChartOptions({
        chart: {
          backgroundColor: "transparent",
        },
        rangeSelector: {
          selected: 4,
        },
        title: {
          text: "월말 정산",
          style: {
            color: textColor,
            fontSize: "25px",
          },
        },

        yAxis: {
          labels: {
            formatter: function () {
              return (Number(this.value) > 0 ? " + " : "") + this.value + "%";
            },
          },
          plotLines: [
            {
              value: 0,
              width: 2,
              color: "silver",
            },
          ],
        },
        plotOptions: {
          series: {
            compare: "percent",
            showInNavigator: true,
          },
        },
        legend: {
          itemStyle: {
            color: colorMode === "light" ? "black" : "white",
          },
        },
        tooltip: {
          pointFormat:
            '<span style="color:{"series.color"}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
          valueDecimals: 2,
          split: true,
        },
        series: seriesOptions,
      });
    };

    names.forEach((name) => {
      axios
        .get(
          `https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/${name.toLowerCase()}-c.json`
        )
        .then((response) => success(name, response.data));
    });
  }, [colorMode]);

  return (
    <div style={{ position: "relative" }}>
      <Box w="100%" pr="7" pos="absolute">
        <HStack w="100%" justifyContent={"flex-end"}>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} zIndex={10}>
              {selectedMenu.value}
            </MenuButton>
            <MenuList>
              {menu.map((item, idx) => {
                if (item.value !== selectedMenu.value) {
                  return (
                    <MenuItem key={idx} name={item.name} onClick={onSelect}>
                      {item.value}
                    </MenuItem>
                  );
                } else {
                  return null;
                }
              })}
            </MenuList>
          </Menu>
        </HStack>
      </Box>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default StockChart;
