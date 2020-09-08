import {
  CardColor,
  CardNumber,
  CardShading,
  CardSymbol,
  CardColorEnum,
  CardSymbolEnum,
  CardShadingEnum,
  CardNumberEnum,
} from "./CardProps";
import _ from "lodash";
import { getAllEnumKeys } from "enum-for";

export default class Card {
  /**
   * The color of the card
   *
   * @type {CardColor}
   * @memberof Card
   */
  color: CardColor;

  /**
   * The card's symbol
   *
   * @type {CardSymbol}
   * @memberof Card
   */
  symbol: CardSymbol;

  /**
   * The shading of the card
   *
   * @type {CardShading}
   * @memberof Card
   */
  shading: CardShading;

  /**
   * The number of symbols in the card./
   *
   * @type {CardNumber}
   * @memberof Card
   */
  number: CardNumber;

  /**
   * Generate a new card.
   * @param {CardColor} [color] The color
   * @param {CardSymbol} [symbol] The symbol
   * @param {CardShading} [shading] The shading
   * @param {CardNumber} [number] The number
   * @memberof Card
   */
  constructor(
    color?: CardColor,
    symbol?: CardSymbol,
    shading?: CardShading,
    number?: CardNumber
  ) {
    if (!color || !symbol || !shading || !number) {
      // @ts-ignore
      this.color = _.sample(getAllEnumKeys(CardColorEnum));
      //@ts-ignore
      this.symbol = _.sample(getAllEnumKeys(CardSymbolEnum));
      //@ts-ignore
      this.shading = _.sample(getAllEnumKeys(CardShadingEnum));
      //@ts-ignore
      this.number = _.sample(getAllEnumKeys(CardNumberEnum));
    } else {
      this.color = color;
      this.symbol = symbol;
      this.shading = shading;
      this.number = number;
    }
  }

  /**
   * Card to object
   *
   * @returns The card as an object
   * @memberof Card
   */
  toObject() {
    return {
      color: this.color,
      symbol: this.symbol,
      shading: this.shading,
      number: this.number,
    };
  }
}
