export interface CardProps {
  color: CardColor;
  symbol: CardSymbol;
  shading: CardShading;
  number: CardNumber;
}

export type Triple<T> = [T, T, T];

export enum CardPropsKeys {
  color,
  symbol,
  shading,
  number,
}

export enum CardColorEnum {
  red,
  purple,
  green,
}
export type CardColor = keyof typeof CardColorEnum;
export enum CardSymbolEnum {
  squiggle,
  diamond,
  oval,
}
export type CardSymbol = keyof typeof CardSymbolEnum;
export enum CardShadingEnum {
  full,
  half,
  empty,
}
export type CardShading = keyof typeof CardShadingEnum;
export enum CardNumberEnum {
  one,
  two,
  three,
}
export type CardNumber = keyof typeof CardNumberEnum;
