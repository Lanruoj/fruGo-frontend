import axios from "axios";
import { useEffect, useState } from "react";
import { useUserContext } from "../utils/UserContext";
import { Order } from "./Order";
import { PageHeading } from "./styled/PageHeading";

export const OrderList = (props) => {
  const { loggedInUser, role } = useUserContext();
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("?status=pending");
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
        .get(`/merchants/${loggedInUser._id}/orders${statusFilter}`)
        .then((response) => {
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
      <PageHeading>Orders</PageHeading>
      <select onChange={handleStatusFilter} defaultValue="?status=pending">
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
