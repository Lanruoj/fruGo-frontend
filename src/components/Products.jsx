import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useAuthContext } from "../utils/AuthContext";
import { useMerchantContext } from "../utils/MerchantContext";
import { GridBox } from "./styled/GridBox";
import { Product } from "./Product";
import { useCartContext } from "../utils/CartContext";

export const CustomGrid = styled(GridBox)`
  padding: 30px;
`;

export function Products() {
  const { loggedInUser } = useAuthContext();
  const { cartProducts } = useCartContext();
  const { merchant } = useMerchantContext();
  const [products, setProducts] = useState("");
  useEffect(() => {
    if (!loggedInUser) {
      axios
        .get("/products")
        .then((res) => res.data.data)
        .then((data) => {
          setProducts(data);
        });
    } else {
      axios
        .get(`/merchants/${merchant._id}/stock/products`)
        .then((res) => res.data.data)
        .then((data) => {
          setProducts(data);
        });
    }
  }, []);
  return (
    <>
      <h1>PRODUCTS</h1>
      <div id="products">
        <GridBox>
          {products &&
            products.map((product) => {
              const existingProduct = cartProducts.find(
                (cartProduct) => cartProduct.stockProduct._id == product._id
              );
              return (
                <Product
                  key={product._id}
                  product={product}
                  existingProduct={existingProduct}
                />
              );
            })}
        </GridBox>
      </div>
    </>
  );
}
