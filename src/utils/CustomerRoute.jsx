import { Navigate, useLocation } from "react-router-dom";
import { useUserContext } from "./UserContext";

export const CustomerRoute = ({ children }) => {
  const { loggedInUser, role } = useUserContext();
  const location = useLocation();
  if (!loggedInUser && role != "Customer") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};
