import axios from "axios";

const API = axios.create({
  baseURL: "https://lapzone-hq43.onrender.com/api",
});

export const getDashboardStats = () => {
  const token = localStorage.getItem("token");

  return API.get("/admin/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};