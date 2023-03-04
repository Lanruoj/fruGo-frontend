import { Outlet } from "react-router-dom";

export const HomePage = () => {
  return (
    <>
      <h1>Home</h1>
      <Outlet />
    </>
  );
};
