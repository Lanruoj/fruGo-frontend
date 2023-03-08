import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Input, InputWrapper, Label } from "./styled/Form";
import { useUserContext } from "../utils/UserContext";
import { PageHeading } from "./styled/PageHeading";
import { registerCustomer } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const { setCurrentUser } = useUserContext();
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
  const navigate = useNavigate();
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await registerCustomer(formData);
      setCurrentUser(user);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <PageHeading>Register</PageHeading>
      <Form onSubmit={handleSubmit} autoComplete="off" multi>
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
