import axios from "axios";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { HomePage } from "./pages/HomePage";
import { Products } from "./components/Products";
import { Login } from "./components/Login";
import { AuthContext } from "./utils/AuthContext";
import { CustomerContext } from "./utils/CustomerContext";
import { NavBar } from "./components/NavBar";
import { Register } from "./components/Register";
import "./App.css";
import { CartContext } from "./utils/CartContext";
import { Cart } from "./components/Cart";
import { OrderList, Orders } from "./components/OrderList";
import { OrderConfirmation } from "./components/OrderConfirmation";
import { Stock } from "./components/Stock";
import { CustomerRoute } from "./utils/CustomerRoute";
import { Order } from "./components/Order";
import { Main } from "./components/styled/Main";
import { MerchantOrders } from "./components/MerchantOrders";
import { MerchantRoute } from "./utils/MerchantRoute";
import { CustomerRoutes } from "./components/CustomerRoutes";

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
        navigate("/customer/products");
        axios.get(`/customers/${loggedInUser._id}/cart`).then((response) => {
          setCartProducts((prev) => {
            let data = response.data.data._cartProducts;
            const cartProducts = data.map((cartProduct) => {
              return { stockProduct: cartProduct, quantity: 1 };
            });
            return cartProducts;
          });
        });
      } else if (localStorage.getItem("role") == "Merchant") {
        navigate("/merchant/stock");
      }
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
        <CustomerContext.Provider
          value={{
            merchant,
            setMerchant,
            cartProducts,
            setCartProducts,
            newOrder,
            setNewOrder,
          }}
        >
          <NavBar />
          <Main>
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/customer/register" element={<Register />} />
              <Route path="customer">
                <Route path="products" element={<Products />} />
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
                  path={`orderConfirmation`}
                  element={
                    <CustomerRoute>
                      <OrderConfirmation />
                    </CustomerRoute>
                  }
                />
              </Route>

              {/* {MERCHANT ROUTES} */}
              <Route path="merchant">
                <Route
                  path="/merchant/stock"
                  element={
                    <MerchantRoute>
                      <Stock />
                    </MerchantRoute>
                  }
                />
                <Route
                  path="/merchant/orders"
                  element={
                    <MerchantRoute>
                      <OrderList />
                    </MerchantRoute>
                  }
                />
              </Route>
            </Routes>
          </Main>
        </CustomerContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
