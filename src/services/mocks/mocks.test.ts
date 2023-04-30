import { setupServer } from "msw/node";

import { handlers } from "./handler";
import { Cart } from "./mock";
import { mock_data } from "./mock_data";

const server = setupServer(...handlers);

// 'beforeAll'은 테스트 스위트의 모든 테스트 전에 한 번 실행되며
// 테스트 스위트의 여러 테스트에서 사용되는 공유 리소스를 설정하는 데 유용합니다.
beforeAll(() => server.listen());

// 'afterAll'은 테스트 스위트의 모든 테스트 실행이 완료된 후
// 한 번 실행되며 테스트 스위트 중에 생성된 리소스를 정리하는 데 유용합니다.
afterAll(() => server.close());

// 'afterEach'는 테스트 스위트의 각 테스트 후에 실행되며
// 테스트 중에 생성된 리소스를 정리하는 데 유용합니다.
afterEach(() => server.resetHandlers());

const axios = require("axios");

describe("axios with msw", () => {
  it("mocks_data Length is 5", async () => {
    const response = await axios.get("/carts");
    const data = await response.data.mock_data.data;
    expect(data).toHaveLength(5);
  });

  it("mocks_data first item LecutureId is 27", async () => {
    const response = await axios.get("/carts");
    const data = await response.data.mock_data.data;
    expect(data[0].LectureId).toBe(27);
  });

  it("mocks_data third item match categories", async () => {
    const response = await axios.get("/carts");
    const data = await response.data.mock_data.data;
    const categories = {
      parent: {
        name: "기초코딩",
        classification: "basic",
        parent: null,
      },
      name: "html",
      classification: "html",
    };
    expect(data[2].categories).toMatchObject(categories);
  });

  it("mocks_data is Equal", async () => {
    const response = await axios.get("/carts");
    const data = await response.data.mock_data.data;
    expect({ ...data }).toEqual({ ...mock_data.data });
  });

  it("Deletes a carts item", async () => {
    const idToDelete = "1";
    const res = await axios.delete(`/carts/${idToDelete}`);
    expect(res.status).toBe(204);

    const updatedRes = await axios.get("/carts");
    const updatedCarts = updatedRes.data.mock_data.data;

    const deletedItem = updatedCarts.find(
      (carts: Cart) => carts.LectureId === Number(idToDelete)
    );
    expect(deletedItem).toBeUndefined();
  });
});
