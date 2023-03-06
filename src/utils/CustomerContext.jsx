import { createContext, useContext } from "react";

export const CustomerContext = createContext("");
export const useCustomerContext = () => useContext(CustomerContext);
