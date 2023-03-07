import styled from "styled-components";

export const Dropdown = styled.select`
  border: none;
  border-style: solid;
  border-color: #c8c8c8;
  border-width: 0.2px;
  height: 1.8rem;
  min-width: 15.5rem;
  border-radius: 0.3rem;
  :disabled {
    color: black;
  }
`;
