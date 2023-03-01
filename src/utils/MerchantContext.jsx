import { createContext, useContext } from "react";

export const MerchantContext = createContext("");
export const useMerchantContext = () => useContext(MerchantContext);
