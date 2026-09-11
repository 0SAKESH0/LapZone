import axios from "axios";

const API = axios.create({
  baseURL: "https://lapzone-hq43.onrender.com/api",
});


// Get all products
export const getAdminProducts = () => {

  const token = localStorage.getItem("token");

  return API.get("/admin/products", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

};


// Add product
export const createProduct = (product) => {

  const token = localStorage.getItem("token");

  return API.post(
    "/admin/products",
    product,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

};


// Update product
export const updateProduct = (id, product) => {

  const token = localStorage.getItem("token");

  return API.put(
    `/admin/products/${id}`,
    product,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

};


// Delete product
export const deleteProduct = (id) => {

  const token = localStorage.getItem("token");

  return API.delete(
    `/admin/products/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

};