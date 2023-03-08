import axios from "axios";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { Home } from "./components/Home";
import { CustomerProducts } from "./components/CustomerProducts";
import { Login } from "./components/Login";
import { NavBar } from "./components/NavBar";
import { Register } from "./components/Register";
import "./App.css";
import { Cart } from "./components/Cart";
import { OrderList } from "./components/OrderList";
import { OrderConfirmation } from "./components/OrderConfirmation";
import { Stock } from "./components/Stock";
import { CustomerRoute } from "./utils/CustomerRoute";
import { Main } from "./components/styled/Main";
import { MerchantRoute } from "./utils/MerchantRoute";
import { UserContext, UserContextProvider } from "./utils/UserContext";
import { AddNewStockProduct } from "./components/AddNewStockProduct";
import { UserProfile } from "./components/UserProfile";

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <NavBar />
        <Main>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              exact
              path="/login"
              element={
                localStorage.getItem("user") ? <Navigate to="/" /> : <Login />
              }
            />
            <Route
              exact
              path="/customer/register"
              element={
                localStorage.getItem("role") == "Customer" ? (
                  <Navigate to="/" />
                ) : (
                  <Register />
                )
              }
            />
            <Route path="customer">
              <Route
                path="profile"
                element={
                  <CustomerRoute>
                    <UserProfile />
                  </CustomerRoute>
                }
              />
              <Route index path="products" element={<CustomerProducts />} />
              <Route
                path="cart"
                element={
                  <CustomerRoute>
                    <Cart />
                  </CustomerRoute>
                }
              />
              <Route
                path="orders"
                element={
                  <CustomerRoute>
                    <OrderList />
                  </CustomerRoute>
                }
              />
              <Route
                path={`orderConfirmation/:orderID`}
                element={
                  <CustomerRoute>
                    <OrderConfirmation />
                  </CustomerRoute>
                }
              />
            </Route>
            <Route path="merchant">
              <Route path="stock">
                <Route
                  index
                  element={
                    <MerchantRoute>
                      <Stock />
                    </MerchantRoute>
                  }
                />
                <Route
                  path="add"
                  element={
                    <MerchantRoute>
                      <AddNewStockProduct />
                    </MerchantRoute>
                  }
                />
              </Route>
              <Route
                path="profile"
                element={
                  <MerchantRoute>
                    <UserProfile />
                  </MerchantRoute>
                }
              />
              <Route
                path="orders"
                element={
                  <MerchantRoute>
                    <OrderList />
                  </MerchantRoute>
                }
              />
            </Route>
          </Routes>
        </Main>
      </UserContextProvider>
    </div>
  );
}

export default App;
