import React, { useEffect } from "react";
import {
  ResponsiveRadar,
  RadarCustomLayerProps,
  RadarLayerId,
  RadarSliceTooltipDatum,
} from "@nivo/radar";
import {
  useColorMode,
  Box,
  Text,
  VStack,
  Badge,
  HStack,
} from "@chakra-ui/react";
import ResizeObserver from "resize-observer-polyfill";

interface RadarChartData {
  [key: string]: string | number;
}

interface RadarChartProps {
  data: RadarChartData[];
  keys: string[];
  indexBy: string;
}

const RadarChart: React.FC<RadarChartProps> = ({ data, keys, indexBy }) => {
  const { colorMode } = useColorMode();
  const customColors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF"];
  const lightAreaColors = ["rgb(25,25,255,0.4)", "rgb(215, 77, 255,0.5)"];
  const darkAreaColors = ["rgb(115,115,255)", "rgb(210,210,255)"];

  useEffect(() => {
    const ro = new ResizeObserver(() => {
      window.dispatchEvent(new Event("resize"));
    });

    const container = document.getElementById("radar-chart-container");
    if (container) {
      ro.observe(container);
    }
    return () => {
      ro.disconnect();
    };
  }, []);

  const getOffSet = (index: number) => {
    if (index === 4) {
      return { x: 180, y: 180 };
    } else if (index === 0) {
      return { x: 160, y: 165 };
    } else {
      return { x: 160, y: 160 };
    }
  };

  const CustomTooltip = ({
    data,
  }: {
    data: { data: RadarSliceTooltipDatum[]; index: string | number };
  }) => {
    return (
      <Box
        bgColor={colorMode === "light" ? "gray.600" : "gray.300"}
        color={colorMode === "light" ? "white" : "blackAlpha.700"}
        borderRadius="md"
        p="3"
        boxShadow="md"
      >
        <Text fontSize="lg" fontWeight="bold" mb="1">
          {data.index}
        </Text>
        <VStack alignItems="start" spacing="1">
          {data.data.map((item: any, index: number) => (
            <HStack>
              <Badge variant="solid" bgColor={item.color} color={item.color}>
                {"cmgg"}
              </Badge>
              <Text
                key={index}
                color={
                  colorMode === "light" ? "whiteAlpha.700" : "blackAlpha.700"
                }
              >
                {item.id} : {item.formattedValue}
              </Text>
            </HStack>
          ))}
        </VStack>
      </Box>
    );
  };

  const customLabelsLayer: React.FC<RadarCustomLayerProps<RadarChartData>> = ({
    indices,
    angleStep,
    centerX,
    centerY,
    radiusScale,
  }) => {
    return (
      <g>
        {indices.map((index, i) => {
          const key = index as string;
          const angle = angleStep * i - Math.PI / 2;
          const labelRadius = radiusScale(1);
          const x = centerX + Math.cos(angle) * (labelRadius + 10);
          const y = centerY + Math.sin(angle) * (labelRadius + 10);

          const offset = getOffSet(i);

          const xOffset = Math.abs(Math.cos(angle)) * offset.x;
          const yOffset = Math.abs(Math.sin(angle)) * offset.y;

          return (
            <text
              key={key}
              x={x + (Math.cos(angle) > 0 ? xOffset : -xOffset)}
              y={y + (Math.sin(angle) > 0 ? yOffset : -yOffset)}
              textAnchor="middle"
              dominantBaseline="central"
              fill={colorMode === "light" ? "black" : "white"}
              style={{
                fontSize: 12,
              }}
            >
              {key}
            </text>
          );
        })}
      </g>
    );
  };

  const customDotsLayer: React.FC<RadarCustomLayerProps<RadarChartData>> = ({
    data,
    keys,
    indices,
    centerX,
    centerY,
    radiusScale,
    angleStep,
    colorByKey,
  }) => {
    return (
      <g>
        {data.map((datum, i) => {
          return keys.map((key, j) => {
            const pointData = {
              index: i,
              indexValue: datum[indexBy],
              key,
              value: datum[key],
            };

            const startAngle = angleStep * i - Math.PI / 2;
            const radius = radiusScale(Number(pointData.value));

            const x = centerX + Math.cos(startAngle) * radius;
            const y = centerY + Math.sin(startAngle) * radius;

            const textOffsetX = pointData.key === "나" ? -10 : 10;
            const textOffsetY = pointData.key === "나" ? -10 : 10;

            return (
              <g key={`${key}.${i}`} transform={`translate(${x},${y})`}>
                <circle
                  r={5}
                  stroke={
                    colorMode === "light"
                      ? "rgb(50,50,50,0.5)"
                      : "rgb(215,215,215,0.9)"
                  }
                  fill="transparent"
                />
                <text
                  dx={textOffsetX}
                  dy={textOffsetY}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={colorMode === "light" ? "black" : "white"}
                  fontSize={12}
                  fontWeight={600}
                >
                  {pointData.value}
                </text>
              </g>
            );
          });
        })}
      </g>
    );
  };

  const layers: (
    | RadarLayerId
    | React.FC<RadarCustomLayerProps<RadarChartData>>
  )[] = [
    "grid",
    "layers",
    "slices",
    "legends",
    customLabelsLayer,
    customDotsLayer,
  ];

  const dotColorFunction = (d: RadarChartData) => {
    const index = data.findIndex((item) => item[indexBy] === d[indexBy]);
    return customColors[index % customColors.length];
  };

  return (
    <div id="radar-chart-container" style={{ height: "400px" }}>
      <ResponsiveRadar
        data={data}
        keys={keys}
        indexBy={indexBy}
        maxValue="auto"
        margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
        curve="linearClosed"
        gridLevels={5}
        gridShape="circular"
        gridLabel={() => null}
        enableDots={true}
        dotSize={10}
        dotColor={dotColorFunction}
        dotBorderWidth={2}
        enableDotLabel={true}
        dotLabel="value"
        dotLabelYOffset={-12}
        colors={colorMode === "light" ? lightAreaColors : darkAreaColors}
        blendMode="normal"
        fillOpacity={0.5}
        animate={true}
        motionConfig="wobbly"
        isInteractive={true}
        layers={layers}
        sliceTooltip={(data) => <CustomTooltip data={data} />}
      />
    </div>
  );
};

export default RadarChart;
