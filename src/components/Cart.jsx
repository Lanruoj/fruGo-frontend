import { Button } from "./styled/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CartProduct } from "./CartProduct";
import { useUserContext } from "../utils/UserContext";
import { PageHeading } from "./styled/PageHeading";

const CartContainer = styled.div`
  width: 50vw;
  background-color: white;
  border-radius: 0.3rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
`;

const CartProductList = styled.div`
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Cart = () => {
  const { currentUser, setCart, cartProducts, setCartProducts } =
    useUserContext();
  const navigate = useNavigate();
  const handleSubmitOrder = () => {
    axios
      .post("/orders", {
        cartProducts: cartProducts,
      })
      .then((response) => {
        for (let cartProduct of cartProducts) {
          axios.put(`/merchants/${currentUser._merchant._id}/stock/products`, {
            stockProduct: cartProduct.stockProduct._id,
            quantity: cartProduct.stockProduct.quantity - cartProduct.quantity,
          });
          setCartProducts([]);
          setCart("");
        }
        navigate(`/customer/orderConfirmation/${response.data.data._id}`);
      });
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
      <CartProductList id="cart-product-list">
        {cartProducts.length
          ? cartProducts.map((cartProduct) => {
              return (
                <CartProduct
                  key={cartProduct.stockProduct._id + "CartProduct"}
                  cartProduct={cartProduct}
                />
              );
            })
          : "No products in cart"}
      </CartProductList>
      {!!cartProducts.length && (
        <>
          <Button id="checkout-button" onClick={handleSubmitOrder}>
            Checkout
          </Button>
          <Button id="clear-cart-button" onClick={handleClearCart}>
            Clear cart
          </Button>
        </>
      )}
    </CartContainer>
  );
};
