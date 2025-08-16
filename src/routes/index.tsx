import App from "@/App";

import { About } from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { createBrowserRouter, Navigate } from "react-router";
import Verify from "./Verify";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { generateRoute } from "@/utils/generateRoute";
import { adminSideBarItems } from "./adminSideBarItems";
import { userSidebarItems } from "./userSideBarItems";

const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: About,
        path: "about",
      },
    ],
  },
  {
    Component: DashboardLayout,
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoute(adminSideBarItems),
    ],
  },
  {
    Component: DashboardLayout,
    path: "/user",
    children: [
      { index: true, element: <Navigate to="/user/bookings" /> },
      ...generateRoute(userSidebarItems),
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/verify",
    Component: Verify,
  },
]);
export default router;
