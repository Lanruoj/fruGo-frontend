import { AppBar, Box, Container, Toolbar, Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuthContext } from "../utils/AuthContext";

const NavContainer = styled(Container)`
  background-color: green;
`;

const Header = styled.a`
  display: block;
  text-decoration: none;
`;

const NavButton = styled.button`
  color: ${({ currentPage, value }) => (currentPage == value ? "red" : "blue")};
`;

const NavLink = ({ text, url, currentPage, setCurrentPage }) => {
  const navigate = useNavigate();
  const handleNavigate = (event) => {
    console.log(event.target.value);
    navigate(event.target.value);
    setCurrentPage(url);
  };
  return (
    <NavButton onClick={handleNavigate} value={url} currentPage={currentPage}>
      {text}
    </NavButton>
  );
};

export const NavBar = () => {
  const { loggedInUser, setLoggedInUser, role } = useAuthContext();
  const [currentPage, setCurrentPage] = useState("");
  const navigate = useNavigate();
  const handleLogout = (event) => {
    event.preventDefault();
    axios
      .post("auth/logout")
      .then((response) => {
        if (response.status == 200) {
          localStorage.clear();
          setLoggedInUser("");
          navigate("/");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Header>
        <h1 className="fruGo-title">fruGo</h1>
      </Header>
      <NavContainer maxWidth="xl">
        <Toolbar disableGutters>
          <NavLink
            text="Home"
            url="/"
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
          <NavLink
            text="Products"
            url="/customer/products"
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
          <NavLink
            text="Cart"
            url="/customer/cart"
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
          <NavLink
            text="Orders"
            url="/customer/orders"
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
          <NavLink
            text="Login"
            url="/login"
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
          <NavLink
            text="Logout"
            url="/logout"
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </Toolbar>
      </NavContainer>
    </>
  );
};
