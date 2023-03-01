import { Outlet } from "react-router-dom";

export const HomePage = () => {
  return (
    <>
      <h2 style={{ color: "dodgerblue", backgroundColor: "black" }}>
        YOUR HOME ESSENTIALS, DELIVERED STRAIGHT TO YOUR DOOR!
      </h2>
      <Outlet />
    </>
  );
};
