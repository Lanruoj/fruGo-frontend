import axios from "axios";

export const login = async ({ email, password }) => {
  const response = await axios.post("/auth/login", {
    email,
    password,
  });
  if (response.data.accessToken) {
    console.log(response);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("role", response.data.role);
    if (response.data.role == "Customer") {
      localStorage.setItem(
        "cart",
        JSON.stringify(response.data.user._cart._cartProducts)
      );
    }
  }
  return response.data.user;
};

export const registerCustomer = async (data) => {
  const response = await axios.post("/customers/register", data);
  console.log(response);
  if (response.data.accessToken) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("role", response.data.role);
  }
  return response.data.user;
};

export const authenticateUser = () => {
  const user = localStorage.getItem("user");
  const role = localStorage.getItem("role");
  const cart = localStorage.getItem("cart") || null;
  if (!user) {
    return {};
  }
  return [JSON.parse(user), role, cart];
};
