import { name, getName, getSum } from "./jsInfo";

describe("jsInfo test", () => {
  it("name test", () => {
    expect(name).toBe("J4J"); // name이 J4J인지 테스트
  });

  it("getName test", () => {
    expect(getName()).toBe("제 이름은 J4J입니다."); // getName()이 제 이름은 J4J입니다.인지 테스트
  });

  it("getSum test", () => {
    expect(getSum(5)).toBe(12); // getSum(5)가 12인지 테스트
  });
});
