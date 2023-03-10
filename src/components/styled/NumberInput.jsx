import styled from "styled-components";

export const NumberInput = styled.input.attrs({ type: "number" })`
  height: 1.5rem;
  width: 5rem;
  text-align: center;
  border-radius: 0.3rem;
  border: solid gray 1px;
  color: black;
  font-size: 1rem;
  font-family: monospace;
  :disabled {
    background-color: #cdcdcd;
    border: none;
  }
`;
