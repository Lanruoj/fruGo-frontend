import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCartContext } from "../utils/CartContext";

const CartContainer = styled.div`
  background-color: red;
  height: 80vh;
  width: 100vw;
`;

const CartProductList = styled.ul`
  background-color: blue;
  flex-direction: column;
  align-items: center;
`;

const CartProduct = styled.li`
  background-color: green;
  height: 10rem;
  width: 100vw;
  list-style: none;
`;
const CartProductName = styled.div`
  background-color: orange;
`;

const CartProductPrice = styled.div`
  background-color: purple;
`;

const CartProductQuantity = styled.div`
  background-color: red;
`;

const CartProductImg = styled.img`
  width: 100px;
`;

export const Cart = () => {
  const { cartProducts, setCartProducts } = useCartContext();
  const navigate = useNavigate();
  const handleSubmitOrder = (event) => {
    axios.post("/orders").then((response) => {
      console.log(response);
      setCartProducts([]);
      navigate("/orders");
    });
  };
  return (
    <CartContainer>
      <h1>Cart</h1>
      <CartProductList>
        {cartProducts.length
          ? cartProducts.map((cartProduct) => {
              return (
                <CartProduct key={cartProduct._id}>
                  <CartProductName>
                    {cartProduct._stockProduct._product.name}
                  </CartProductName>
                  <CartProductImg
                    src={cartProduct._stockProduct._product.img}
                  ></CartProductImg>
                  <CartProductQuantity>
                    Quantity:
                    {cartProduct.subQuantity}
                  </CartProductQuantity>
                  <CartProductPrice>
                    Subtotal:
                    {cartProduct._stockProduct._product.price *
                      cartProduct.subQuantity}
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
