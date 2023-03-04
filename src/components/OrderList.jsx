import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../utils/AuthContext";
import { Order } from "./Order";

export const OrderList = (props) => {
  const { loggedInUser, role } = useAuthContext();
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  useEffect(() => {
    if (role == "Customer") {
      axios
        .get(`/customers/${loggedInUser._id}/orders${statusFilter}`)
        .then((response) => {
          setOrders(() => {
            return response.data.data;
          });
        });
    } else if (role == "Merchant") {
      axios
        .get(`/customers/${loggedInUser._id}/orders${statusFilter}`)
        .then((response) => {
          console.log(response.data.data);
          setOrders(() => {
            return response.data.data;
          });
        });
    }
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
          <p>You currently have no {statusFilter.split("=")[1]} orders</p>
        )}
      </div>
    </>
  );
};
