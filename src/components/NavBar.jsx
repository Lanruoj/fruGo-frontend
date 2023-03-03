import { AppBar, Box, Container, Toolbar, Button } from "@mui/material";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../utils/AuthContext";

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
      <NavLink
        key="fruGo-title"
        style={{
          textDecoration: "none",
        }}
        to="/"
      >
        <h1 className="fruGo-title">fruGo</h1>
      </NavLink>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: "flex" }}>
              <NavLink
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
              </NavLink>
              {localStorage.getItem("role") !== "Merchant" && (
                <NavLink
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
                </NavLink>
              )}
              {loggedInUser && role == "Customer" && (
                <>
                  <NavLink
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
                  </NavLink>
                  <NavLink
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
                  </NavLink>
                </>
              )}
              {loggedInUser && role == "Merchant" && (
                <NavLink
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
                </NavLink>
              )}
              <NavLink
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
              </NavLink>
              {!loggedInUser && (
                <NavLink
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
                </NavLink>
              )}
              {loggedInUser && <p>{loggedInUser.username}</p>}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
