import { AppBar, Box, Container, Toolbar, Button } from "@mui/material";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../utils/AuthContext";

export const NavBar = () => {
  const { loggedInUser, setLoggedInUser } = useAuthContext();
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

  const navBarItems = [
    {
      title: "Home",
      linkTo: "/",
    },
    {
      title: "Products",
      linkTo: "/products",
    },
  ];

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
              {navBarItems.map((item) => {
                return (
                  <NavLink
                    key={item.title}
                    style={{
                      textDecoration: "none",
                    }}
                    to={item.linkTo}
                  >
                    <Button
                      sx={{
                        my: 1,
                        color: "white",
                        display: "block",
                      }}
                    >
                      {item.title}
                    </Button>
                  </NavLink>
                );
              })}
              {!loggedInUser && (
                <NavLink
                  style={{
                    textDecoration: "none",
                  }}
                  to={"/register/customer"}
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
              {loggedInUser && (
                <>
                  <NavLink
                    style={{
                      textDecoration: "none",
                    }}
                    to={"/cart"}
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
                    to={"/orders"}
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
              {loggedInUser && <p>{loggedInUser.username}</p>}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
