import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUserContext } from "../utils/UserContext";

const Header = styled.div`
  background-color: aqua;
  height: 4rem;
  width: 100vw;
  background-color: #b6e5b6;
  display: block;
  position: fixed;
  top: 0px;
`;

const NavContainer = styled.nav`
  /* background-color: red; */
  width: 100vw;
  height: 3rem;
  display: flex;
  background-color: #b6e5b6;
  justify-content: space-between;
  position: fixed;
`;

const Title = styled.h1`
  /* background-color: green; */
  text-align: center;
  margin: 0;
  color: #4d643f;
`;

const NavButtonContainer = styled.div`
  /* background-color: yellow; */
  width: 33.33%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const AuthButtonContainer = styled.div`
  /* background-color: violet; */
  /* padding-right: 2rem; */
  width: 33.33%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: 3rem;
  /* position: relative;
  top: -3rem;
  right: 0; */
`;

const CustomerButtonContainer = styled.div`
  /* background-color: purple; */
  /* padding-right: 2rem; */
  width: 33.33%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const MerchantButtonContainer = styled.div`
  /* background-color: gray; */
  /* padding-right: 2rem; */
  width: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavButton = styled.button`
  /* background-color: brown; */
  height: 2rem;
  margin: 1rem;
  font-size: 1rem;
  font-family: monospace;
  background: none;
  border: none;
  color: ${({ currentPage, value }) =>
    currentPage == value ? "gray" : "black"};
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
  const { loggedInUser, setLoggedInUser, role } = useUserContext();
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
  const { loggedInUser, setLoggedInUser, role } = useUserContext();
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
            <NavLink
              text="Orders"
              url="/merchant/orders"
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              active={loggedInUser && role == "Merchant"}
            />
          </MerchantButtonContainer>
        )}
        <AuthButtonContainer>
          <NavLink
            text={"Profile"}
            url={`/${role.toLowerCase()}/profile`}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            active={loggedInUser}
          />
          <NavLink
            text={!loggedInUser ? "Login" : "Logout"}
            url={!loggedInUser ? "/login" : null}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            active={!loggedInUser || loggedInUser}
          />
        </AuthButtonContainer>
      </NavContainer>
    </Header>
  );
};
