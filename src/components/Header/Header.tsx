import type { HeaderProps } from "./Header.props";
import { currentDate } from "../../utils/utils.ts";
import s from "./header.module.css";
import cn from "classnames";
import type { JSX } from "react";
import Button from "../Button/Button.tsx";
const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
  return (
    <header {...props} className={cn(className, s.header)}>
      <h1 className={s.title}>Traffic Gateway</h1>
      <p>{currentDate()}</p>

      <Button>Switch to Best Mirror</Button>
    </header>
  );
};

export default Header;
