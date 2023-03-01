import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import { HomePage } from "./pages/HomePage";
import { ProductsPage } from "./pages/ProductsPage";
import { Login } from "./components/Login";
import { AuthContext } from "./utils/AuthContext";
import { MerchantContext } from "./utils/MerchantContext";
import { NavBar } from "./components/NavBar";
import "./App.css";

function App() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [merchant, setMerchant] = useState("");
  const [token, setToken] = useState("");
  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          loggedInUser,
          setLoggedInUser,
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
          </Routes>
        </MerchantContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
