import { Outlet } from "react-router";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import s from "./layout.module.css";
import { type JSX } from "react";
import cn from "classnames";

const Layout = (): JSX.Element => {
  return (
    <>
      <div className={`${s.layout} ${s.active}`}>
        <Sidebar className={cn(s.sidebar)} />
        <Header className={s.header} />
        <main className={s.main} style={{ overflowY: "auto" }}>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
