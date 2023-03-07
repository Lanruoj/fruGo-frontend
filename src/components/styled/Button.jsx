import styled from "styled-components";

export const Button = styled.button`
  height: 2rem;
  min-width: 3rem;
  margin: 1rem;
  border: none;
  background-color: rgb(103, 132, 95);
  border-radius: 0.3rem;
  font-size: 1rem;
  padding: 0px 15px;
  color: white;
  cursor: pointer;
  transition: 0.3s;
  :hover {
    background-color: rgb(47, 65, 15);
  }
  :disabled {
    background-color: grey;
    cursor: not-allowed;
  }
`;
