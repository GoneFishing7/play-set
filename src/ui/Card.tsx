import React from "react";
import {
  CardSymbol,
  CardProps,
  CardShading,
  CardColor,
  CardColorEnum,
} from "../logic/CardProps";
import "./styles/Card.scss";

interface Props {
  cardProperties: CardProps;
  onClick?: () => void;
  selected?: boolean;
  isHint?: boolean;
}

const Card = (props: Props) => {
  let { color, symbol, shading, number } = props.cardProperties;
  let classes = ["card"];
  if (props.selected) {
    classes.push("selected");
  }
  if (props.isHint) {
    classes.push("hint");
  }
  return (
    <svg
      viewBox="0 0 150 100"
      preserveAspectRatio="xMidYMid meet"
      className={classes.join(" ")}
      onClick={props.onClick}
    >
      <defs>
        {Object.values(CardColorEnum).map((co) => (
          <pattern
            id={`${co}half`}
            x="0"
            y="0"
            width="10"
            height="4"
            patternUnits="userSpaceOnUse"
            key={`${co}half`}
          >
            {/* 
                // @ts-ignore */}
            <rect width="10" height="1" stroke={co} />
          </pattern>
        ))}
        {Object.values(CardColorEnum).map((co) => (
          <pattern
            id={`${co}full`}
            x="0"
            y="0"
            width="1"
            height="1"
            patternUnits="userSpaceOnUse"
            key={`${co}full`}
          >
            {/* 
                // @ts-ignore */}
            <rect width="1" height="1" stroke={co} />
          </pattern>
        ))}
      </defs>
      <g
        transform={`translate(${
          number === "one" ? "0" : number === "two" ? "-20" : "-40"
        }, 0)`}
      >
        {generateSymbol(color, symbol, shading)}
      </g>
      {number !== "one" && (
        <g transform={`translate(${number === "two" ? "20" : "0"}, 0)`}>
          {generateSymbol(color, symbol, shading)}
        </g>
      )}
      {number === "three" && (
        <g transform={`translate(40, 0)`}>
          {generateSymbol(color, symbol, shading)}
        </g>
      )}
    </svg>
  );
};

/**
 * Generate a jsx svg for the given SET symbol
 * @param co The color of the card
 * @param sy The shape/symbol of the card
 * @param sh The shading for each symbol
 */
const generateSymbol = (co: CardColor, sy: CardSymbol, sh: CardShading) => {
  const strokeWidth = 2;
  const fill = `url(#${co}${sh})`;
  if (sy === "squiggle") {
    // Squiggle
    return (
      <path
        d="M 65.667943,34.045303 C 87.27875,39.803809 41.990889,59.441302 72.173537,76.913458 87.083275,85.880228 96.329278,73.074631 84.85121,66.826656 81.5896,65.05123 76.227993,61.395792 81.063786,56.824618 95.230412,32.999185 83.571571,25.755302 78.51794,21.476024 65.084059,15.753205 52.27903,28.108168 65.667943,34.045303 Z"
        fill={fill}
        stroke={co}
        strokeWidth={strokeWidth}
      />
    );
  } else if (sy === "diamond") {
    // Diamond
    return (
      <path
        d="M 75,20 60,50 75,80 90,50 Z"
        fill={fill}
        stroke={co}
        strokeWidth={strokeWidth}
      />
    );
  } else {
    // Oval
    return (
      <rect
        rx="20"
        ry="15.24699"
        y="20"
        x="60"
        height="60"
        width="30"
        fill={fill}
        stroke={co}
        strokeWidth={strokeWidth}
      />
    );
  }
};

export default Card;
