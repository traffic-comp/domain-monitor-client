import type { JSX } from "react";
import type { LogoProps } from "./Logo.props";

import s from "./logo.module.css";

const Logo = ({ ...props }: LogoProps): JSX.Element => {
  return <img src="logo.png" alt="logo" {...props} className={s.logo} />;
};

export default Logo;
