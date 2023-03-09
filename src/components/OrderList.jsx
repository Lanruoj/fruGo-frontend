import axios from "axios";
import { useEffect, useState } from "react";
import { useUserContext } from "../utils/UserContext";
import { Order } from "./Order";
import { Dropdown } from "./styled/Dropdown";
import { Form, InputWrapper, Label } from "./styled/Form";
import { PageHeading } from "./styled/PageHeading";

export const OrderList = (props) => {
  const { currentUser, currentRole } = useUserContext();
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("?status=pending");
  useEffect(() => {
    if (currentRole == "Customer") {
      axios
        .get(`/customers/${currentUser._id}/orders${statusFilter}`)
        .then((response) => {
          setOrders(() => {
            return response.data.data;
          });
        });
    } else if (currentRole == "Merchant") {
      axios
        .get(`/merchants/${currentUser._id}/orders${statusFilter}`)
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
      <Form>
        <InputWrapper>
          <Label htmlFor="status-filter">Filter by status:</Label>
          <Dropdown
            name="status-filter"
            onChange={handleStatusFilter}
            defaultValue="?status=pending"
          >
            <option value="?status=pending">Pending</option>
            <option value="?status=complete">Complete</option>
            <option value="?status=cancelled">Cancelled</option>
          </Dropdown>
        </InputWrapper>
      </Form>
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
