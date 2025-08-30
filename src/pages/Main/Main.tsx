import type { JSX } from "react";
import ProxyStats from "./ProxyStats/ProxyStats";

const Main = (): JSX.Element => {
  return (
    <>
      <div style={{ padding: "20px", height: "100%", overflow: "auto" }}>
        <ProxyStats />
      </div>
    </>
  );
};

export default Main;
