import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout.tsx";
import Main from "./pages/Main/Main.tsx";
import Domains from "./pages/Domains/Domains.tsx";
import Proxy from "./pages/Proxy/Proxy.tsx";
import Blocks from "./pages/Blocks/Blocks.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Main /> },
      { path: "/domains", element: <Domains /> },
      { path: "/proxy", element: <Proxy /> },
      { path: "/Blocks", element: <Blocks /> },
    ],
  },
]);

export default router;
