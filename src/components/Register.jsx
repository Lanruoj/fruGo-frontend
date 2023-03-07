import axios from "axios";
import { useEffect, useState } from "react";
import { Title } from "./styled/Title";
import { Form, Input, InputWrapper, Label } from "./styled/Form";
import { useUserContext } from "../utils/UserContext";

export const Register = () => {
  const { setLoggedInUser, setRole, setToken, setMerchant, setCart } =
    useUserContext();
  const [cities, setCities] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    firstName: "",
    lastName: "",
    streetAddress: "",
    _city: "",
  });
  useEffect(() => {
    axios
      .get("/cities")
      .then((response) => response.data)
      .then((data) => {
        setCities(data.data);
        setFormData(() => {
          return {
            ...formData,
            _city: data.data[0]._id,
          };
        });
      });
  }, []);
  const handleChange = (event) => {
    event.preventDefault();
    setFormData((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/customers/register", formData)
      .then((response) => response)
      .then((response) => {
        setLoggedInUser(() => {
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
      });
  };
  return (
    <>
      <Title>Register</Title>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <InputWrapper>
          <Label htmlFor="email">Email:</Label>
          <Input
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            autoComplete="off"
          />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="password">Password:</Label>
          <Input
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            autoComplete="new-password"
          />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="username">Username:</Label>
          <Input
            type="username"
            name="username"
            onChange={handleChange}
            value={formData.username}
            autoComplete="off"
          />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="firstName">First name:</Label>
          <Input
            type="text"
            name="firstName"
            onChange={handleChange}
            value={formData.firstName}
            autoComplete="off"
          />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="lastName">Last name:</Label>
          <Input
            type="text"
            name="lastName"
            onChange={handleChange}
            value={formData.lastName}
            autoComplete="off"
          />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="streetAddress">Street address:</Label>
          <Input
            type="text"
            name="streetAddress"
            onChange={handleChange}
            value={formData.streetAddress}
            autoComplete="off"
          />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="_city">City:</Label>
          <select
            name="_city"
            id="_city"
            onChange={handleChange}
            value={formData._city}
          >
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
      </Form>
    </>
  );
};
