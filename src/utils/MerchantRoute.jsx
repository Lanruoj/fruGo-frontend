import { Navigate, useLocation } from "react-router-dom";
import { useUserContext } from "./UserContext";

export const MerchantRoute = ({ children }) => {
  const { currentUser, currentRole } = useUserContext();
  const location = useLocation();
  if (!currentUser && currentRole != "Merchant") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};
