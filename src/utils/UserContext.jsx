import { createContext, useContext, useEffect, useState } from "react";
import { authenticateUser } from "./auth";
import { Login } from "../components/Login";
import { useLocation } from "react-router-dom";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [currentToken, setCurrentToken] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [currentRole, setCurrentRole] = useState("");
  const [cart, setCart] = useState("");
  const [session, setSession] = useState(1);
  useEffect(() => {
    const isLoggedIn = async () => {
      let { token, user, role, cart } = authenticateUser();
      if (!user) {
        localStorage.setItem("token", "");
        localStorage.setItem("user", "");
        localStorage.setItem("role", "");
        localStorage.setItem("cart", "");
        token = "";
        user = "";
        role = "";
        cart = "";
      }
      setCurrentToken(token);
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
        currentToken,
        setCurrentToken,
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
