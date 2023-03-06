import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useUserContext } from "../utils/UserContext";

const OrderContainer = styled.div`
  border: solid black;
  border-radius: 0.3rem;
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

const StatusLabel = styled.label`
  display: block;
`;

export const Order = (props) => {
  const { role } = useUserContext();
  const { order } = props;
  const [status, setStatus] = useState("");
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
          <h3>Products</h3>
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
        {role == "Customer" && (
          <div>
            <b>Status:</b> {order.status}
          </div>
        )}
        {role == "Merchant" && (
          <form onSubmit={handleSubmitStatus}>
            <StatusLabel htmlFor="status">
              <b>Status:</b> {order.status}
            </StatusLabel>
            <select
              name="status"
              id="status"
              onChange={handleStatusChange}
              value={status}
            >
              <option disabled={true} value="">
                Update
              </option>
              <option value="pending">Pending</option>
              <option value="complete">Complete</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button type="submit">Submit</button>
          </form>
        )}
      </OrderDetails>
    </OrderContainer>
  );
};
