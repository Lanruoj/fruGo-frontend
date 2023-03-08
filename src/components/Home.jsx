import { Outlet } from "react-router-dom";
import { PageHeading } from "./styled/PageHeading";

export const Home = () => {
  return (
    <>
      <PageHeading>WELCOME</PageHeading>
      <Outlet />
    </>
  );
};
