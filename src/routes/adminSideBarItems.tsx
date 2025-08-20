import addDivision from "@/pages/admin/addDivision";
import AddTour from "@/pages/admin/AddTour";
import AddTourType from "@/pages/admin/AddTourType";
// import { Analytics } from "@/pages/Analytics";
// import { Analytics } from "@/pages/Analytics";
import { ISidebarItems } from "@/types";
import { lazy } from "react";

const Analytics = lazy(() => import("@/pages/Analytics"));
export const adminSideBarItems: ISidebarItems[] = [
  {
    title: "Dashboard",
    url: "#",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
    ],
  },
  {
    title: "Tour management",
    url: "#",
    items: [
      {
        title: "Add Tour",
        url: "/admin/add-tour",
        component: AddTour,
      },
      {
        title: "Add Division",
        url: "/admin/add-division",
        component: addDivision,
      },
      {
        title: "Add Tour Type",
        url: "/admin/tour-type",
        component: AddTourType,
      },
    ],
  },
];
