import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../utils/auth";
import { useUserContext } from "../utils/UserContext";

const Header = styled.div`
  height: 6rem;
  width: 100vw;
  display: block;
  position: fixed;
  top: 0px;
  background-color: rgba(250, 250, 247, 0.744);
`;

const UserLogo = styled.span`
  font-family: "Unbounded", sans-serif;
  display: flex;
  flex-wrap: wrap;
  width: 3rem;
  position: absolute;
  top: 2rem;
  right: 2rem;
  font-size: 0.6rem;
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
  color: #438d39;
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
  font-family: "Unbounded", monospace;
  height: 2rem;
  margin: ${({ windowSize }) => (windowSize < 700 ? "0" : "1rem")};
  font-size: ${({ windowSize }) => (windowSize < 700 ? "0.6rem" : "1rem")};
  background: none;
  border: none;
  text-transform: uppercase;
  color: ${({ currentPage, value }) =>
    currentPage === value ? "orange" : "#735502"};
  cursor: pointer;
  transition: 0.3s;
  :disabled {
    visibility: hidden;
  }
`;

export const NavLink = ({ text, url, currentPage, setCurrentPage, active }) => {
  const { setCurrentUser } = useUserContext();
  const navigate = useNavigate();
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });
  const handleNavigate = (event) => {
    navigate(event.target.value);
    setCurrentPage(url);
  };
  const handleLogout = async (event) => {
    event.preventDefault();
    await logout();
    setCurrentUser("");
    navigate("/");
  };
  return (
    <NavButton
      onClick={text === "Logout" ? handleLogout : handleNavigate}
      value={url}
      currentPage={currentPage}
      disabled={!active}
      windowSize={windowSize}
    >
      {text}
    </NavButton>
  );
};

export const NavBar = () => {
  const { currentUser, currentRole } = useUserContext();
  const [currentPage, setCurrentPage] = useState("");
  return (
    <Header>
      {!!currentUser && currentRole === "Customer" && (
        <UserLogo id="test-user-logo">
          Welcome, {currentUser.firstName || currentUser.name}
        </UserLogo>
      )}
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
            active={!currentUser || currentRole === "Customer"}
          />
        </NavButtonContainer>
        <AuthButtonContainer>
          {currentRole === "Customer" && (
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
          {currentRole === "Merchant" && (
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
