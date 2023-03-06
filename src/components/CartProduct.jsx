import styled from "styled-components";
import { useUserContext } from "../utils/UserContext";
import { Button } from "./styled/Button";

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

const CartProductLi = styled.li`
  border: solid red;
  flex-direction: column;
  justify-content: center;
  width: 400px;
  list-style: none;
  margin-top: 3rem;
`;

export const CartProduct = (props) => {
  const { cartProducts, setCartProducts, setNewOrder } = useUserContext();
  const { cartProduct } = props;
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
    <>
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
          cartProduct.quantity * cartProduct.stockProduct._product.price
        ).toFixed(2)}
      </CartProductPrice>
    </>
  );
};
