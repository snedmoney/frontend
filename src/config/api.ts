import axios from "axios";

export const apiClient = axios.create({
  // baseURL: "http://localhost:8002/api",
  //baseURL: "https://backend-staging-hc8j.onrender.com/api",
  // baseURL: "https://backend-g057.onrender.com/api",
  baseURL: "https://api.sned.money/api",
});

apiClient.interceptors.request.use((config) => {
  // Add token to header before each request
  const token = localStorage.getItem("token");

  config.headers["Access-Control-Allow-Origin"] = "*";

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
