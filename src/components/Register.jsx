import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Input, InputWrapper, Label } from "./styled/Form";
import { useUserContext } from "../utils/UserContext";
import { PageHeading } from "./styled/PageHeading";
import { registerCustomer } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "./styled/Dropdown";
import { Button } from "./styled/Button";

export const Register = () => {
  const { setCurrentUser } = useUserContext();
  const [cities, setCities] = useState([]);
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
            _city: "default",
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
          <Input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            autoComplete="off"
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            autoComplete="new-password"
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            type="username"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            value={formData.username}
            autoComplete="off"
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            type="text"
            name="firstName"
            placeholder="First name"
            onChange={handleChange}
            value={formData.firstName}
            autoComplete="off"
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            type="text"
            name="lastName"
            placeholder="Last name"
            onChange={handleChange}
            value={formData.lastName}
            autoComplete="off"
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            type="text"
            name="streetAddress"
            placeholder="Street address"
            onChange={handleChange}
            value={formData.streetAddress}
            autoComplete="off"
          />
        </InputWrapper>
        <InputWrapper>
          <Dropdown
            name="_city"
            id="_city"
            onChange={handleChange}
            value={formData._city}
          >
            <option value="default" disabled>
              City
            </option>
            {cities &&
              cities.map((city) => {
                return (
                  <option key={city._id} value={city._id}>
                    {city.name}
                  </option>
                );
              })}
          </Dropdown>
        </InputWrapper>
        <Button>Register</Button>
      </Form>
    </>
  );
};
