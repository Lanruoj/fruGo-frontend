import styled from "styled-components";
import { useUserContext } from "../utils/UserContext";
import { Button } from "./styled/Button";

const CartProductName = styled.div`
  /* background-color: orange; */
`;

const CartProductPrice = styled.div`
  /* background-color: purple; */
`;

const CartProductQuantity = styled.span`
  /* background-color: red; */
`;

const CartProductImg = styled.img`
  width: 50px;
  border-radius: 0.3rem;
`;

const CartProductContainer = styled.span`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20rem;
  list-style: none;
  margin-top: 3rem;
`;

const QuantityButton = styled(Button)`
  width: 1rem;
  max-height: 1.2rem;
  text-align: center;
`;

const QuantityForm = styled.form`
  border-radius: 0.2rem;
  display: inline;
`;

export const CartProduct = (props) => {
  const { setCartProducts } = useUserContext();
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
    <CartProductContainer className="cart-product">
      <CartProductName>
        {cartProduct.stockProduct._product.name}
      </CartProductName>
      <CartProductImg
        src={cartProduct.stockProduct._product.img}
      ></CartProductImg>
      <div>Quantity: </div>
      <QuantityForm>
        <QuantityButton
          onClick={handleIncrementQuantity}
          value={cartProduct.stockProduct._id}
        >
          +
        </QuantityButton>
        <CartProductQuantity>{cartProduct.quantity}</CartProductQuantity>
        <QuantityButton
          onClick={handleDecrementQuantity}
          value={cartProduct.stockProduct._id}
        >
          -
        </QuantityButton>
      </QuantityForm>
      <CartProductPrice>
        Subtotal: ${" "}
        {Number.parseFloat(
          cartProduct.quantity * cartProduct.stockProduct._product.price
        ).toFixed(2)}
      </CartProductPrice>
    </CartProductContainer>
  );
};
