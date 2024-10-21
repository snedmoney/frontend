import axios from "axios";

export const apiClient = axios.create({
  // baseURL: "http://localhost:8002/api",
  baseURL: "https://backend-staging-hc8j.onrender.com",
  //  baseURL: "https://backend-g057.onrender.com/api",
  headers: {
    Authorization: `${localStorage.getItem("token") || ""}`,
  },
});
