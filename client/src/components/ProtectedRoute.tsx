import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/store";
import type { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  console.log(userInfo);

  if (!userInfo) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
