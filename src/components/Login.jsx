import axios from "axios";
import { useState } from "react";
import { Title } from "./styled/Title";
import { useUserContext } from "../utils/UserContext";
import { Button } from "./styled/Button";
import { Form, Input, InputWrapper, Label } from "./styled/Form";
import { NavLink } from "./NavBar";
import { useNavigate } from "react-router-dom";
import { Error } from "./Error";
import { PageHeading } from "./styled/PageHeading";

export const Login = () => {
  const {
    loggedInUser,
    setLoggedInUser,
    setRole,
    setToken,
    setMerchant,
    error,
    setError,
  } = useUserContext();
  const [userFormDetails, setUserFormDetails] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (event) => {
    event.preventDefault();
    setUserFormDetails((prevDetails) => {
      return {
        ...prevDetails,
        [event.target.name]: event.target.value,
      };
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    axios
      .post("/auth/login", userFormDetails)
      .then((response) => {
        if (response.status == 200) {
          setLoggedInUser(() => {
            response.data.user.city = response.data.city;
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("token", response.data.accessToken);
            localStorage.setItem("role", response.data.role);
            if (localStorage.getItem("role") == "Customer") {
              localStorage.setItem(
                "merchant",
                JSON.stringify(response.data.merchant)
              );
            }
            return response.data.user;
          });
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error.response.data.error.message);
        setError(error.response.data.error.message);
        setUserFormDetails({
          email: "",
          password: "",
        });
      });
  };
  const handleRegister = (event) => {
    event.preventDefault();
    navigate("/customer/register");
  };
  return (
    <>
      <PageHeading>Login</PageHeading>
      <Form onSubmit={handleSubmit} multi>
        <InputWrapper>
          <Label htmlFor="email">Email:</Label>
          <Input
            type="email"
            name="email"
            onChange={handleChange}
            value={userFormDetails.email}
          />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="password">Password:</Label>
          <Input
            type="password"
            name="password"
            onChange={handleChange}
            value={userFormDetails.password}
          />
        </InputWrapper>
        <div>
          <Button type="submit">Login</Button>
          <Button onClick={handleRegister}>Register</Button>
        </div>
      </Form>
      <Error error={error} />
    </>
  );
};
