import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface LineChartProps {
  title: string;
  data: number[];
}

const LineChart: React.FC<LineChartProps> = ({ title, data }) => {
  const options: Highcharts.Options = {
    title: {
      text: title,
    },
    series: [
      {
        type: "line",
        data: data,
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default LineChart;
