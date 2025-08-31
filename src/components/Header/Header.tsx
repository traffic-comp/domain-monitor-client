import type { HeaderProps } from "./Header.props";
import { currentDate } from "../../utils/utils.ts";
import s from "./header.module.css";
import cn from "classnames";
import type { JSX } from "react";
import BurgerIcon from "../icons/BurgerIcon/BurgerIcon.tsx";
import Logo from "../Logo/Logo.tsx";

const Header = ({ click, className, ...props }: HeaderProps): JSX.Element => {
  return (
    <header {...props} className={cn(className, s.header)}>
      <div className={s.logocontainer}>
        <Logo />
        <BurgerIcon click={click} />
      </div>
      <div className={s.headerContainer}>
        <h1 className={s.title}>Traffic Gateway</h1>
        <p>{currentDate()}</p>
      </div>
    </header>
  );
};

export default Header;
