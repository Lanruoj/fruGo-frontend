import axios from "axios";
import { useEffect, useState } from "react";
import { useUserContext } from "../utils/UserContext";
import { Order } from "./Order";

export const OrderConfirmation = (props) => {
  const { newOrder } = useUserContext();
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
