import axios from "axios";
import { useState } from "react";
import { Title } from "./styled/Title";
import { useUserContext } from "../utils/UserContext";
import { Button } from "./styled/Button";
import { Form, Input, InputWrapper, Label } from "./styled/Form";
import { NavLink } from "./NavBar";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { loggedInUser, setLoggedInUser, setRole, setToken, setMerchant } =
    useUserContext();
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
    const response = await axios
      .post("/auth/login", userFormDetails)
      .catch((error) => console.log(error));
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
    }
  };
  const handleRegister = (event) => {
    event.preventDefault();
    navigate("/customer/register");
  };
  return (
    <>
      <Title>Login</Title>
      <Form onSubmit={handleSubmit}>
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
    </>
  );
};
