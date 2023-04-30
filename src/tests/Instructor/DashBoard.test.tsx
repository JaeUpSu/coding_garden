import { RecoilRoot } from "recoil";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Dashboard from "../../pages/InstructorPage/DashBoard/DashBoard";

describe("Dashboard", () => {
  global.ResizeObserver = jest.fn(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));

  it("should render the correct number of dashboard cards", () => {
    const { getAllByTestId } = render(
      <MemoryRouter>
        <RecoilRoot>
          <Dashboard />
        </RecoilRoot>
      </MemoryRouter>
    );
    const dashboardCards = getAllByTestId("dashboard-card");
    expect(dashboardCards.length).toBe(3);
  });

  it("should render the correct number of issues", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <RecoilRoot>
          <Dashboard />
        </RecoilRoot>
      </MemoryRouter>
    );

    const issues = getByTestId("issues");
    expect(issues).toBeInTheDocument();
  });

  it("should render the radar chart component", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <RecoilRoot>
          <Dashboard />
        </RecoilRoot>
      </MemoryRouter>
    );
    const radarChart = getByTestId("radar-chart");
    expect(radarChart).toBeInTheDocument();
  });

  // it("should render the stock chart component", () => {
  //   const stockChart = getByTestId("stock-chart");
  //   expect(stockChart).toBeInTheDocument();
  // });

  it("should render the correct number of dashboard chart cards", () => {
    const { getAllByTestId } = render(
      <MemoryRouter>
        <RecoilRoot>
          <Dashboard />
        </RecoilRoot>
      </MemoryRouter>
    );
    const dashboardChartCards = getAllByTestId(/^dashboard-chart-card-/);
    expect(dashboardChartCards.length).toBe(4);
  });

  it("should render the correct number of dashboard chart cards", () => {
    const { getAllByTestId } = render(
      <MemoryRouter>
        <RecoilRoot>
          <Dashboard />
        </RecoilRoot>
      </MemoryRouter>
    );
    const dashboardChartBigCards = getAllByTestId("dashboard-chart-bigcard");
    expect(dashboardChartBigCards.length).toBe(2);
  });

  it("should render the network chart component", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <RecoilRoot>
          <Dashboard />
        </RecoilRoot>
      </MemoryRouter>
    );
    const networkChart = getByTestId("network-chart");
    expect(networkChart).toBeInTheDocument();
  });

  it("should render the bubble chart component", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <RecoilRoot>
          <Dashboard />
        </RecoilRoot>
      </MemoryRouter>
    );
    const bubbleChart = getByTestId("bubble-chart");
    expect(bubbleChart).toBeInTheDocument();
  });
});
