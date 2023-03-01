import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  transition: 0.3s;
  box-shadow: 0px 0px 8px 1px rgba(13, 12, 12, 0.75);
  :hover {
    box-shadow: 0px 0px 20px 1px rgba(13, 12, 12, 0.75);
  }
`;
