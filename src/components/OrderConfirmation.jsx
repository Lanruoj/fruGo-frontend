import axios from "axios";
import { useEffect, useState } from "react";
import { useCartContext } from "../utils/CartContext";
import { useCustomerContext } from "../utils/CustomerContext";
import { Order } from "./Order";

export const OrderConfirmation = (props) => {
  const { newOrder } = useCustomerContext();
  const [order, setOrder] = useState("");
  useEffect(() => {
    setOrder(() => {
      return newOrder;
    });
  }, [newOrder]);
  return (
    <>
      <h1>Order confirmation</h1>
      {order && <Order order={order} />}
    </>
  );
};
