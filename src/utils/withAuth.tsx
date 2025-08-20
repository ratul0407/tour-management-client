import { useGetMeQuery } from "@/redux/features/auth/auth.api";
import { TRole } from "@/types";
import { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  return function AuthWrapper() {
    const { data, isLoading } = useGetMeQuery(undefined);
    if (!isLoading && !data?.data?.data?.email) {
      return <Navigate to="/login" />;
    }
    if (requiredRole && !isLoading && requiredRole !== data?.data?.data?.role) {
      return <Navigate to="/unauthorized" />;
    }
    return <Component />;
  };
};
