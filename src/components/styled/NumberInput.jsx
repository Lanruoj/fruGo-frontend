import styled from "styled-components";

export const NumberInput = styled.input.attrs({ type: "number" })`
  height: 1.5rem;
  width: 5rem;
  text-align: center;
  border-radius: 0.3rem;
  border: none;
  color: black;
  :disabled {
    background: grey;
    border: none;
  }
`;
