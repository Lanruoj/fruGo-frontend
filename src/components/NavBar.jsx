import { AppBar, Box, Container, Toolbar, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../utils/AuthContext";

export const NavBar = () => {
  const { loggedInUser } = useAuthContext();

  const navBarItems = [
    {
      title: "Home",
      linkTo: "/",
    },
    {
      title: "Products",
      linkTo: "/products",
    },
    {
      title: `${loggedInUser ? "Logout" : "Login"}`,
      linkTo: `${loggedInUser ? "/logout" : "/login"}`,
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
                  to={"/customers/register"}
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
              )}
              {loggedInUser && <p>{loggedInUser.username}</p>}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
