import { setupServer } from "msw/node";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { lectureRegisterData } from "../../constant";
import { handlers } from "../../services/mocks/handler";
import { postMockLecture } from "../../services/mocks/api";
import LectureRegister from "../../pages/InstructorPage/LectureRegister/LectureRegister";

const queryClient = new QueryClient();
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

const Register = (): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <LectureRegister />
    </QueryClientProvider>
  );
};

describe("LectureRegister", () => {
  beforeEach(() => {
    render(<Register />);
  });

  afterEach(() => {
    jest.restoreAllMocks(); // 모든 mock 함수를 초기화
  });

  it("renders form elements", () => {
    expect(screen.getByLabelText(/강의명/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/가격/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/설명/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/목적/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/난이도/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/카테고리/i)).toBeInTheDocument();
    expect(screen.getByText(/등록하기/i)).toBeInTheDocument();
  });

  it("submits the form successfully", async () => {
    const response = await postMockLecture(lectureRegisterData);
    expect(response.status).toEqual(200);
  });

  it("shows validation errors when form fields are empty", async () => {
    fireEvent.click(screen.getByText(/등록하기/i));
    expect(
      await screen.findByText(/강의명을 입력해주세요/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/가격을 입력해주세요/i)).toBeInTheDocument();
    expect(await screen.findByText(/설명을 입력해주세요/i)).toBeInTheDocument();
    expect(await screen.findByText(/목적을 선택해주세요/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/난이도를 선택해주세요/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/카테고리를 선택해주세요/i)
    ).toBeInTheDocument();
  });

  // incomplete
  it("shows validation errors when certain conditions are not met", async () => {
    fireEvent.input(screen.getByLabelText(/강의명/i), {
      target: { value: "테스트 강의".repeat(30) },
    });
    fireEvent.input(screen.getByLabelText(/가격/i), {
      target: { value: -10000 },
    });
    fireEvent.input(screen.getByLabelText(/설명/i), {
      target: { value: "테스트 강의 설명입니다".repeat(100) },
    });

    fireEvent.click(screen.getByText(/등록하기/i));

    expect(
      await screen.findByText(/최대 30 자까지 가능합니다/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/최소 0원 이상부터 등록 가능합니다/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/최대 1000 자까지 가능합니다/i)
    ).toBeInTheDocument();
  });
});
export {};
