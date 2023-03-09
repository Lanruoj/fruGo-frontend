import { Button } from "./styled/Button";
import axios from "axios";

import { Wrapper } from "./styled/Wrapper";
import styled from "styled-components";
import { useUserContext } from "../utils/UserContext";
import { useEffect, useState } from "react";

export const ProductImg = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 0.3rem;
`;

const ProductWrapper = styled(Wrapper)`
  padding: 1rem;
  background-color: white;
  margin: 1rem;
`;

export const Product = (props) => {
  const { currentUser, setCart, cartProducts, setCartProducts } =
    useUserContext();
  const { product, existingProduct, isStockProduct } = props;
  const [stockProduct, setStockProduct] = useState("");
  useEffect(() => {
    if (isStockProduct) {
      axios
        .get(
          `/merchants/${currentUser._merchant._id}/stock/products?_product=${product._id}`
        )
        .then((response) => {
          const [stockProduct] = response.data.data;
          setStockProduct(stockProduct);
        });
    }
  }, [currentUser]);
  const handleAddToCart = (event) => {
    event.preventDefault();
    axios
      .post(`/customers/${currentUser._id}/cart/products`, {
        product: event.target.value,
      })
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
      <ProductImg src={product.img} alt={product.name}></ProductImg>
      <div>{product.name}</div>
      <div
        style={{
          fontFamily: "Verdana, sans-serif",
        }}
      >
        ${product.price}
      </div>
      {!existingProduct ? (
        <Button
          value={!!stockProduct && stockProduct._id}
          onClick={handleAddToCart}
          disabled={
            (!!stockProduct && stockProduct.quantity <= 0) || !currentUser
          }
        >
          Add to cart
        </Button>
      ) : (
        <Button
          value={!!isStockProduct && stockProduct._id}
          onClick={handleRemoveFromCart}
        >
          Remove
        </Button>
      )}
      {!!isStockProduct && <div>Stock quantity: {stockProduct.quantity}</div>}
    </ProductWrapper>
  );
};
