import { Outlet } from "react-router";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import s from "./layout.module.css";
import { useState, type JSX } from "react";
import cn from "classnames";

const Layout = (): JSX.Element => {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <>
      <div className={`${s.layout}`}>
        <Sidebar
          click={setIsActive}
          className={cn(s.sidebar, { [s.active]: isActive })}
        />
        <Header className={s.header} click={setIsActive} />
        <main className={s.main} style={{ overflowY: "auto" }}>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
