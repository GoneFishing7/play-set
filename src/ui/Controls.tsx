import React from "react";
import Button from "./Button";
import "./styles/Controls.scss";

interface Props {
  giveHint: () => void;
  shuffle: () => void;
  score: number;
}

const Controls = (props: Props) => {
  return (
    <div id="controls">
      <div id="hint-button">
        <Button color="blue" onClick={props.giveHint}>
          <span role="img" aria-label="emoji">
            🤷‍♂️
          </span>{" "}
          Hint
        </Button>
      </div>
      <div id="shuffle-button">
        <Button color="blue" onClick={props.shuffle}>
          <span role="img" aria-label="emoji">
            🙃
          </span>{" "}
          Shuffle
        </Button>
      </div>
      <h2 id="score">Your score: {props.score}</h2>
    </div>
  );
};

export default Controls;
