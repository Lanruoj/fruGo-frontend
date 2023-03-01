import { Wrapper } from "./styled/Wrapper";

export const Product = (props) => {
  const { product } = props;
  return (
    <Wrapper>
      <img
        style={{
          height: 200,
        }}
        src={product.img || product.product.img}
        alt={product.name || product.product.name}
      ></img>
      <div
        style={{
          fontFamily: "Verdana, sans-serif",
          fontSize: 25,
          fontWeight: 700,
          marginBottom: 10,
        }}
      >
        {product.name || product.product.name}
      </div>
      <div
        style={{
          fontFamily: "Verdana, sans-serif",
        }}
      >
        ${product.price || product.product.price}
      </div>
    </Wrapper>
  );
};
