import styled from "styled-components";

export const Dropdown = styled.select`
  border: none;
  height: 2rem;
  min-width: 15.5rem;
  width: 100%;
  border-radius: 0.3rem;
  font-size: 1rem;
  padding: 0 0.3rem 0 0.3rem;
  font-family: monospace;
  :disabled {
    color: gray;
  }
`;
