import { Button } from "./styled/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../utils/AuthContext";
import styled from "styled-components";
import { NumberInput } from "./styled/NumberInput";
import { List } from "./styled/List";
import { Wrapper } from "./styled/Wrapper";

const HorizontalContainer = styled.div`
  width: 75vw;
  background-color: grey;
  border: solid black;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 2rem 0 2rem;
  align-items: center;
  height: 5rem;
`;
const QuantityUpdateForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StockProduct = (props) => {
  const { loggedInUser } = useAuthContext();
  const { product } = props;
  const [stockQuantity, setStockQuantity] = useState("");
  const [canUpdate, setCanUpdate] = useState(false);
  useEffect(() => {
    setStockQuantity(() => {
      return product.quantity;
    });
  }, [loggedInUser]);
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
      .put(`/merchants/${loggedInUser._id}/stock/products`, {
        stockProduct: product._id,
        quantity: stockQuantity,
      })
      .then((response) => {
        setStockQuantity(() => {
          console.log("SETSTOCK");
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
  return (
    <Wrapper>
      <HorizontalContainer>
        <h2>{product.product.name}</h2>
        <List>
          <li>Serial: {product._id}</li>
          <li>Type: {product.product.type}</li>
          <li>Price: ${product.product.price}</li>
        </List>
        <QuantityUpdateForm>
          <label htmlFor="stock-quantity">Stock quantity:</label>
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
        </QuantityUpdateForm>
      </HorizontalContainer>
    </Wrapper>
  );
};
