import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Product } from "./Product";
import { SearchBar } from "./styled/SearchBar";
import { useUserContext } from "../utils/UserContext";
import { PageHeading } from "./styled/PageHeading";

export const RowWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

export const CustomerProducts = () => {
  const { currentUser, cartProducts } = useUserContext();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    axios.get(`/products?name=${searchQuery}`).then((response) => {
      setProducts(response.data.data);
    });
  }, [currentUser, searchQuery]);
  const handleSearchQueryChange = (event) => {
    event.preventDefault();
    setSearchQuery(event.target.value);
  };
  return (
    <>
      <PageHeading>PRODUCTS</PageHeading>
      <form>
        <SearchBar
          value={searchQuery}
          onChange={handleSearchQueryChange}
          placeholder="Search for products"
        />
      </form>
      <RowWrapper>
        {!!products &&
          products.map((product) => {
            const existingProduct = cartProducts.find((cartProduct) => {
              return cartProduct.stockProduct._product._id == product._id;
            });
            return (
              <Product
                key={product._id}
                product={product}
                existingProduct={existingProduct}
                isStockProduct={!!currentUser}
              />
            );
          })}
        {!products.length && <h2>No products matching that criteria</h2>}
      </RowWrapper>
    </>
  );
};
