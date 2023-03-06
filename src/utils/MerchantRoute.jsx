import { Navigate, useLocation } from "react-router-dom";
import { useUserContext } from "./UserContext";

export const MerchantRoute = ({ children }) => {
  const { loggedInUser, role } = useUserContext();
  const location = useLocation();
  if (!loggedInUser && role != "Merchant") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};
