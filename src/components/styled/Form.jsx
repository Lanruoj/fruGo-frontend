import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: ${({ multi }) => (multi ? "column" : "row")};
  justify-content: center;
  align-items: center;
  width: 50vw;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 10px;
  margin: 1rem;
`;

export const Input = styled.input`
  border-style: solid;
  border-color: #c8c8c8;
  border-width: 0.2px;
  height: 1.5rem;
  min-width: 15rem;
  border-radius: 0.3rem;
`;

export const Label = styled.label`
  display: inline-block;
  width: 8rem;
  height: 1.5rem;
`;
