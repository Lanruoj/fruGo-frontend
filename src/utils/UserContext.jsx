import { createContext, useContext, useEffect, useState } from "react";
import { authenticateUser } from "./auth";
import { Login } from "../components/Login";
import { useLocation } from "react-router-dom";
import axios from "axios";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [currentToken, setCurrentToken] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [currentRole, setCurrentRole] = useState("");
  const [cart, setCart] = useState("");
  const [cartProducts, setCartProducts] = useState([]);
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
      setCurrentRole(role);
      setCart(cart);
    };
    isLoggedIn();
  }, [currentUser]);
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setCurrentUser(JSON.parse(localStorage.getItem("user")));
      setCurrentRole(localStorage.getItem("role"));
    }
  }, []);
  useEffect(() => {
    if (currentUser && currentRole == "Customer") {
      axios
        .get(`/customers/${currentUser._id}/cart`)
        .then((response) => {
          const fetchedCartProducts = response.data.data._cartProducts;
          if (fetchedCartProducts.length) {
            const productsWithQuantity = fetchedCartProducts.map(
              (cartProduct) => {
                return {
                  stockProduct: cartProduct,
                  quantity: 1,
                };
              }
            );
            setCartProducts(productsWithQuantity);
          }
        })
        .then(() => {});
    }
  }, [currentUser, cart]);
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
        cartProducts,
        setCartProducts,
        session,
        setSession,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
