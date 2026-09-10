import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const getDashboardStats = () => {
  const token = localStorage.getItem("token");

  return API.get("/admin/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};