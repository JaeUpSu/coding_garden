import { rest } from "msw";
import { mock_data } from "./mock_data";

const getHandler = rest.get("/carts", (req, res, ctx) => {
  return res(ctx.status(200), ctx.delay(500), ctx.json({ mock_data }));
});

const deleteHandler = rest.delete(`/carts/:id`, (req, res, ctx) => {
  const { id } = req.params;
  const next_mocks = mock_data.data.filter(
    (cart) => cart.LectureId !== Number(id)
  );
  return res(ctx.status(204), ctx.json(next_mocks));
});

const registerHandler = rest.post("/register", (req, res, ctx) => {
  const formData = req;
  return res(ctx.status(200), ctx.json({ message: "강의가 등록되었습니다." }));
});

const warningHandlers = [
  rest.get("/favicon.ico", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get("/logo192.png", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get("/manifest.json", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];

export const handlers = [
  getHandler,
  deleteHandler,
  registerHandler,
  ...warningHandlers,
];
