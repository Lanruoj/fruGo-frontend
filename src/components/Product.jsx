import { Button } from "./styled/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../utils/AuthContext";
import { useCartContext } from "../utils/CartContext";
import { Wrapper } from "./styled/Wrapper";

export const Product = (props) => {
  const { loggedInUser } = useAuthContext();
  const { product, existingProduct } = props;
  const { setCartProducts, cartProducts } = useCartContext();
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
    <Wrapper>
      <img
        style={{
          height: 200,
        }}
        src={product.img || product.product.img}
        alt={product.name || product.product.name}
      ></img>
      <div
        style={{
          fontFamily: "Verdana, sans-serif",
          fontSize: 25,
          fontWeight: 700,
          marginBottom: 10,
        }}
      >
        {product.name || product.product.name}
      </div>
      <div
        style={{
          fontFamily: "Verdana, sans-serif",
        }}
      >
        ${product.price || product.product.price}
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
        <Button value={product._id} onClick={handleRemoveFromCart}>
          Remove
        </Button>
      )}
      {loggedInUser && <div>Stock quantity: {product.quantity}</div>}
    </Wrapper>
  );
};
