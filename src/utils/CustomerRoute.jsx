import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "./AuthContext";

export const CustomerRoute = ({ children }) => {
  const { loggedInUser, role } = useAuthContext();
  const location = useLocation();
  if (!loggedInUser && role != "Customer") {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
  return children;
};
