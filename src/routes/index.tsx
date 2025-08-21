import App from "@/App";

import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { createBrowserRouter, Navigate } from "react-router";
import Verify from "./Verify";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { generateRoute } from "@/utils/generateRoute";
import { adminSideBarItems } from "./adminSideBarItems";
import { userSidebarItems } from "./userSideBarItems";
import { withAuth } from "@/utils/withAuth";
import Unauthorized from "@/pages/Unauthorized";
import { role } from "@/constants/role";
import { TRole } from "@/types";
import Tour from "@/pages/Tour";
import HomePage from "@/pages/HomePage/HomePage";
import TourDetails from "@/pages/TourDetails";
import Booking from "@/pages/Booking";
import Success from "@/pages/Payment/Success";
import Fail from "@/pages/Payment/Fail";
import Cancel from "@/pages/Payment/Cancel";

const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        Component: withAuth(About),
        path: "/about",
      },
      {
        Component: Tour,
        path: "/tours",
      },
      {
        Component: TourDetails,
        path: "/tours/:id",
      },
      {
        Component: withAuth(Booking),
        path: "/booking/:id",
      },
      {
        Component: Success,
        path: "/payment/success",
      },
      {
        Component: Fail,
        path: "/payment/fail",
      },
      {
        Component: Cancel,
        path: "/payment/cancel",
      },
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.superAdmin as TRole),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoute(adminSideBarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.user as TRole),
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
  {
    path: "/unauthorized",
    Component: Unauthorized,
  },
]);
export default router;
