import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useAuthContext } from "../utils/AuthContext";
import { useMerchantContext } from "../utils/MerchantContext";
import { GridBox } from "./styled/GridBox";
import { Product } from "./Product";

export const CustomGrid = styled(GridBox)`
  padding: 30px;
`;

export function Products() {
  const { loggedInUser } = useAuthContext();
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
              return (
                <Product
                  key={product._id}
                  product={product}
                  products={products}
                />
              );
            })}
        </GridBox>
      </div>
    </>
  );
}
