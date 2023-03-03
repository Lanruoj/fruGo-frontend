import { Button } from "./styled/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../utils/AuthContext";
import { Wrapper } from "./styled/Wrapper";

export const StockProduct = (props) => {
  const { loggedInUser } = useAuthContext();
  const { product, existingProduct } = props;
  return (
    <Wrapper>
      <img
        style={{
          height: 200,
        }}
        src={loggedInUser ? product.product.img : product.img}
        alt={loggedInUser ? product.product.name : product.name}
      ></img>
      <div
        style={{
          fontFamily: "Verdana, sans-serif",
          fontSize: 25,
          fontWeight: 700,
          marginBottom: 10,
        }}
      >
        {loggedInUser ? product.product.name : product.name}
      </div>
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
          // onClick={handleAddToCart}
          disabled={(product.quantity <= 0 || !loggedInUser) && true}
        >
          Add to cart
        </Button>
      ) : (
        <Button
          value={loggedInUser && product._id}
          // onClick={handleRemoveFromCart}
        >
          Remove
        </Button>
      )}
      {loggedInUser && <div>Stock quantity: {product.quantity}</div>}
    </Wrapper>
  );
};
