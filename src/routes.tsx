import { createBrowserRouter } from "react-router-dom";
import HomePage from "./Pages/Home/HomePage";
import Layout from "./Layout";
import GamePage from "./Pages/Game/GamePage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "games/:slug",
        element: <GamePage />,
      },
    ],
  },
]);

export default routes;
