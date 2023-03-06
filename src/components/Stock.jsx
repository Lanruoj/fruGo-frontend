import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { SearchBar } from "./styled/SearchBar";
import { StockProduct } from "./StockProduct";
import { useUserContext } from "../utils/UserContext";

export function Stock() {
  const { loggedInUser } = useUserContext();
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
      <div>
        {products &&
          products.map((product) => {
            return <StockProduct key={product._id} product={product} />;
          })}
        {!products.length && <h2>No products matching that criteria</h2>}
      </div>
    </>
  );
}
