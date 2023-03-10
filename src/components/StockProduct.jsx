import { Button } from "./styled/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { NumberInput } from "./styled/NumberInput";
import { List } from "./styled/List";
import { Wrapper } from "./styled/Wrapper";
import { useUserContext } from "../utils/UserContext";
import { useNavigate } from "react-router-dom";

const HorizontalContainer = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 0.3rem;
  padding: 0 1rem 0 1rem;
  margin: 0.3rem;
`;
const QuantityUpdateForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StockProduct = (props) => {
  const { currentUser, setError } = useUserContext();
  const { product } = props;
  const [stockQuantity, setStockQuantity] = useState("");
  const [canUpdate, setCanUpdate] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setStockQuantity(() => {
      return product.quantity;
    });
  }, [currentUser]);
  const handleSetUpdateButton = (event) => {
    event.preventDefault();
    if (canUpdate) {
      setCanUpdate(() => false);
    } else {
      setCanUpdate(() => true);
    }
  };
  const handleUpdateStockQuantity = (event) => {
    event.preventDefault();
    axios
      .put(`/merchants/${currentUser._id}/stock/products`, {
        stockProduct: product._id,
        quantity: stockQuantity,
      })
      .then((response) => {
        setStockQuantity(() => {
          return response.data.data.quantity;
        });
        setCanUpdate(() => false);
      })
      .catch((error) => console.log(error));
  };
  const handleNumberInputChange = (event) => {
    event.preventDefault();
    setStockQuantity(() => {
      return event.target.value;
    });
  };
  const handleDeleteStockProduct = (event) => {
    event.preventDefault();
    axios
      .delete(`/merchants/${currentUser._id}/stock/products`, {
        data: { stockProduct: product._id },
      })
      .then(() => navigate(0))
      .catch((error) => setError(error));
  };
  return (
    <Wrapper>
      <HorizontalContainer>
        <h2>{product.product.name}</h2>
        <List>
          {/* <li>{product._id}</li> */}
          {/* <li>{product.product.type}</li>
          <li>${product.product.price}</li> */}
        </List>
        <QuantityUpdateForm>
          <label htmlFor="stock-quantity">Quantity: &nbsp;</label>
          <NumberInput
            name="stock-quantity"
            id="stock-quantity"
            value={stockQuantity}
            onChange={handleNumberInputChange}
            disabled={!canUpdate}
          />
          <Button
            onClick={
              canUpdate ? handleUpdateStockQuantity : handleSetUpdateButton
            }
          >
            {!canUpdate ? "Update" : "Submit"}
          </Button>
          <Button onClick={handleDeleteStockProduct}>Remove</Button>
        </QuantityUpdateForm>
      </HorizontalContainer>
    </Wrapper>
  );
};
