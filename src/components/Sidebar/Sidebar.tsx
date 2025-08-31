import type { JSX } from "react";
import type { SidebarProps } from "./Sidebar.props";
import Logo from "../Logo/Logo";
import s from "./sidebar.module.css";
import DashboardIcon from "../icons/DashboardIcon/DashboardIcon";
import DomainsIcon from "../icons/DomainsIcon/DomainsIcon";
import SidebarItem from "./SidebarItem/SidebarItem";
import cn from "classnames";
import { useLocation } from "react-router";
import ProxyIcon from "../icons/ProxyIcon/ProxyIcon";
import BlockIcon from "../icons/BlockIcon/BlockIcon";

const Sidebar = ({ click, className, ...props }: SidebarProps): JSX.Element => {
  const location = useLocation();

  const routerConfig: {
    text: string;
    path: string;
    icon: JSX.Element;
  }[] = [
    { text: "Dashboard", path: "/", icon: <DashboardIcon /> },
    {
      text: "Domains",
      path: "/domains",
      icon: <DomainsIcon />,
    },
    { text: "Proxy", path: "/proxy", icon: <ProxyIcon /> },
    // {
    //   text: "Domains screens",
    //   path: "/screens",
    //   icon: <ScreenIcon />,
    // },
    {
      text: "Blocks",
      path: "/blocks",
      icon: <BlockIcon />,
    },
  ];

  return (
    <div {...props} className={cn(s.sidebar, className)}>
      <Logo className={s.sidebarlogo} />
      <nav>
        <ul className={s.list}>
          {routerConfig.map(({ text, path, icon }) => (
            <SidebarItem
              text={text}
              path={path}
              isActive={location.pathname === path}
              key={path}
              onClick={() => click((prev) => !prev)}
            >
              {icon}
            </SidebarItem>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
