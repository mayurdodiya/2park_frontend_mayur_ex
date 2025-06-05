import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./components/App.jsx";
import VerifyOtp from "./components/VerifyOtp.jsx";
import Login from "./components/Login.jsx";
import Dashboard from "./components/Dashboard.jsx";
import { leftMenuData } from "./dummyData/leftMenuData.jsx";

const dynamicDashboardChildren = leftMenuData.map((item) => ({
  path: item.path,
  element: item.element || <div>Coming Soon</div>,
}));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/verifyOtp",
    element: <VerifyOtp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: dynamicDashboardChildren,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);
