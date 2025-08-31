import type { JSX } from "react";
import type { LogoProps } from "./Logo.props";

import s from "./logo.module.css";
import cn from "classnames";

const Logo = ({ className, ...props }: LogoProps): JSX.Element => {
  return (
    <img
      src="logo.png"
      alt="logo"
      {...props}
      className={cn(s.logo, className)}
    />
  );
};

export default Logo;
