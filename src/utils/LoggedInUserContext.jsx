import { createContext } from "react";

export const LoggedInUserContext = createContext();
export const useLoggedInContext = useContext(LoggedInUserContext);
