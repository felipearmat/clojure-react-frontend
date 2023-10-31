import { Navigate } from "react-router-dom";
import React from "react";
import CalculatorContent from "./contents/CalculatorContent";
import RecordsContent from "./contents/RecordsContent";

// Avoiding circular imports (routes <- Appview <- SideBarContent <- routes)
const AppView = React.lazy(() => import("./views/AppView"));

const routes = [
  {
    path: "/",
    element: <AppView />,
    children: [
      {
        path: "/",
        label: "Home",
        element: <CalculatorContent />,
      },
      {
        path: "/records",
        label: "Records",
        element: <RecordsContent />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
];

export default routes;
