import { render } from "@testing-library/react";
import PackedBubbleChart from "../../../components/Charts/BubbleChart";

const mockData = [
  {
    name: "Region A",
    data: [
      {
        name: "Country 1",
        value: 100,
      },
      {
        name: "Country 2",
        value: 200,
      },
    ],
  },
  {
    name: "Region B",
    data: [
      {
        name: "Country 3",
        value: 150,
      },
      {
        name: "Country 4",
        value: 300,
      },
    ],
  },
];

describe("PackedBubbleChart", () => {
  it("renders without crashing", () => {
    render(<PackedBubbleChart data={mockData} />);
  });
});
