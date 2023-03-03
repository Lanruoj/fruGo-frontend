import { AppBar, Box, Container, Toolbar, Button } from "@mui/material";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuthContext } from "../utils/AuthContext";

const NavContainer = styled(Container)`
  background-color: green;
`;

const Header = styled(NavLink)`
  display: block;
  text-decoration: none;
`;

const MenuLink = styled(NavLink)`
  color: red;
`;

export const NavBar = () => {
  const { loggedInUser, setLoggedInUser, role } = useAuthContext();
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
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <MenuLink
              style={{
                textDecoration: "none",
              }}
              to={"/"}
            >
              <Button
                sx={{
                  my: 1,
                  color: "white",
                  display: "block",
                }}
              >
                Home
              </Button>
            </MenuLink>
            {localStorage.getItem("role") !== "Merchant" && (
              <MenuLink
                style={{
                  textDecoration: "none",
                }}
                to={"/customer/products"}
              >
                <Button
                  sx={{
                    my: 1,
                    color: "white",
                    display: "block",
                  }}
                >
                  Products
                </Button>
              </MenuLink>
            )}
            {loggedInUser && role == "Customer" && (
              <>
                <MenuLink
                  style={{
                    textDecoration: "none",
                  }}
                  to={"/customer/cart"}
                >
                  <Button
                    sx={{
                      my: 1,
                      color: "white",
                      display: "block",
                    }}
                  >
                    Cart
                  </Button>
                </MenuLink>
                <MenuLink
                  style={{
                    textDecoration: "none",
                  }}
                  to={"/customer/orders"}
                >
                  <Button
                    sx={{
                      my: 1,
                      color: "white",
                      display: "block",
                    }}
                  >
                    Orders
                  </Button>
                </MenuLink>
              </>
            )}
            {loggedInUser && role == "Merchant" && (
              <MenuLink
                style={{
                  textDecoration: "none",
                }}
                to={"/merchant/stock"}
              >
                <Button
                  sx={{
                    my: 1,
                    color: "white",
                    display: "block",
                  }}
                >
                  Stock
                </Button>
              </MenuLink>
            )}
            <MenuLink
              style={{
                textDecoration: "none",
              }}
              to={loggedInUser ? "/logout" : "/login"}
            >
              <Button
                sx={{
                  my: 1,
                  color: "white",
                  display: "block",
                }}
                onClick={loggedInUser ? handleLogout : null}
              >
                {loggedInUser ? "Logout" : "Login"}
              </Button>
            </MenuLink>
            {!loggedInUser && (
              <MenuLink
                style={{
                  textDecoration: "none",
                }}
                to={"/customer/register"}
              >
                <Button
                  sx={{
                    my: 1,
                    color: "white",
                    display: "block",
                  }}
                >
                  Register
                </Button>
              </MenuLink>
            )}
            {loggedInUser && <p>{loggedInUser.username}</p>}
          </Box>
        </Toolbar>
      </NavContainer>
    </>
  );
};
