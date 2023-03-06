import { Button } from "./styled/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CartProduct } from "./CartProduct";
import { useUserContext } from "../utils/UserContext";

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
  const { loggedInUser, merchant, cartProducts, setCartProducts, setNewOrder } =
    useUserContext();
  const navigate = useNavigate();
  const handleSubmitOrder = (event) => {
    axios
      .post("/orders", {
        cartProducts: cartProducts,
      })
      .then((response) => {
        setNewOrder(response.data.data);
      })
      .then(() => {
        for (let cartProduct of cartProducts) {
          axios.put(`/merchants/${merchant._id}/stock/products`, {
            stockProduct: cartProduct.stockProduct._id,
            quantity: cartProduct.stockProduct.quantity - cartProduct.quantity,
          });
          setCartProducts([]);
        }
      })
      .then(() => navigate(`/customer/orderConfirmation`));
  };
  const handleClearCart = () => {
    axios
      .delete(`/customers/${loggedInUser._id}/cart/products?all=true`)
      .then(() => {
        setCartProducts([]);
      })
      .catch((error) => console.log(error));
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
      {!!cartProducts.length && (
        <>
          <Button onClick={handleSubmitOrder}>Checkout</Button>
          <Button onClick={handleClearCart}>Clear cart</Button>
        </>
      )}
    </CartContainer>
  );
};
