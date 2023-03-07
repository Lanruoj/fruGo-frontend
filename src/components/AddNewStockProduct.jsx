import { List } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUserContext } from "../utils/UserContext";
import { Product } from "./Product";
import { StockProduct } from "./StockProduct";
import { Button } from "./styled/Button";
import { Form } from "./styled/Form";
import { PageHeading } from "./styled/PageHeading";

const NewProductImg = styled.img`
  width: 100px;
`;

const AvailableProduct = styled.li``;

export const AddNewStockProduct = () => {
  const { loggedInUser } = useUserContext();
  const [productsNotInStock, setProductsNotInStock] = useState([]);
  const [productsUpdated, setProductsUpdated] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    const filterProducts = async () => {
      const allProductsResponse = await axios.get("/products");
      const stockProductsResponse = await axios.get(
        `/merchants/${loggedInUser._id}/stock/products`
      );
      const allProducts = allProductsResponse.data.data.map((product) => {
        return product;
      });
      const stockProducts = stockProductsResponse.data.data.map(
        (stockProduct) => {
          return stockProduct.product;
        }
      );
      const filteredProducts = allProducts.filter(
        (product) =>
          !stockProducts.some(
            (stockProduct) => product._id === stockProduct._id
          )
      );
      setProductsNotInStock(filteredProducts);
    };
    filterProducts();
  }, []);

  const handleAddNewProductToStock = (event) => {
    event.preventDefault();
    axios
      .post(`/merchants/${loggedInUser._id}/stock/products`, {
        _product: event.target.value,
        quantity: 1,
      })
      .then((response) => {
        navigate(0);
      });
  };

  return (
    <>
      <PageHeading>Add new product</PageHeading>
      <List>
        {productsNotInStock.map((product) => {
          return (
            <AvailableProduct key={product._id + "productsNotInStock"}>
              <span>{product.name}</span>
              <NewProductImg src={product.img} />
              <span>{product.type}</span>
              <span>${product.price}</span>
              <Button onClick={handleAddNewProductToStock} value={product._id}>
                Add to stock
              </Button>
            </AvailableProduct>
          );
        })}
      </List>
    </>
  );
};
