import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { PageHeading } from "./styled/PageHeading";

const HomeContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url("https://images.squarespace-cdn.com/content/v1/54875f9ee4b02be55de1d5ea/1603905190946-C8085PCED5G0ZC6ZEWRT/green+bean+with+olive-3668.jpg?format=1500w");
  background-size: 100%;
`;

export const Home = () => {
  return (
    <HomeContainer>
      <PageHeading>WELCOME</PageHeading>
      <Outlet />
    </HomeContainer>
  );
};
