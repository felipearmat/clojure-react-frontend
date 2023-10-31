import { Navigate } from "react-router-dom";
import AppView from "./views/AppView";
import CalculatorContent from "./contents/CalculatorContent";
import RecordsContent from "./contents/RecordsContent";

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
