import axios from "axios";
import { useEffect, useState } from "react";
import { useUserContext } from "../utils/UserContext";
import { Order } from "./Order";
import { PageHeading } from "./styled/PageHeading";

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
      <PageHeading>Order confirmation</PageHeading>
      {order && <Order order={order} />}
    </>
  );
};
