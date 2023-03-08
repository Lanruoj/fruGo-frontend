import { createContext, useContext, useEffect, useState } from "react";
import { authenticateUser } from "./auth";
import { Login } from "../components/Login";
import { useLocation } from "react-router-dom";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [currentRole, setCurrentRole] = useState("");
  const [cart, setCart] = useState("");
  const [session, setSession] = useState("");
  useEffect(() => {
    const isLoggedIn = async () => {
      let { user, role, cart } = authenticateUser();
      if (!user) {
        localStorage.setItem("user", "");
        localStorage.setItem("role", "");
        localStorage.setItem("cart", "");
        user = "";
        role = "";
        cart = "";
      }
      setCurrentUser(user);
      setCurrentRole(role);
      setCart(cart);
    };
    isLoggedIn();
  }, [session]);
  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        currentRole,
        setCurrentRole,
        cart,
        setCart,
        session,
        setSession,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
