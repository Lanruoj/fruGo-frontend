import axios from "axios";
import { useEffect, useState } from "react";
import { useCartContext } from "../utils/CartContext";
import { Order } from "./Order";

export const OrderConfirmation = (props) => {
  const { newOrder } = useCartContext();
  const [order, setOrder] = useState("");
  useEffect(() => {
    axios.get(`/orders/${newOrder}`).then((response) => {
      setOrder(() => {
        return response.data.data;
      });
    });
  }, [newOrder]);
  return (
    <>
      <h1>Order confirmation</h1>
      <Order order={order} />
    </>
  );
};
