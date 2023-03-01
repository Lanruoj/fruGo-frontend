import axios from "axios";
import { useEffect, useState } from "react";
import { Title } from "./styled/Title";
import { InputWrapper } from "./styled/InputWrapper";

export const Register = () => {
  const [cities, setCities] = useState("");
  useEffect(() => {
    axios
      .get("/cities")
      .then((response) => response.data)
      .then((data) => {
        setCities(data.data);
      });
  }, []);
  return (
    <>
      <Title>Register</Title>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <InputWrapper>
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="firstName">First name:</label>
          <input type="text" name="firstName" />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="lastName">Last name:</label>
          <input type="text" name="lastName" />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="streetAddress">Street address:</label>
          <input type="text" name="streetAddress" />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="city">City:</label>
          <select name="city" id="city">
            {cities &&
              cities.map((city) => {
                return (
                  <option key={city._id} value={city._id}>
                    {city.name}
                  </option>
                );
              })}
          </select>
        </InputWrapper>
        <div>
          <input type="submit" value="Register" />
        </div>
      </form>
    </>
  );
};
