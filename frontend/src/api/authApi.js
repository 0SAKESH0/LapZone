import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const registerUser = (userData) =>
  API.post("/auth/register", userData);

export const loginUser = (userData) =>
  API.post("/auth/login", userData);

export const getProfile = (token) =>
  API.get("/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });