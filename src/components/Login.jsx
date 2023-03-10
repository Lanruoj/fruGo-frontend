import { useState } from "react";
import { useUserContext } from "../utils/UserContext";
import { Button } from "./styled/Button";
import { Form, Input, InputWrapper, Label } from "./styled/Form";
import { useNavigate } from "react-router-dom";
import { Error } from "./Error";
import { PageHeading } from "./styled/PageHeading";
import { login } from "../utils/auth";
import styled from "styled-components";

const ModuleContainer = styled.div`
  background-color: white;
  border-radius: 0.3rem;
`;

export const Login = () => {
  const { setCurrentUser, error, setError } = useUserContext();
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
    if (!userFormDetails.email) {
      setError("Please enter an email address");
    } else if (!userFormDetails.password) {
      setError("Please enter a password");
    } else {
      try {
        const user = await login(userFormDetails);
        setCurrentUser(user);
        navigate("/");
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.response.data.error.message);
      }
    }
  };
  const goToRegister = (event) => {
    event.preventDefault();
    navigate("/customer/register");
  };
  return (
    <>
      <PageHeading>Login</PageHeading>
      <ModuleContainer>
        <Form onSubmit={handleSubmit} multi>
          <InputWrapper>
            <Input
              type="email"
              name="email"
              onChange={handleChange}
              value={userFormDetails.email}
              placeholder="Email"
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              type="password"
              name="password"
              onChange={handleChange}
              value={userFormDetails.password}
              placeholder="Password"
            />
          </InputWrapper>
          <Button type="submit">Login</Button>
          <Button onClick={goToRegister}>Register</Button>
          {!!error && <Error error={error} />}
        </Form>
      </ModuleContainer>
    </>
  );
};
