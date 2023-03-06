import { Button } from "./styled/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../utils/AuthContext";
import { Wrapper } from "./styled/Wrapper";
import styled from "styled-components";
import { useCustomerContext } from "../utils/CustomerContext";

const ProductImg = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
`;

const ProductWrapper = styled(Wrapper)`
  padding: 1rem;
`;

export const Product = (props) => {
  const { loggedInUser } = useAuthContext();
  const { product, existingProduct } = props;
  const { setCartProducts, cartProducts } = useCustomerContext();
  const handleAddToCart = (event) => {
    event.preventDefault();
    axios
      .post(
        `/customers/${
          JSON.parse(localStorage.getItem("user"))._id
        }/cart/products`,
        {
          product: event.target.value,
        }
      )
      .then((response) => {
        setCartProducts((prev) => {
          return [
            ...prev,
            {
              stockProduct:
                response.data.data._cartProducts[
                  response.data.data._cartProducts.length - 1
                ],
              quantity: 1,
            },
          ];
        });
      });
  };
  const handleRemoveFromCart = (event) => {
    event.preventDefault();
    axios
      .delete(
        `/customers/${
          JSON.parse(localStorage.getItem("user"))._id
        }/cart/products`,
        {
          data: {
            product: event.target.value,
          },
        }
      )
      .then((response) => {
        setCartProducts((prev) => {
          const cartProducts = [...prev];
          const index = cartProducts.findIndex(
            (cartProduct) => cartProduct.stockProduct._id == event.target.value
          );
          cartProducts.splice(index, 1);
          return cartProducts;
        });
      });
  };

  return (
    <ProductWrapper>
      <ProductImg
        src={loggedInUser ? product.product.img : product.img}
        alt={loggedInUser ? product.product.name : product.name}
      ></ProductImg>
      <div>{loggedInUser ? product.product.name : product.name}</div>
      <div
        style={{
          fontFamily: "Verdana, sans-serif",
        }}
      >
        ${loggedInUser ? product.product.price : product.price}
      </div>
      {!existingProduct ? (
        <Button
          value={product._id}
          onClick={handleAddToCart}
          disabled={(product.quantity <= 0 || !loggedInUser) && true}
        >
          Add to cart
        </Button>
      ) : (
        <Button
          value={loggedInUser && product._id}
          onClick={handleRemoveFromCart}
        >
          Remove
        </Button>
      )}
      {loggedInUser && <div>Stock quantity: {product.quantity}</div>}
    </ProductWrapper>
  );
};
