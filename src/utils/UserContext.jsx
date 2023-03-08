import { createContext, useContext, useEffect, useState } from "react";
import { authenticateUser } from "./auth";
import { Login } from "../components/Login";

export const UserContext = createContext("");
export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  useEffect(() => {
    const isLoggedIn = async () => {
      let user = authenticateUser();
      if (!user) {
        localStorage.setItem("user", "");
        user = "";
      }
      setCurrentUser(user);
    };
    isLoggedIn();
  }, []);
  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {currentUser?.token ? children : <Login />}
    </UserContext.Provider>
  );
};
