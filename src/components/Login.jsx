import axios from "axios";
import { useState } from "react";
import { Title } from "./styled/Title";
import { useAuthContext } from "../utils/AuthContext";
import { useMerchantContext } from "../utils/MerchantContext";
import { InputWrapper } from "./styled/InputWrapper";

export const Login = (props) => {
  const { setLoggedInUser, setToken } = useAuthContext();
  const { setMerchant } = useMerchantContext();
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
        localStorage.setItem("token", response.data.accessToken);
        return response.data.accessToken;
      });
      const merchantResponse = await axios.get(
        `/merchants/${response.data.cart._merchant}`
      );
      setMerchant(() => {
        return merchantResponse.data.data;
      });
    }
  };
  return (
    <>
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
};
