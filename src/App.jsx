import axios from "axios";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { HomePage } from "./pages/HomePage";
import { ProductsPage } from "./pages/ProductsPage";
import { Login } from "./components/Login";
import { AuthContext } from "./utils/AuthContext";
import { MerchantContext } from "./utils/MerchantContext";
import { NavBar } from "./components/NavBar";
import { Register } from "./components/Register";
import "./App.css";
import { CartContext } from "./utils/CartContext";
import { Cart } from "./components/Cart";

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
  const [cart, setCart] = useState(
    localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : ""
  );
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
          <CartContext.Provider value={{ cart, setCart }}>
            <NavBar />
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/products" element={<ProductsPage />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/customers/register" element={<Register />} />
              <Route exact path="/cart" element={<Cart />} />
            </Routes>
          </CartContext.Provider>
        </MerchantContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
