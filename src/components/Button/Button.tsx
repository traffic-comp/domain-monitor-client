import type { JSX } from "react";
import type { ButtonProps } from "./Button.props";
import s from "../Button/button.module.css";
const Button = ({ click, children, ...props }: ButtonProps): JSX.Element => {
  return (
    <button className={s.btn} {...props} onClick={click}>
      {children}
    </button>
  );
};

export default Button;
