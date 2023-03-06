import { AppBar, Box, Container, Toolbar, Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuthContext } from "../utils/AuthContext";

const NavContainer = styled.nav`
  width: 100vw;
  height: 3rem;
  display: flex;
  background-color: green;
  justify-content: space-between;
  position: fixed;
`;

const Title = styled.h1`
  text-align: center;
  margin: 0;
  color: blue;
`;

const NavButtonContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const AuthButtonContainer = styled.div`
  padding-right: 2rem;
  width: 10%;
  display: flex;
  align-items: center;
`;

const CustomerButtonContainer = styled.div`
  padding-right: 2rem;
  width: 50%;
  display: flex;
  justify-content: end;
  align-items: center;
`;

const MerchantButtonContainer = styled.div`
  padding-right: 2rem;
  width: 50%;
  display: flex;
  justify-content: end;
  align-items: center;
`;

const Header = styled.div`
  height: 4rem;
  width: 100vw;
  background-color: red;
  display: block;
  position: fixed;
  top: 0px;
`;

const NavButton = styled.button`
  height: 2rem;
  margin: 1rem;
  font-size: 1rem;
  background: none;
  border: none;
  color: ${({ currentPage, value }) =>
    currentPage == value ? "white" : "black"};
  cursor: pointer;
  :disabled {
    visibility: hidden;
  }
`;

const NavLink = ({ text, url, currentPage, setCurrentPage, active }) => {
  const { loggedInUser, setLoggedInUser, role } = useAuthContext();
  const navigate = useNavigate();
  const handleNavigate = (event) => {
    navigate(event.target.value);
    setCurrentPage(url);
  };
  const handleLogout = (event) => {
    event.preventDefault();
    axios
      .post("/auth/logout")
      .then((response) => {
        if (response.status == 200) {
          localStorage.clear();
          setLoggedInUser("");
          setCurrentPage("/");
          navigate("/");
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <NavButton
      onClick={text == "Logout" ? handleLogout : handleNavigate}
      value={url}
      currentPage={currentPage}
      disabled={!active}
    >
      {text}
    </NavButton>
  );
};

export const NavBar = () => {
  const { loggedInUser, setLoggedInUser, role } = useAuthContext();
  const [currentPage, setCurrentPage] = useState("");
  const navigate = useNavigate();
  return (
    <Header>
      <Title>fruGo</Title>
      <NavContainer maxWidth="xl">
        <NavButtonContainer>
          <NavLink
            text="Home"
            url="/"
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            active={true}
          />
          <NavLink
            text="Products"
            url="/customer/products"
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            active={!loggedInUser || role == "Customer"}
          />
        </NavButtonContainer>

        {role == "Customer" && (
          <CustomerButtonContainer>
            <NavLink
              text="Cart"
              url="/customer/cart"
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              active={loggedInUser && role == "Customer"}
            />
            <NavLink
              text="Orders"
              url="/customer/orders"
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              active={loggedInUser && role == "Customer"}
            />
          </CustomerButtonContainer>
        )}
        {role == "Merchant" && (
          <MerchantButtonContainer>
            <NavLink
              text="Stock"
              url="/merchant/stock"
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              active={loggedInUser && role == "Merchant"}
            />
          </MerchantButtonContainer>
        )}
        <AuthButtonContainer>
          <NavLink
            text={!loggedInUser ? "Login" : "Logout"}
            url={!loggedInUser ? "/login" : null}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            active={!loggedInUser || loggedInUser}
          />
        </AuthButtonContainer>
        {/* <NavLink
            text="Logout"
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            active={loggedInUser}
          /> */}
      </NavContainer>
    </Header>
  );
};
