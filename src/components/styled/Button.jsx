import styled from "styled-components";

export const Button = styled.button`
  height: 2rem;
  min-width: 3rem;
  max-width: 20rem;
  margin: 1rem;
  border: none;
  background-color: rgb(58, 149, 32);
  border-radius: 0.2rem;
  font-size: 1rem;
  padding: 0px 15px;
  color: white;
  font-family: "Karla";
  text-transform: uppercase;
  cursor: pointer;
  transition: 0.3s;
  :hover {
    background-color: rgb(68, 172, 39);
  }
  :disabled {
    border: solid gray;
    color: gray;
    cursor: not-allowed;
  }
`;
