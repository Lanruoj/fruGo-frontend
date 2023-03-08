import axios from "axios";

export const login = async ({ email, password }) => {
  const response = await axios.post("/auth/login", {
    email,
    password,
  });
  if (response.data.accessToken) {
    console.log(response);
    localStorage.setItem("token", response.data.accessToken);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("role", response.data.role);
    if (response.data.role == "Customer") {
      localStorage.setItem("cart", JSON.stringify(response.data.user._cart));
    }
  }
  return response.data.user;
};

export const registerCustomer = async (data) => {
  const response = await axios.post("/customers/register", data);
  console.log(response);
  if (response.data.accessToken) {
    localStorage.setItem("token", response.data.accessToken);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("role", response.data.role);
    if (response.data.role == "Customer") {
      localStorage.setItem("cart", JSON.stringify(response.data.user._cart));
    }
  }
  return response.data.user;
};

export const authenticateUser = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const role = localStorage.getItem("role");
  const cart = localStorage.getItem("cart") || null;
  if (!user) {
    return {};
  }
  return {
    token: token,
    user: JSON.parse(user),
    role: role,
    cart: JSON.parse(cart),
  };
};
