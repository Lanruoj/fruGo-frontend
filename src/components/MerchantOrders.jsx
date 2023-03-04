import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../utils/AuthContext";
import { Order } from "./Order";

export const MerchantOrders = (props) => {
  const { loggedInUser } = useAuthContext();
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  useEffect(() => {
    axios
      .get(`/merchants/${loggedInUser._id}/orders${statusFilter}`)
      .then((response) => {
        setOrders(() => {
          console.log(response.data.data);
          return response.data.data;
        });
      });
  }, [statusFilter]);
  const handleStatusFilter = (event) => {
    event.preventDefault();
    setStatusFilter(() => {
      return event.target.value;
    });
  };
  return (
    <>
      <h1>Orders</h1>
      <select onChange={handleStatusFilter}>
        <option value="?status=pending">Pending</option>
        <option value="?status=complete">Complete</option>
        <option value="?status=cancelled">Cancelled</option>
      </select>
      <div>
        {orders.length ? (
          orders.map((order) => {
            return <Order key={order._id} order={order} />;
          })
        ) : (
          <p>No current orders</p>
        )}
      </div>
    </>
  );
};
