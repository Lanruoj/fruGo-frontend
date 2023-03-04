import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "./AuthContext";

export const MerchantRoute = ({ children }) => {
  const { loggedInUser, role } = useAuthContext();
  const location = useLocation();
  if (!loggedInUser && role != "Merchant") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};
