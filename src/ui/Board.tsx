import React from "react";
import Card from "../logic/Card";
import CardComponent from "./Card";
import "./styles/Board.scss";
import _ from "lodash";

interface Props {
  cards: Card[];
  selectedCards: number[]; // Indexes
  hintedCards: number[]; // Indexes
  onCardClick: (index: number) => void;
}

const Board = (props: Props) => {
  const cardTable = _.chunk(props.cards, 3);
  return (
    <table id="board">
      <tbody>
        {cardTable.map((row: Card[], rowIndex: number) => (
          <tr key={rowIndex} className="boardRow">
            {row.map((card: Card, cardIndex: number) => (
              <td key={cardIndex} className="boardCell">
                <CardComponent
                  cardProperties={card.toObject()}
                  onClick={() => {
                    props.onCardClick(rowIndex * 3 + cardIndex);
                  }}
                  selected={props.selectedCards.includes(
                    rowIndex * 3 + cardIndex
                  )}
                  isHint={props.hintedCards.includes(rowIndex * 3 + cardIndex)}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Board;
