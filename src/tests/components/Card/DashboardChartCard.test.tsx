export {};
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DashboardChartCard from "../../../components/Card/DashboardChartCard";

interface DashboardCardProps {
  title: string;
  value: string;
  bgColor: string;
  boxShadow?: string;
  data: Array<[number, number]>;
}

describe("DashboardChartCard", () => {
  const defaultProps: DashboardCardProps = {
    title: "Test Title",
    value: "100",
    bgColor: "#f5f5f5",
    data: [
      [1, 1],
      [2, 2],
      [3, 3],
      [4, 4],
    ],
  };

  test("renders the component with the correct title and value", () => {
    render(<DashboardChartCard {...defaultProps} />);

    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.value)).toBeInTheDocument();
  });

  test("renders the component with a custom boxShadow", () => {
    const boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
    render(<DashboardChartCard {...defaultProps} boxShadow={boxShadow} />);

    const boxElement = screen.getByTestId("dashboard-chart-card");
    expect(boxElement).toHaveStyle(`box-shadow: ${boxShadow}`);
  });

  // Add more test cases as needed.
});
