import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../utils/AuthContext";
import { Order } from "./Order";

export const Orders = (props) => {
  const { loggedInUser } = useAuthContext();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get(`/customers/${loggedInUser._id}/orders`).then((response) => {
      setOrders(() => {
        return response.data.data;
      });
    });
  }, []);
  return (
    <>
      <h1>Orders</h1>
      <div>
        {orders.map((order) => {
          return <Order key={order._id} order={order} />;
        })}
      </div>
    </>
  );
};
