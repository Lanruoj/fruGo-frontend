import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useAuthContext } from "../utils/AuthContext";
import { useCustomerContext } from "../utils/CustomerContext";
import { GridBox } from "./styled/GridBox";
import { Product } from "./Product";
import { SearchBar } from "./styled/SearchBar";

export const CustomGrid = styled(GridBox)`
  padding: 30px;
`;

export function Products() {
  const { loggedInUser } = useAuthContext();
  const { merchant, cartProducts } = useCustomerContext();
  const [products, setProducts] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    if (loggedInUser) {
      axios
        .get(`/merchants/${merchant._id}/stock/products?name=${searchQuery}`)
        .then((response) => {
          setProducts(response.data.data);
        });
    } else {
      axios
        .get(`products?name=${searchQuery}`)
        .then((response) => setProducts(response.data.data));
    }
  }, [searchQuery]);
  const handleSearchQueryChange = (event) => {
    event.preventDefault();
    setSearchQuery(event.target.value);
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
          {!products.length && <h2>No products matching that criteria</h2>}
        </GridBox>
      </div>
    </>
  );
}
