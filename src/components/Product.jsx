import { Button } from "./styled/Button";
import axios from "axios";

import { Wrapper } from "./styled/Wrapper";
import styled from "styled-components";
import { useUserContext } from "../utils/UserContext";

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
  const { product, existingProduct } = props;
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
      <ProductImg
        src={currentUser ? product.product.img : product.img}
        alt={currentUser ? product.product.name : product.name}
      ></ProductImg>
      <div>{currentUser ? product.product.name : product.name}</div>
      <div
        style={{
          fontFamily: "Verdana, sans-serif",
        }}
      >
        ${currentUser ? product.product.price : product.price}
      </div>
      {!existingProduct ? (
        <Button
          value={product._id}
          onClick={handleAddToCart}
          disabled={(product.quantity <= 0 || !currentUser) && true}
        >
          Add to cart
        </Button>
      ) : (
        <Button
          value={currentUser && product._id}
          onClick={handleRemoveFromCart}
        >
          Remove
        </Button>
      )}
      {currentUser && <div>Stock quantity: {product.quantity}</div>}
    </ProductWrapper>
  );
};
