import "./App.css";
import { Route, Routes, NavLink } from "react-router-dom";

// Below are import commands for the UI components
import NotLoggedInHomePage from "./components/HomePage/NotLoggedInHomePage";
import { ProductsPage } from "./components/ProductsPage/ProductsPage";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Register from "./components/Register";
import CustomerHomePage from "./components/CustomerPages/CustomerHomepage";
import CustomerProductsPage from "./components/CustomerPages/CustomerProductsPage";
import CustomerCartPage from "./components/CustomerPages/CustomerCartPage";
import CustomerOrderConfirmation from "./components/CustomerPages/CustomerOrderConfirmation";
import { useState } from "react";

function App() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [token, setToken] = useState("");
  return (
    <div className="App">
      <NavLink
        key="fruGo-title"
        style={{
          textDecoration: "none",
        }}
        to="/"
      >
        <h1 className="fruGo-title">fruGo</h1>
      </NavLink>
      <Routes>
        <Route exact path="/" element={<NotLoggedInHomePage />} />

        <Route exact path="products" element={<ProductsPage />} />

        <Route
          exact
          path="login"
          element={
            <Login
              loggedInUser={loggedInUser}
              setLoggedInUser={setLoggedInUser}
              setToken={setToken}
              token={token}
            />
          }
        />

        <Route exact path="register" element={<Register />} />

        <Route exact path="customer" element={<CustomerHomePage />} />
        <Route
          exact
          path="customer/products"
          element={<CustomerProductsPage />}
        />
        <Route exact path="customer/cart" element={<CustomerCartPage />} />
        <Route
          exact
          path="customer/order-confirmation"
          element={<CustomerOrderConfirmation />}
        />

        <Route exact path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
