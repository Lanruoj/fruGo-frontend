import { Button } from "./styled/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CartProduct } from "./CartProduct";
import { useUserContext } from "../utils/UserContext";
import { PageHeading } from "./styled/PageHeading";

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
  const { currentUser, cart, setCart, cartProducts, setCartProducts } =
    useUserContext();
  const navigate = useNavigate();
  // useEffect(() => {
  //   console.log(cart);
  //   if (cart._cartProducts.length) {
  //     const productsWithQuantity = cart._cartProducts.map((cartProduct) => {
  //       return {
  //         stockProduct: cartProduct,
  //         quantity: 1,
  //       };
  //     });
  //     setCartProducts(productsWithQuantity);
  //   }
  // }, [cart]);
  const handleSubmitOrder = (event) => {
    axios
      .post("/orders", {
        cartProducts: cartProducts,
      })
      .then((response) => {
        navigate(`/orderConfirmation/${response.data.data}`);
      })
      .then(() => {
        for (let cartProduct of cart._cartProducts) {
          axios.put(`/merchants/${currentUser._merchant._id}/stock/products`, {
            stockProduct: cartProduct.stockProduct._id,
            quantity: cartProduct.stockProduct.quantity - cartProduct.quantity,
          });
          setCartProducts([]);
          setCart("");
        }
      })
      .then(() => navigate(`/customer/orderConfirmation`));
  };
  const handleClearCart = () => {
    axios
      .delete(`/customers/${currentUser._id}/cart/products?all=true`)
      .then(() => {
        setCartProducts([]);
        setCart("");
      })
      .catch((error) => console.log(error));
  };

  return (
    <CartContainer>
      <PageHeading>Cart</PageHeading>
      <CartProductList>
        {cartProducts.length
          ? cartProducts.map((cartProduct) => {
              return (
                <CartProduct
                  key={cartProduct.stockProduct._id + "CartProduct"}
                  cartProduct={cartProduct}
                  // setCartProducts={setCartProducts}
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
