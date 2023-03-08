import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { SearchBar } from "./styled/SearchBar";
import { StockProduct } from "./StockProduct";
import { useUserContext } from "../utils/UserContext";
import { Link } from "react-router-dom";
import { PageHeading } from "./styled/PageHeading";

const SubNavLink = styled(Link)`
  color: blue;
`;

export function Stock() {
  const { currentUser } = useUserContext();
  const [products, setProducts] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    if (currentUser) {
      axios
        .get(`/merchants/${currentUser._id}/stock/products?name=${searchQuery}`)
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
      <nav>
        <SubNavLink to="/merchant/stock/add">
          Add new product to stock
        </SubNavLink>
      </nav>
      <PageHeading>Stock</PageHeading>
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
            return (
              <StockProduct
                key={product._id}
                product={product}
                setProducts={setProducts}
              />
            );
          })}
        {!products.length && <h2>No products matching that criteria</h2>}
      </div>
    </>
  );
}
