import { Button } from "@mui/material";
import axios from "axios";
import { useCartContext } from "../utils/CartContext";
import { Wrapper } from "./styled/Wrapper";

export const Product = (props) => {
  const { product } = props;
  const { cart, setCart } = useCartContext();
  const handleAddToCart = (event) => {
    event.preventDefault();
    if (
      cart._cartProducts.some(
        (cartProduct) => cartProduct._stockProduct._id == event.target.value
      )
    ) {
      console.log("Product already in cart");
    } else {
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
          setCart(() => {
            if (cart) {
              console.log("Product added to cart");
              localStorage.setItem("cart", JSON.stringify(response.data.cart));
              return response.data.cart;
            }
          });
        });
    }
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
      {!cart && (
        <Button value={product._id} onClick={handleAddToCart} disabled={true}>
          Add to cart
        </Button>
      )}
      {cart && (
        <Button
          value={product._id}
          onClick={handleAddToCart}
          disabled={cart._cartProducts.some(
            (cartProduct) =>
              cartProduct._stockProduct._id == product._id && true
          )}
        >
          Add to cart
        </Button>
      )}
    </Wrapper>
  );
};
