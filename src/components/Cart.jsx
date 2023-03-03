import { Button } from "./styled/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCartContext } from "../utils/CartContext";
import { useMerchantContext } from "../utils/MerchantContext";
import { CartProduct } from "./CartProduct";

const CartContainer = styled.div`
  height: 100%;
  width: 100vw;
`;

const CartProductList = styled.ul`
  height: 100%;
  flex-direction: column;
  align-items: center;
`;

export const Cart = () => {
  const { cartProducts, setCartProducts, setNewOrder } = useCartContext();
  const { merchant } = useMerchantContext();
  const navigate = useNavigate();
  const handleSubmitOrder = (event) => {
    axios
      .post("/orders", {
        cartProducts: cartProducts,
      })
      .then((response) => {
        setNewOrder(response.data.data._id);

        navigate(`/customer/orderConfirmation/${response.data.data._id}`);
      })
      .then(() => {
        for (let cartProduct of cartProducts) {
          axios.put(`/merchants/${merchant._id}/stock/products`, {
            stockProduct: cartProduct.stockProduct._id,
            quantity: cartProduct.stockProduct.quantity - cartProduct.quantity,
          });
          setCartProducts([]);
        }
      });
  };

  return (
    <CartContainer>
      <h1>Cart</h1>
      <CartProductList>
        {cartProducts.length
          ? cartProducts.map((cartProduct) => {
              return (
                <CartProduct
                  key={cartProduct.stockProduct._id + "CartProduct"}
                  cartProduct={cartProduct}
                />
              );
            })
          : "No products in cart"}
      </CartProductList>
      <Button onClick={handleSubmitOrder}>Submit order</Button>
    </CartContainer>
  );
};
