import { createBrowserRouter } from "react-router-dom";
import HomePage from "./Pages/Home/HomePage";
import Layout from "./Layout";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
]);

export default routes;
