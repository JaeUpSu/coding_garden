import { render } from "@testing-library/react";
import RadarChart from "../../../components/Charts/RadarChart";

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;

describe("RadarChart", () => {
  const data = [
    { skill: "JavaScript", level: 9, 나: 5 },
    { skill: "React", level: 7, 나: 6 },
    { skill: "Node.js", level: 5, 나: 8 },
    { skill: "CSS", level: 8, 나: 7 },
    { skill: "HTML", level: 9, 나: 9 },
  ];
  const keys = ["level", "나"];
  const indexBy = "skill";

  it("renders without crashing", () => {
    const { container } = render(
      <RadarChart data={data} keys={keys} indexBy={indexBy} />
    );
    expect(container).toBeInTheDocument();
  });
});
