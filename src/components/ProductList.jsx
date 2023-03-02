import styled from "styled-components";
import { useAuthContext } from "../utils/AuthContext";
import { Product } from "./Product";
import { GridBox } from "./styled/GridBox";
import { useCartContext } from "../utils/CartContext";

export const CustomGrid = styled(GridBox)`
  padding: 30px;
`;

export function ProductList(props) {
  const { products } = props;
  return (
    <div id="products">
      <GridBox>
        {products &&
          products.map((product) => {
            return (
              <Product
                key={product._id}
                product={product}
                products={products}
              />
            );
          })}
      </GridBox>
    </div>
  );
}
