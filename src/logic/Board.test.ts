import Board from "./Board";
import _ from "lodash";

test("generated cards are unique", () => {
  const board = new Board();
  const cards = board.getCards();
  expect(_.isEqual(_.uniqWith(cards, _.isEqual), cards)).toBe(true);
});

export {};
