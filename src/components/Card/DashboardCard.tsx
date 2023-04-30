import { useState, useEffect } from "react";
import { Box, Text, VStack, useColorMode } from "@chakra-ui/react";
import { hsl, parseToHsl } from "polished";
import { HslColor } from "polished/lib/types/color";
import getAddCommas from "../../utils/getAddCommas";

interface DashboardCardProps {
  title: string;
  value: number;
  bgColor: string;
  boxShadow?: string;
  isDarkActive?: boolean;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  bgColor,
  boxShadow,
}) => {
  const [num, setNum] = useState(value);
  const { colorMode } = useColorMode();
  const hslaColor: HslColor = parseToHsl(bgColor);
  const darkerColor = hsl({
    ...hslaColor,
    lightness: hslaColor.lightness - 0.2,
  });

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      padding="1rem"
      minWidth="200px"
      bgColor={colorMode === "light" ? bgColor : darkerColor}
      color={colorMode === "light" ? "black" : "white"}
      boxShadow={boxShadow ? boxShadow : "none"}
    >
      <VStack>
        <Text fontWeight="bold" fontSize="xl">
          {title}
        </Text>
        <Text fontSize="2xl">{getAddCommas(value)}</Text>
      </VStack>
    </Box>
  );
};

export default DashboardCard;
