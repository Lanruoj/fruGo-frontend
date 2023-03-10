import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import App from "./App";
import { ScrollToTop } from "./utils/ScrollToTop";

axios.defaults.baseURL =
  process.env.NODE_ENV == "production"
    ? process.env.REACT_APP_BASE_URL
    : process.env.NODE_ENV == "development" &&
      process.env.REACT_APP_DEV_BASE_URL;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ScrollToTop />
    <App />
  </BrowserRouter>
);
