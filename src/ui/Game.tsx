import React from "react";
import BoardComponent from "./Board";
import Board from "../logic/Board";
import Controls from "./Controls";

import "./styles/Game.scss";
import { isSet, findSets } from "../logic/GameLogic";
import _ from "lodash";
import { Triple } from "../logic/CardProps";

interface Props {}
interface State {
  board: Board;
  score: number;
  selectedCards: number[];
  sets: Triple<number>[];
  hintedCards: number[];
}

class Game extends React.Component<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);
    const board = new Board(12, 2);
    this.state = {
      board,
      score: 0,
      selectedCards: [],
      sets: findSets(board.getCards()),
      hintedCards: [],
    };
  }
  render() {
    console.log(this.state.sets);
    return (
      <div id="game">
        <div id="title-wrapper">
          <h1 id="title">Set</h1>
        </div>
        <div id="board-wrapper">
          <BoardComponent
            cards={this.state.board.getCards()}
            selectedCards={this.state.selectedCards}
            hintedCards={this.state.hintedCards}
            onCardClick={this.handleCardClick}
          />
        </div>
        <div id="controls-wrapper">
          <Controls
            giveHint={() => {
              this.giveHint();
            }}
            shuffle={() => {
              this.shuffleCards();
            }}
            score={this.state.score}
          />
        </div>
      </div>
    );
  }
  handleCardClick = (index: number) => {
    this.setState(
      (prevState) => {
        if (prevState.selectedCards.includes(index)) {
          return {
            selectedCards: prevState.selectedCards.filter((a) => a !== index),
          };
        } else if (prevState.selectedCards.length === 3) {
          return {
            selectedCards: prevState.selectedCards,
          };
        }
        return {
          selectedCards: [...prevState.selectedCards, index],
        };
      },
      () => {
        if (this.state.selectedCards.length === 3) {
          this.checkSet();
        }
      }
    );
  };
  shuffleCards = () => {
    this.setState((prevState) => {
      return {
        board: _.cloneDeep(prevState.board).shuffle(),
      };
    });
  };
  checkSet = () => {
    if (this.state.selectedCards.length !== 3) {
      throw new Error("Something bad happened!");
    }
    const setIsValid = isSet([
      this.state.board.getCard(this.state.selectedCards[0]),
      this.state.board.getCard(this.state.selectedCards[1]),
      this.state.board.getCard(this.state.selectedCards[2]),
    ]);
    if (setIsValid) {
      this.setState((prevState) => {
        const nextBoard = _.cloneDeep(prevState.board);
        nextBoard.replaceCards(
          //@ts-ignore
          this.state.selectedCards.slice(0, 3)
        );
        return {
          score: prevState.score + 1,
          selectedCards: [],
          board: nextBoard,
          sets: findSets(nextBoard.getCards()),
          hintedCards: [],
        };
      });
    }
  };
  giveHint = () => {
    // TODO: Verify that there are sets
    this.setState((prevState) => {
      if (prevState.hintedCards.length > 2) {
        return {
          hintedCards: prevState.hintedCards,
        };
      }
      return {
        hintedCards: [
          ...prevState.hintedCards,
          prevState.sets[0][prevState.hintedCards.length],
        ],
      };
    });
  };
}

export default Game;
