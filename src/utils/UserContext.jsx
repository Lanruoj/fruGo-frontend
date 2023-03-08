import { createContext, useContext, useEffect, useState } from "react";
import { authenticateUser } from "./auth";
import { Login } from "../components/Login";

export const UserContext = createContext("");
export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [currentRole, setCurrentRole] = useState("");
  const [cart, setCart] = useState("");
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
  }, []);
  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);
  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        currentRole,
        setCurrentRole,
        cart,
        setCart,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
