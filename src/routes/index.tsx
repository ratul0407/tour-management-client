import App from "@/App";

import { About } from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { createBrowserRouter } from "react-router";
import Verify from "./Verify";
import Bookings from "@/pages/user/Bookings";
import AdminLayout from "@/components/layout/AdminLayout";
import { generateRoute } from "@/utils/generateRoute";
import { adminSideBarItems } from "./adminSideBarItems";

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
    Component: AdminLayout,
    path: "/admin",
    children: [...generateRoute(adminSideBarItems)],
  },
  {
    Component: AdminLayout,
    path: "/user",
    children: [
      {
        Component: Bookings,
        path: "bookings",
      },
      {},
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
