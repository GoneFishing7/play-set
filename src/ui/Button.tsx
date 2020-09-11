import React from "react";
import "./styles/Button.scss";

interface Props {
  onClick?: () => void;
  color?: string;
  largeButton?: boolean;
  roundedLeft?: boolean;
  roundedRight?: boolean;
  roundedNone?: boolean;
  staticOnHover?: boolean;
}

const Button = (props: React.PropsWithChildren<Props>) => {
  const classes = ["button"];
  if (props.color) {
    classes.push("button-" + props.color);
  } else {
    classes.push("button-gray");
  }
  if (props.largeButton) {
    classes.push("button-large");
  }
  if (props.roundedLeft) {
    classes.push("button-rounded-left");
  }
  if (props.roundedRight) {
    classes.push("button-rounded-right");
  }
  if (props.roundedNone) {
    classes.push("button-rounded-none");
  }
  if (props.staticOnHover) {
    classes.push("button-static");
  }
  return (
    <button onClick={props.onClick} className={classes.join(" ")}>
      {props.children}
    </button>
  );
};

export default Button;
