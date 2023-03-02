import { Button } from "./styled/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCartContext } from "../utils/CartContext";
import { useMerchantContext } from "../utils/MerchantContext";

const CartContainer = styled.div`
  height: 100%;
  width: 100vw;
`;

const CartProductList = styled.ul`
  height: 100%;
  flex-direction: column;
  align-items: center;
`;

const CartProduct = styled.li`
  border: solid red;
  flex-direction: column;
  justify-content: center;
  width: 400px;
  list-style: none;
  margin-top: 3rem;
`;
const CartProductName = styled.div`
  background-color: orange;
`;

const CartProductPrice = styled.div`
  /* background-color: purple; */
`;

const CartProductQuantity = styled.div`
  /* background-color: red; */
`;

const CartProductImg = styled.img`
  width: 100px;
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

        navigate(`/orderConfirmation/${response.data.data._id}`);
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
  const handleIncrementQuantity = (event) => {
    event.preventDefault();
    setCartProducts((prev) => {
      const cartProducts = [...prev];
      const index = cartProducts.findIndex(
        (cartProduct) => cartProduct.stockProduct._id == event.target.value
      );
      cartProducts[index].quantity += 1;
      return cartProducts;
    });
  };
  const handleDecrementQuantity = (event) => {
    event.preventDefault();
    setCartProducts((prev) => {
      const cartProducts = [...prev];
      const index = cartProducts.findIndex(
        (cartProduct) => cartProduct.stockProduct._id == event.target.value
      );
      cartProducts[index].quantity -= 1;
      if (cartProducts[index].quantity == 0) {
        cartProducts.splice(index, 1);
      }
      return cartProducts;
    });
  };
  return (
    <CartContainer>
      <h1>Cart</h1>
      <CartProductList>
        {cartProducts.length
          ? cartProducts.map((cartProduct) => {
              return (
                <CartProduct key={cartProduct.stockProduct._id + "CartProduct"}>
                  <CartProductName>
                    {cartProduct.stockProduct._product.name}
                  </CartProductName>
                  <CartProductImg
                    src={cartProduct.stockProduct._product.img}
                  ></CartProductImg>
                  <CartProductQuantity>Quantity:</CartProductQuantity>
                  <form>
                    <Button
                      onClick={handleIncrementQuantity}
                      value={cartProduct.stockProduct._id}
                    >
                      +
                    </Button>
                    <Button
                      onClick={handleDecrementQuantity}
                      value={cartProduct.stockProduct._id}
                    >
                      -
                    </Button>
                  </form>
                  <p>Quantity: {cartProduct.quantity}</p>
                  <CartProductPrice>
                    Subtotal: ${" "}
                    {Number.parseFloat(
                      cartProduct.quantity *
                        cartProduct.stockProduct._product.price
                    ).toFixed(2)}
                  </CartProductPrice>
                </CartProduct>
              );
            })
          : "No products in cart"}
      </CartProductList>
      <Button onClick={handleSubmitOrder}>Submit order</Button>
    </CartContainer>
  );
};
