import Card from "./Card";

// For randomness testing
beforeEach(() => {
  jest.spyOn(global.Math, "random").mockReturnValue(0.5);
});

afterEach(() => {
  jest.spyOn(global.Math, "random").mockRestore();
});

test("Card generation and toObject()", () => {
  expect(new Card("green", "diamond", "empty", "one").toObject()).toEqual({
    color: "green",
    symbol: "diamond",
    shading: "empty",
    number: "one",
  });
});
