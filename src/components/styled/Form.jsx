import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: ${({ multi }) => (multi ? "column" : "row")};
  justify-content: center;
  align-items: center;
  width: 50vw;
  max-width: 20rem;
  padding: 2rem;
  border-radius: 0.3rem;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 1rem;
  margin: 1rem;
`;

export const Input = styled.input`
  background-color: #f1f1f1;
  border: none;
  border-width: 0.2rem;
  height: 2rem;
  min-width: 15rem;
  width: 100%;
  border-radius: 0.3rem;
  padding: 0 0.5rem 0 0.5rem;
  font-size: 1rem;
  font-family: monospace;
  :disabled {
    color: gray;
  }
`;

export const Label = styled.label`
  display: inline-block;
  width: 8rem;
  height: 1.5rem;
`;
