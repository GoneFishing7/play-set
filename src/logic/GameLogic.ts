import Card from "./Card";
import _ from "lodash";
import { getAllEnumKeys } from "enum-for";
import { CardPropsKeys, Triple } from "./CardProps";

/**
 * Check if three cards are a valid set
 *
 * @export
 * @param {Triple<Card>} cards The three cards
 * @returns {boolean} Whether the cards make up a set.
 */
export function isSet(cards: Triple<Card>): boolean {
  let cardsAsObjects = cards.map((c) => c.toObject());
  for (const property of getAllEnumKeys(CardPropsKeys)) {
    // There will be one or three of each type for each property
    if (_.uniqBy(cardsAsObjects, property).length === 2) {
      return false;
    }
  }
  return true;
}

/**
 * Find the sets from an array of cards
 *
 * @export
 * @param {Card[]} cards The cards
 * @returns {Triple<number>[]} An array of the sets found, or if no sets found, an empty array.
 */
export function findSets(cards: Card[]): Triple<number>[] {
  let sets: Triple<number>[] = [];
  for (let cardAIndex = 0; cardAIndex < cards.length - 2; cardAIndex++) {
    for (
      let cardBIndex = cardAIndex + 1;
      cardBIndex < cards.length - 1;
      cardBIndex++
    ) {
      for (
        let cardCIndex = cardBIndex + 1;
        cardCIndex < cards.length;
        cardCIndex++
      ) {
        const cardA = cards[cardAIndex];
        const cardB = cards[cardBIndex];
        const cardC = cards[cardCIndex];
        if (isSet([cardA, cardB, cardC])) {
          sets.push([cardAIndex, cardBIndex, cardCIndex]);
        }
      }
    }
  }
  return sets;
}
