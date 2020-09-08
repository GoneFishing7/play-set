import _ from "lodash";
import Card from "./Card";
import {
  CardColorEnum,
  CardSymbolEnum,
  CardShadingEnum,
  CardNumberEnum,
  Triple,
} from "./CardProps";
import { getAllEnumKeys } from "enum-for";
import { findSets } from "./GameLogic";

export default class Board {
  /**
   * The minimum number of sets
   * @memberof Board
   */
  minSets: number;

  /**
   * The cards in the board
   * @memberof Board
   */
  cards: Card[];

  /**
   * Board constructs a random board
   * @param {number} [numCards=12] The number of cards in the board
   * @memberof Board
   */
  constructor(numCards = 12, minSets = 1) {
    if (numCards < 3) {
      throw new Error("Attempted to create a board of size < 3");
    }
    this.cards = [];
    this.minSets = minSets;
    do {
      this.cards = [];
      for (let i = 0; i < numCards; i++) {
        let card;
        do {
          card = new Card();
        } while (_.some(this.cards, card));
        this.cards.push(card);
      }
    } while (findSets(this.cards).length < this.minSets);
  }

  /**
   * Get the cards from the board
   *
   * @returns The cards
   * @memberof Board
   */
  getCards(): Card[] {
    return this.cards;
  }

  /**
   * Sets a card of the board to `card`
   *
   * @param {Card} card The new card
   * @param {number} index The index to replace it at
   * @memberof Board
   */
  setCard(card: Card, index: number): void {
    this.cards[index] = card;
  }

  /**
   * The card to get from the board
   *
   * @param {number} i The index of the card
   * @returns The card at the index
   * @memberof Board
   */
  getCard(i: number): Card {
    return this.cards[i];
  }

  /**
   * Replace the cards at three indexes,
   * ensuring that there is still a set.
   *
   * @param {Triple<number>} indexes The indexes of each card to replace
   * @memberof Board
   */
  replaceCards(indexes: Triple<number>): void {
    let newCards: Triple<Card>;
    do {
      do {
        newCards = [new Card(), new Card(), new Card()];
      } while (
        _.some(this.cards, newCards[0]) ||
        _.some(this.cards, newCards[1]) ||
        _.some(this.cards, newCards[2]) ||
        _.isEqual(newCards[0], newCards[1]) ||
        _.isEqual(newCards[0], newCards[2]) ||
        _.isEqual(newCards[1], newCards[2])
      );
      for (let i = 0; i < 3; i++) {
        this.cards[indexes[i]] = newCards[i];
      }
    } while (findSets(this.cards).length < this.minSets);
  }

  /**
   * Shuffle the cards in place.
   * @returns The shuffled cards
   */
  shuffle() {
    this.cards = _.shuffle(this.cards);
    return this;
  }

  /**
   * Generate a full 81-card deck
   *
   * @static
   * @param {boolean} [shouldShuffle=true] Deck should be shuffled
   * @returns The deck
   * @memberof Board
   */
  static generateDeck(shouldShuffle = true): Card[] {
    let cards: Card[] = [];
    for (let color of getAllEnumKeys(CardColorEnum)) {
      for (let symbol of getAllEnumKeys(CardSymbolEnum)) {
        for (let shading of getAllEnumKeys(CardShadingEnum)) {
          for (let number of getAllEnumKeys(CardNumberEnum)) {
            // @ts-ignore
            cards.push(new Card(color, symbol, shading, number));
          }
        }
      }
    }
    if (shouldShuffle) {
      _.shuffle(cards);
    }
    return cards;
  }
}
