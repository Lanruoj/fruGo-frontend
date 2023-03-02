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
              <Route exact path="/products" element={<Products />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/customers/register" element={<Register />} />
              <Route exact path="/cart" element={<Cart />} />
              <Route exact path="/orders" element={<Orders />} />
              <Route
                path={`/orderConfirmation/${newOrder}`}
                element={<OrderConfirmation />}
              />
            </Routes>
          </CartContext.Provider>
        </MerchantContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
