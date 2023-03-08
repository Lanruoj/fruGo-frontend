import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUserContext } from "../utils/UserContext";

const Header = styled.div`
  height: 5.5rem;
  width: 100vw;
  /* background-color: #052f05; */
  display: block;
  position: fixed;
  top: 0px;
`;

const NavContainer = styled.nav`
  width: 100vw;
  height: 2rem;
  display: flex;
  justify-content: space-between;
  position: fixed;
`;

const Title = styled.h1`
  text-align: center;
  margin: 0.5rem 0 0 0;
  color: #052f05;
  font-size: 3rem;
  font-family: "Unbounded", cursive;
`;

const NavButtonContainer = styled.div`
  width: 33.33%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const AuthButtonContainer = styled.div`
  width: 33.33%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const NavButton = styled.button`
  font-family: "Unbounded", cursive;
  height: 2rem;
  margin: 1rem;
  font-size: 1rem;
  background: none;
  border: none;
  text-transform: uppercase;
  color: ${({ currentPage, value }) =>
    currentPage == value ? "black" : "red"};
  cursor: pointer;
  transition: 0.3s;
  :hover {
    color: grey;
  }
  :disabled {
    visibility: hidden;
  }
`;

export const NavLink = ({ text, url, currentPage, setCurrentPage, active }) => {
  const { currentUser, currentRole, setCurrentUser, setCurrentRole } =
    useUserContext();
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
          setCurrentUser("");
          setCurrentRole("");
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
  const { currentUser, currentRole, setCurrentUser, setCurrentRole } =
    useUserContext();
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
            active={!currentUser || currentRole == "Customer"}
          />
        </NavButtonContainer>

        <AuthButtonContainer>
          {currentRole == "Customer" && (
            <>
              <NavLink
                text="Cart"
                url="/customer/cart"
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                active="true"
              />
              <NavLink
                text="Orders"
                url="/customer/orders"
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                active="true"
              />
            </>
          )}
          {currentRole == "Merchant" && (
            <>
              <NavLink
                text="Stock"
                url="/merchant/stock"
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                active="true"
              />
              <NavLink
                text="Orders"
                url="/merchant/orders"
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                active="true"
              />
            </>
          )}
          <NavLink
            text={"Profile"}
            url={`/${currentRole.toLowerCase()}/profile`}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            active={currentUser}
          />
          <NavLink
            text={!currentUser ? "Login" : "Logout"}
            url={!currentUser ? "/login" : null}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            active={!currentUser || currentUser}
          />
        </AuthButtonContainer>
      </NavContainer>
    </Header>
  );
};
