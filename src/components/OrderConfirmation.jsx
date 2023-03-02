import axios from "axios";
import { useEffect, useState } from "react";
import { useCartContext } from "../utils/CartContext";

export const OrderConfirmation = (props) => {
  const { newOrder } = useCartContext();
  const [order, setOrder] = useState("");
  useEffect(() => {
    console.log(newOrder);
    axios.get(`/orders/${newOrder}`).then((response) => {
      console.log(response.data.data);
      setOrder(() => {
        return response.data.data;
      });
    });
  }, [newOrder]);
  return (
    <>
      <div>
        <h1>Order confirmation</h1>
        <h3>Products</h3>
        <ul>
          {order &&
            order._orderProducts.map((orderProduct) => {
              return (
                <li key={orderProduct._id}>
                  <div>{orderProduct._product.name}</div>
                  <div>{orderProduct._product.price}</div>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};
