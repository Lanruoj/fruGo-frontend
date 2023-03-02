import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useAuthContext } from "../utils/AuthContext";
import { useMerchantContext } from "../utils/MerchantContext";
import { GridBox } from "./styled/GridBox";
import { Product } from "./Product";
import { useCartContext } from "../utils/CartContext";
import { SearchBar } from "./styled/SearchBar";

export const CustomGrid = styled(GridBox)`
  padding: 30px;
`;

export function Products() {
  const { loggedInUser } = useAuthContext();
  const { cartProducts } = useCartContext();
  const { merchant } = useMerchantContext();
  const [products, setProducts] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
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
  const handleSearchQueryChange = (event) => {
    event.preventDefault();
    setSearchQuery(event.target.value);
    axios
      .get(`/merchants/${merchant._id}/stock/products?name=${searchQuery}`)
      .then((response) => {
        setProducts(response.data.data);
      });
  };
  return (
    <>
      <h1>PRODUCTS</h1>
      <form>
        <SearchBar
          value={searchQuery}
          onChange={handleSearchQueryChange}
          placeholder="Search for products"
        />
      </form>
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
