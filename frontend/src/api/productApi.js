import axios from "axios";

const API = axios.create({
  baseURL: "https://lapzone-hq43.onrender.com/api",
});

export const getProducts = () =>
  API.get("/products");

export const getProductById = (id) =>
  API.get(`/products/${id}`);