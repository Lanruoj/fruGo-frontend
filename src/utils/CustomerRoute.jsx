import { Navigate, useLocation } from "react-router-dom";
import { useUserContext } from "./UserContext";

export const CustomerRoute = ({ children }) => {
  const { currentRole } = useUserContext();
  const location = useLocation();
  if (!currentRole && currentRole != "Customer") {
    console.log("Bananas");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};
