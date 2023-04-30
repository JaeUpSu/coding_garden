import React, { useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

import { HiUser } from "react-icons/hi";
import { useColorMode, Text, Flex, VStack, Box } from "@chakra-ui/react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsNetworkgraph from "highcharts/modules/networkgraph";
import accessibility from "highcharts/modules/accessibility";

HighchartsNetworkgraph(Highcharts);
accessibility(Highcharts);

interface NetWorkData {
  from: string;
  to: string;
  value?: number;
}
interface NetWorkNode {
  id: string;
  color: string;
  ratio?: number;
}

interface HighchartsNetworkProps {
  title: string;
  subtitle: string;
  data: NetWorkData[];
  total: number;
  nodes?: NetWorkNode[];
}

const defaultProps: HighchartsNetworkProps = {
  title: "",
  subtitle: "",
  total: 0,
  data: [],
  nodes: [],
};

const HighchartsNetwork: React.FC<HighchartsNetworkProps> = ({
  title,
  subtitle,
  total,
  data = defaultProps.data,
  // nodes = defaultProps.nodes,
}) => {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const [hoveredNode, setHoveredNode] = useState<NetWorkNode | null>(null);
  const [nodes, setNodes] = useState<NetWorkNode[]>([
    { id: "나", color: "red" },
  ]);

  const updateSvgViewBox = () => {
    const labels = document.querySelectorAll(".icon_label");
    labels.forEach((label) => {
      if (label) {
        label.setAttribute("viewBox", "0 0 22 22");
        label.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      }
    });
  };

  useLayoutEffect(() => {
    data?.forEach((item) => {
      setNodes((list) => [
        ...list,
        {
          id: item.to,
          color: `rgb(175,155,240)`,
          ratio: item.value ? (item.value / total) * 100 : 0,
        },
      ]);
    });
  }, []);

  if (data.length === 0 || nodes.length === 0) {
    return <div>Nothing</div>;
  }

  const options: Highcharts.Options = {
    chart: {
      type: "networkgraph",
      height: "80%",
      backgroundColor: "transparent",
      events: {
        load: updateSvgViewBox,
      },
    },
    title: {
      text: title,
      align: "left",
      style: {
        color: colorMode === "light" ? "rgb(0,0,0)" : "rgb(240,240,240,0.9)",
        fontSize: "18px",
        fontWeight: "500",
      },
    },
    subtitle: {
      text: subtitle,
      align: "left",
      verticalAlign: "bottom",
      style: {
        fontSize: "11px",
        color:
          colorMode === "light" ? "rgb(40,40,40,0.8)" : "rgb(240,240,240,0.7)",
      },
    },
    tooltip: {
      enabled: false,
    },
    series: [
      {
        type: "networkgraph",
        accessibility: {
          enabled: false,
        },

        keys: ["from", "to"],
        layoutAlgorithm: {
          enableSimulation: false,
          friction: -0.9,
        },
        data: data,
        nodes: nodes,
        color: "gray",
        dataLabels: {
          enabled: true,
          useHTML: true,
          linkFormat: "",
          formatter: function () {
            const { name } = this.point;
            const node = nodes.find((item) => item.id === name);

            const iconPathData = HiUser({}).props.children[0].props.d;
            const color = node ? node.color : "gray";
            const props = `class="icon_label"`;

            let hiUserIcon = "";
            if (color === "red") {
              hiUserIcon = `
                  <svg ${props} width="33" height="33"> 
                     <path d="${iconPathData}" fill="${color}"/>
                  </svg>`;
            } else {
              hiUserIcon = `
                  <svg ${props} width="23" height="23"> 
                     <path d="${iconPathData}" fill="${color}"/>
                  </svg>`;
            }

            return hiUserIcon;
          },
        },
        cursor: "none",
        point: {
          events: {
            mouseOver: function () {
              const node = nodes.find(
                (node) => "나" !== this.name && node.id === this.name
              );

              if (node) {
                const newNode = { ...node };
                setHoveredNode(newNode);
              }
            },
          },
        },
      },
    ],
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        border: "1.5px solid rgb(170,170,170,0.6)",
        padding: "5px",
        borderRadius: "10px",
      }}
    >
      <VStack
        style={{
          position: "absolute",
          left: "20px",
          top: "50px",
          width: "140px",
          height: "70px",
          border: "1px solid gray",
          borderRadius: "4px",
          padding: "8px",
          zIndex: "10",
          backgroundColor: hoveredNode
            ? colorMode === "light"
              ? "rgba(200, 200, 200, 0.3)"
              : "rgba(240, 240, 240, 0.9)"
            : "transparent",
          color:
            colorMode === "light" ? "rgba(40, 40, 40, 0.9)" : "rgb(40, 40, 40)",
        }}
      >
        {hoveredNode ? (
          <Box bgColor={"transparent"}>
            <Flex alignItems="center" justifyContent="space-around" w="100%">
              <Text fontSize="md" fontWeight="bold">
                {hoveredNode.id}
              </Text>
              <Text>{hoveredNode?.ratio?.toFixed(1)}%</Text>
            </Flex>
            <Text
              fontWeight="bold"
              color={colorMode === "light" ? "facebook.300" : "facebook.500"}
              cursor="pointer"
              bgColor="transparent"
              onClick={() => navigate(`/`)}
            >
              대표강의 보기
            </Text>
          </Box>
        ) : (
          <VStack width={"100%"} height="100%" justifyContent={"center"}>
            <HiUser fill="rgb(175,155,240)" />
            <Text
              fontSize={"xs"}
              color={
                colorMode === "light"
                  ? "rgb(40, 40, 40)"
                  : "rgba(240, 240, 240, 0.9)"
              }
            >
              마우스 올려 정보보기
            </Text>
          </VStack>
        )}
      </VStack>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};
export default HighchartsNetwork;
