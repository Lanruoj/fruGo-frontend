import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useAuthContext } from "../utils/AuthContext";
import { useMerchantContext } from "../utils/MerchantContext";
import { GridBox } from "./styled/GridBox";
import { Product } from "./Product";
import { useCartContext } from "../utils/CartContext";
import { SearchBar } from "./styled/SearchBar";
import { StockProduct } from "./StockProduct";

export const CustomGrid = styled(GridBox)`
  padding: 30px;
`;

export function Stock() {
  const { loggedInUser } = useAuthContext();
  const { cartProducts } = useCartContext();
  const { merchant } = useMerchantContext();
  const [products, setProducts] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    if (loggedInUser) {
      axios
        .get(
          `/merchants/${loggedInUser._id}/stock/products?name=${searchQuery}`
        )
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
      <h1>Stock</h1>
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
              return <StockProduct key={product._id} product={product} />;
            })}
          {!products.length && <h2>No products matching that criteria</h2>}
        </GridBox>
      </div>
    </>
  );
}
