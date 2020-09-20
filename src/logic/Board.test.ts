import Board from "./Board";
import _ from "lodash";
import { isSet } from "./GameLogic";

test("generated cards are unique", () => {
  const board = new Board();
  const cards = board.getCards();
  expect(_.isEqual(_.uniqWith(cards, _.isEqual), cards)).toBe(true);
});

test("replace cards doesn't replace with a set", () => {
  const board = new Board();
  // (79/80)^1000 of a false negative.
  for (let i = 0; i < 1000; i++) {
    board.replaceCards([0, 1, 2]);
    expect(isSet([board.getCard(0), board.getCard(1), board.getCard(2)])).toBe(
      false
    );
  }
});

export {};
