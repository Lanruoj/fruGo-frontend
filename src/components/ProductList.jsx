import styled from "styled-components";
import { useAuthContext } from "../utils/AuthContext";
import { Product } from "./Product";
import { GridBox } from "./styled/GridBox";

export const CustomGrid = styled(GridBox)`
  padding: 30px;
`;

export function ProductList(props) {
  const { token } = useAuthContext();
  const { products } = props;
  return (
    <div id="products">
      <GridBox>
        {products &&
          products.map((product) => {
            return <Product key={product._id} product={product} />;
          })}
      </GridBox>
    </div>
  );
}
