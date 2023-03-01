import axios from "axios";
import { useState } from "react";
import NotLoggedInNavBar from "./NavBar/NotLoggedInNavBar";
import Title from "./styled/Title";
import InputWrapper from "./styled/InputWrapper";
import { useLoggedInUserContext } from "../utils/LoggedInUserContext";

export default function Login(props) {
  const { setLoggedInUser, setToken } = useLoggedInUserContext();
  const [userFormDetails, setUserFormDetails] = useState({
    username: "",
    password: "",
  });
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
    const response = await axios.post("/auth/login", userFormDetails);
    if (response.status == 200) {
      setLoggedInUser(() => {
        return response.data.user;
      });
      setToken(() => {
        return response.data.accessToken;
      });
    }
  };
  return (
    <>
      <NotLoggedInNavBar />
      <Title>Login</Title>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onSubmit={handleSubmit}
      >
        <InputWrapper>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={userFormDetails.email}
          />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={userFormDetails.password}
          />
        </InputWrapper>
        <div>
          <input className="login-button" type="submit" value="SUBMIT" />
        </div>
      </form>
    </>
  );
}
