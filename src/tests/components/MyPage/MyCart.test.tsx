import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import MyCart from "../../../pages/MyInfoPage/MyCart/MyCart";
import { RecoilRoot } from "recoil";
import { getMockCarts } from "../../../services/mocks/api";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

jest.mock("../../../services/mocks/api");
const queryClient = new QueryClient();

const mockCartData = {
  mock_data: {
    data: [
      {
        LectureId: 1,
        lectureTitle: "Sample Course 1",
        thumbnail: "https://example.com/sample_thumbnail_1.jpg",
        instructor: {
          username: "Instructor 1",
        },
        lectureDifficulty: "입문자",
        lectureFee: 1000,
      },
      {
        LectureId: 2,
        lectureTitle: "Sample Course 2",
        thumbnail: "https://example.com/sample_thumbnail_2.jpg",
        instructor: {
          username: "Instructor 2",
        },
        lectureDifficulty: "초급자",
        lectureFee: 2000,
      },
    ],
  },
};

(getMockCarts as jest.Mock).mockImplementation(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCartData);
    }, 0);
  });
});

describe("MyCart", () => {
  beforeEach(async () => {
    render(
      <MemoryRouter>
        <RecoilRoot>
          <QueryClientProvider client={queryClient}>
            <MyCart />
          </QueryClientProvider>
        </RecoilRoot>
      </MemoryRouter>
    );
    await waitFor(() =>
      expect(screen.getByText("전체 선택 (2)")).toBeInTheDocument()
    );
  });

  test("renders MyCart component", () => {
    expect(screen.getByText("전체 선택 (2)")).toBeInTheDocument();
  });

  test("toggles '전체 선택' checkbox", () => {
    const checkbox = screen.getByRole("checkbox", { name: "Select All" });
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  test("displays correct total payment amount", () => {
    expect(screen.getByText("3000원")).toBeInTheDocument();
  });

  test("displays cart items with correct information", async () => {
    await waitFor(() => {
      expect(screen.getByText("Sample Course 1")).toBeInTheDocument();
      expect(screen.getByText("Sample Course 2")).toBeInTheDocument();
      expect(screen.getByText("입문자")).toBeInTheDocument();
      expect(screen.getByText("초급자")).toBeInTheDocument();
    });
  });
});
