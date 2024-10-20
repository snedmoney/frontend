import React from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
  canAccess: boolean;
  redirectPath: string;
};

const ProtectedRoute = ({
  children,
  canAccess,
  redirectPath,
}: ProtectedRouteProps) => {
  if (!canAccess) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
