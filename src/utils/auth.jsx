import axios from "axios";

export const login = async ({ email, password }) => {
  const response = await axios.post("/auth/login", {
    email,
    password,
  });
  console.log(response);
  if (response.data.accessToken) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }
  return response.data.user;
};

export const registerCustomer = async (data) => {
  const response = await axios.post("/customers/register", data);
  console.log(response);
  if (response.data.accessToken) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }
  return response.data.user;
};

export const authenticateUser = () => {
  const user = localStorage.getItem("user");
  if (!user) {
    return false;
  }
  return JSON.parse(user);
};
