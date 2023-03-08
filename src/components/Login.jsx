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
import { login, registerCustomer } from "../utils/auth";

export const Login = () => {
  const { setSession, session, currentRole } = useUserContext();
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
    try {
      await login(userFormDetails);
      if (session) {
        setSession(0);
      } else {
        setSession(1);
      }
      if (currentRole == "Customer") {
        navigate("/customer/products");
      } else if (currentRole == "Merchant") {
        navigate("/merchant/stock");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const goToRegister = (event) => {
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
          <Button onClick={goToRegister}>Register</Button>
        </div>
      </Form>
      {/* <Error error={error} /> */}
    </>
  );
};
