import { useState } from "react";
import { useUserContext } from "../utils/UserContext";
import { Button } from "./styled/Button";
import { Form, Input, InputWrapper, Label } from "./styled/Form";
import { useNavigate } from "react-router-dom";
import { Error } from "./Error";
import { PageHeading } from "./styled/PageHeading";
import { login } from "../utils/auth";

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
    try {
      const user = await login(userFormDetails);
      setCurrentUser(user);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.response.data.error.message);
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
        {!!error && <Error error={error} />}
      </Form>
    </>
  );
};
