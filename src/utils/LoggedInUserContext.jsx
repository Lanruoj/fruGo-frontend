import { createContext, useContext } from "react";

export const LoggedInUserContext = createContext("");
export const useLoggedInUserContext = () => useContext(LoggedInUserContext);
