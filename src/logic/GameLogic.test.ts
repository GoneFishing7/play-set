import Card from "./Card";
import { isSet, findSets } from "./GameLogic";
import Board from "./Board";

test("isSet function", () => {
  // Set
  const card1A = new Card("green", "diamond", "empty", "one");
  const card1B = new Card("green", "diamond", "half", "three");
  const card1C = new Card("green", "diamond", "full", "two");
  // Not set
  const card2A = new Card("green", "diamond", "empty", "one");
  const card2B = new Card("green", "diamond", "half", "two");
  const card2C = new Card("green", "diamond", "full", "two");

  expect(isSet([card1A, card1B, card1C])).toBe(true);
  expect(isSet([card2A, card2B, card2C])).toBe(false);
});

test("findSets function", () => {
  let board = new Board(5);
  board.setCard(new Card("red", "diamond", "empty", "one"), 0);
  board.setCard(new Card("red", "diamond", "half", "one"), 1);
  board.setCard(new Card("purple", "diamond", "empty", "one"), 2);
  board.setCard(new Card("red", "diamond", "full", "one"), 3);
  board.setCard(new Card("green", "diamond", "empty", "one"), 4);
  expect(findSets(board.getCards())).toEqual([
    [0, 1, 3],
    [0, 2, 4],
  ]);
});
