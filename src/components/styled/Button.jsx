import styled from "styled-components";

export const Button = styled.button`
  height: 40px;
  border: none;
  background-color: black;
  border-radius: 10px;
  font-size: 20px;
  padding: 0px 15px;
  color: red;
  cursor: pointer;
  :hover {
    background-color: rgba(38, 115, 141, 0.8);
  }
  :disabled {
    background-color: grey;
    cursor: not-allowed;
  }
`;
