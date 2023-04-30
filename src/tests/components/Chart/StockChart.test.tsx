// import { render, screen } from "@testing-library/react";
// import { RecoilRoot } from "recoil";
// import StockChart from "../../../components/Charts/StockChart";

// interface StockProps {
//   names: string[];
//   data?: [];
// }
// describe("StockChart", () => {
//   const props: StockProps = {
//     names: ["AAPL", "MSFT"],
//     data: [],
//   };

//   global.fetch = require("jest-fetch-mock");
//   it("renders without errors", () => {
//     render(
//       <RecoilRoot>
//         <StockChart {...props} />
//       </RecoilRoot>
//     );
//     const titleElement = screen.getByText(/월말 정산/i);
//     expect(titleElement).toBeInTheDocument();
//   });

//   it("changes selected menu item on click", () => {
//     render(
//       <RecoilRoot>
//         <StockChart {...props} />
//       </RecoilRoot>
//     );
//     const menuItem = screen.getByText(/완강률/i);
//     menuItem.click();
//     const selectedMenuItem = screen.getByText(/완강률/i);
//     expect(selectedMenuItem).toBeInTheDocument();
//   });
// });

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
