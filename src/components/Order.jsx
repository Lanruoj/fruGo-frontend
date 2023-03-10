import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUserContext } from "../utils/UserContext";
import { Button } from "./styled/Button";
import { Dropdown } from "./styled/Dropdown";
import { Form, Input, InputWrapper, Label } from "./styled/Form";

const OrderContainer = styled.div`
  border: solid black;
  border-radius: 0.3rem;
  background-color: white;
  padding: 1rem;
`;

const OrderDetails = styled.ul`
  list-style: none;
`;
const OrderProducts = styled.ul`
  list-style: none;
`;
const CustomerDetails = styled.ul`
  list-style: none;
  text-align: left;
`;

const OrderProduct = styled.li`
  text-align: left;
  margin: 1rem 0 1rem 0;
`;

export const Order = (props) => {
  const { currentRole } = useUserContext();
  const { order } = props;
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setStatus(order.status);
  }, [order]);
  const handleStatusChange = (event) => {
    setStatus(() => {
      return event.target.value;
    });
  };
  const handleSubmitStatus = (event) => {
    axios
      .put(`/orders/${order._id}`, {
        status: status,
      })
      .then((response) => console.log(response));
  };
  const handleCancelOrder = () => {
    axios
      .put(`/orders/${order._id}`, {
        status: "cancelled",
      })
      .then((response) => navigate(0));
  };
  return (
    <OrderContainer>
      <div>
        <b>Order no:</b> {order._id}
      </div>
      <OrderDetails>
        <CustomerDetails>
          <div>
            <b>Customer:</b>{" "}
            {`${order._customer.firstName} ${order._customer.lastName}`}
          </div>
          <div>
            <b>Address:</b>{" "}
            {`${order._customer.streetAddress}, ${order._customer._city.name}`}
          </div>
        </CustomerDetails>
        <OrderProducts>
          <h3>Items</h3>
          {order &&
            order._orderProducts.map((orderProduct) => {
              return (
                <OrderProduct key={orderProduct.stockProduct._id}>
                  <div>
                    <b>Name:</b> {orderProduct.stockProduct._product.name}
                  </div>
                  <div>
                    <b>Serial no:</b> {orderProduct.stockProduct._id}
                  </div>
                  <div>
                    <b>Quantity:</b> {orderProduct.quantity}
                  </div>
                  <div>
                    <b>Subtotal:</b> $
                    {Number.parseFloat(
                      orderProduct.stockProduct._product.price *
                        orderProduct.quantity
                    ).toFixed(2)}
                  </div>
                </OrderProduct>
              );
            })}
        </OrderProducts>
        <div>
          <b>Total price: </b>${Number.parseFloat(order.totalPrice).toFixed(2)}
        </div>
        {currentRole == "Merchant" && (
          <Form onSubmit={handleSubmitStatus}>
            <InputWrapper>
              <Label htmlFor="status">Status: </Label>
              <Dropdown
                name="status"
                id="status"
                onChange={handleStatusChange}
                value={status}
                disabled={
                  order.status == "complete" || order.status == "cancelled"
                }
              >
                <option value="pending">Pending</option>
                <option value="complete">Complete</option>
                <option value="cancelled">Cancelled</option>
              </Dropdown>
              <Button type="submit">Submit</Button>
            </InputWrapper>
          </Form>
        )}
        {currentRole == "Customer" && (
          <>
            <p>Status: {order.status}</p>
            <Button onClick={handleCancelOrder}>Cancel order</Button>
          </>
        )}
      </OrderDetails>
    </OrderContainer>
  );
};
