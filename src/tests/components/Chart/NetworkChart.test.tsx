import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HighchartsNetwork from "../../../components/Charts/NetworkChart";

const mockData = [
  { from: "나", to: "Node 1", value: 10 },
  { from: "나", to: "Node 2", value: 20 },
];
const mockTitle = "Test Title";
const mockSubtitle = "Test Subtitle";
const mockTotal = 30;

describe("HighchartsNetwork", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <HighchartsNetwork
          title={mockTitle}
          subtitle={mockSubtitle}
          data={mockData}
          total={mockTotal}
        />
      </MemoryRouter>
    );
  });
});
