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
          <NavBar />
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/products" element={<ProductsPage />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/customers/register" element={<Register />} />
          </Routes>
        </MerchantContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
