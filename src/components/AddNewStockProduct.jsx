import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUserContext } from "../utils/UserContext";
import { Button } from "./styled/Button";
import { List } from "./styled/List";
import { PageHeading } from "./styled/PageHeading";

const NewProductImg = styled.img`
  width: 100px;
`;

const ModuleContainer = styled.div`
  background-color: white;
  border-radius: 0.3rem;
  padding: 1rem;
`;

const AvailableProduct = styled.li``;

export const AddNewStockProduct = () => {
  const { currentUser } = useUserContext();
  const [productsNotInStock, setProductsNotInStock] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const filterProducts = async () => {
      const allProductsResponse = await axios.get("/products");
      const stockProductsResponse = await axios.get(
        `/merchants/${currentUser._id}/stock/products`
      );
      const allProducts = allProductsResponse.data.data.map((product) => {
        return product;
      });
      const stockProducts = stockProductsResponse.data.data.map(
        (stockProduct) => {
          return stockProduct._product;
        }
      );
      const filteredProducts = allProducts.filter(
        (product) =>
          !stockProducts.some(
            (stockProduct) => product._id === stockProduct._id
          )
      );
      setProductsNotInStock(filteredProducts);
      if (!filteredProducts.length) {
        setMessage("You currently stock all available products");
      }
    };
    filterProducts();
  }, []);

  const handleAddNewProductToStock = (event) => {
    event.preventDefault();
    axios
      .post(`/merchants/${currentUser._id}/stock/products`, {
        _product: event.target.value,
        quantity: 1,
      })
      .then(() => {
        navigate(0);
      });
  };

  return (
    <>
      <PageHeading>Add new product</PageHeading>
      <ModuleContainer>
        {message && <p>{message}</p>}
        <List>
          {productsNotInStock.map((product) => {
            return (
              <AvailableProduct key={product._id + "productsNotInStock"}>
                <span>{product.name}</span>
                <NewProductImg src={product.img} />
                <span>{product.type}</span>
                <span>${product.price}</span>
                <Button
                  onClick={handleAddNewProductToStock}
                  value={product._id}
                >
                  Add to stock
                </Button>
              </AvailableProduct>
            );
          })}
        </List>
      </ModuleContainer>
    </>
  );
};
