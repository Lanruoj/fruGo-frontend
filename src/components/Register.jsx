import axios from "axios";
import { useEffect, useState } from "react";
import { Title } from "./styled/Title";
import { InputWrapper } from "./styled/InputWrapper";
import { useAuthContext } from "../utils/AuthContext";
import { useMerchantContext } from "../utils/MerchantContext";
import { useCartContext } from "../utils/CartContext";

export const Register = () => {
  const { setLoggedInUser, setRole, setToken } = useAuthContext();
  const { setMerchant } = useMerchantContext();
  const { setCart } = useCartContext();
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
      .then((response) => response.data)
      .then((data) => {
        setLoggedInUser(() => {
          localStorage.setItem("user", JSON.stringify(data.user));
          return data.user;
        });
        setToken(() => {
          localStorage.setItem("token", data.accessToken);
          return data.accessToken;
        });
        setRole(() => {
          localStorage.setItem("role", data.role);
          return data.role;
        });
        setMerchant(() => {
          localStorage.setItem("merchant", JSON.stringify(data.merchant));
          return data.merchant;
        });
        setCart(() => {
          localStorage.setItem("cart", JSON.stringify(data.cart));
          return data.cart;
        });
      });
  };
  return (
    <>
      <Title>Register</Title>
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
            value={formData.email}
          />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
          />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="username">Username:</label>
          <input
            type="username"
            name="username"
            onChange={handleChange}
            value={formData.username}
          />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="firstName">First name:</label>
          <input
            type="text"
            name="firstName"
            onChange={handleChange}
            value={formData.firstName}
          />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="lastName">Last name:</label>
          <input
            type="text"
            name="lastName"
            onChange={handleChange}
            value={formData.lastName}
          />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="streetAddress">Street address:</label>
          <input
            type="text"
            name="streetAddress"
            onChange={handleChange}
            value={formData.streetAddress}
          />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="_city">City:</label>
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
      </form>
    </>
  );
};
