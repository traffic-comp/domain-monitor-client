import { Link } from "react-router-dom";
import type { SidebarItemProps } from "./SidebarItem.props";
import s from "./sidebaritem.module.css";
import cn from "classnames";
import type { JSX } from "react";
const SidebarItem = ({
  text,
  path,
  isActive,
  children,
  ...props
}: SidebarItemProps): JSX.Element => {
  return (
    <Link to={path} className={s.link}>
      <li
        {...props}
        className={cn(s.sidebarItem, {
          [s.active]: isActive,
        })}
      >
        {children}
        {text}
      </li>
    </Link>
  );
};

export default SidebarItem;
