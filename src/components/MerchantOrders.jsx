import axios from "axios";
import { useEffect, useState } from "react";
import { useUserContext } from "../utils/UserContext";
import { Order } from "./Order";
import { PageHeading } from "./styled/PageHeading";

export const MerchantOrders = (props) => {
  const { loggedInUser, role } = useUserContext();
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  useEffect(() => {
    if (role == "Customer") {
      axios.get(`/customers/${loggedInUser._id}/orders`).then((response) => {
        setOrders(() => {
          return response.data.data;
        });
      });
    } else if (role == "Merchant") {
      axios.get(`/customers/${loggedInUser._id}/orders`).then((response) => {
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
