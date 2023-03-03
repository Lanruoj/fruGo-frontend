import axios from "axios";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { HomePage } from "./pages/HomePage";
import { Products } from "./components/Products";
import { Login } from "./components/Login";
import { AuthContext } from "./utils/AuthContext";
import { MerchantContext } from "./utils/MerchantContext";
import { NavBar } from "./components/NavBar";
import { Register } from "./components/Register";
import "./App.css";
import { CartContext } from "./utils/CartContext";
import { Cart } from "./components/Cart";
import { Orders } from "./components/Orders";
import { OrderConfirmation } from "./components/OrderConfirmation";
import { Stock } from "./components/Stock";
import { CustomerRoute } from "./utils/CustomerRoute";
import { Order } from "./components/Order";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loggedInUser, setLoggedInUser] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : ""
  );
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const [merchant, setMerchant] = useState(
    localStorage.getItem("merchant")
      ? JSON.parse(localStorage.getItem("merchant"))
      : ""
  );
  const [cartProducts, setCartProducts] = useState([]);
  const [newOrder, setNewOrder] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (loggedInUser) {
      setToken(() => {
        return localStorage.getItem("token");
      });
      setRole(() => {
        return localStorage.getItem("role");
      });
      if (localStorage.getItem("role") == "Customer") {
        setMerchant(() => {
          return JSON.parse(localStorage.getItem("merchant"));
        });
      }
      navigate("/products");
      axios.get(`/customers/${loggedInUser._id}/cart`).then((response) => {
        setCartProducts((prev) => {
          let data = response.data.data._cartProducts;
          const cartProducts = data.map((cartProduct) => {
            return { stockProduct: cartProduct, quantity: 1 };
          });
          return cartProducts;
        });
      });
    } else if (!loggedInUser) {
      navigate("/");
    }
  }, [loggedInUser]);
  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          loggedInUser,
          setLoggedInUser,
          role,
          setRole,
          token,
          setToken,
        }}
      >
        <MerchantContext.Provider value={{ merchant, setMerchant }}>
          <CartContext.Provider
            value={{ cartProducts, setCartProducts, newOrder, setNewOrder }}
          >
            <NavBar />
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register/customer" element={<Register />} />
              {/* {CUSTOMER ROUTES} */}
              <Route exact path="/products" element={<Products />} />
              <Route
                exact
                path="/cart"
                element={
                  <CustomerRoute>
                    <Cart />
                  </CustomerRoute>
                }
              />
              <Route
                exact
                path="/orders"
                element={
                  <CustomerRoute>
                    <Orders />
                  </CustomerRoute>
                }
              />
              <Route
                path={`/orderConfirmation/${newOrder}`}
                element={
                  <CustomerRoute>
                    <OrderConfirmation />
                  </CustomerRoute>
                }
              />
              {/* {MERCHANT ROUTES} */}
              <Route exact path="/merchant/stock" element={<Stock />} />
            </Routes>
          </CartContext.Provider>
        </MerchantContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
