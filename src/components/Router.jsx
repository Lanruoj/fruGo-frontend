import { Navigate, Route, Routes } from "react-router-dom";
import { AddNewStockProduct } from "./AddNewStockProduct";
import { Cart } from "./Cart";
import { CustomerProducts } from "./CustomerProducts";
import { Home } from "./Home";
import { Login } from "./Login";
import { OrderConfirmation } from "./OrderConfirmation";
import { OrderList } from "./OrderList";
import { Register } from "./Register";
import { Stock } from "./Stock";
import { UserProfile } from "./UserProfile";
import { CustomerRoute } from "../utils/CustomerRoute";
import { MerchantRoute } from "../utils/MerchantRoute";
import { useUserContext } from "../utils/UserContext";

export const Router = () => {
  const { currentUser } = useUserContext();
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route
        exact
        path="/login"
        element={currentUser ? <Navigate to="/" /> : <Login />}
      />
      <Route
        exact
        path="/customer/register"
        element={currentUser == "Customer" ? <Navigate to="/" /> : <Register />}
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
  );
};
