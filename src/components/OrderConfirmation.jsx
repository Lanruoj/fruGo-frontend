import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Order } from "./Order";
import { PageHeading } from "./styled/PageHeading";

export const OrderConfirmation = (props) => {
  const { orderID } = useParams();
  const [order, setOrder] = useState("");
  useEffect(() => {
    axios.get(`/orders/${orderID}`).then((response) => {
      setOrder(() => {
        return response.data.data;
      });
    });
  }, []);
  return (
    <>
      <PageHeading>Order confirmation</PageHeading>
      {order && <Order order={order} />}
    </>
  );
};
