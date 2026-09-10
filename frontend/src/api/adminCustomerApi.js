import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});


// ==========================================
// GET ALL CUSTOMERS
// ==========================================

export const getAllCustomers = () => {
  const token = localStorage.getItem("token");

  return API.get("/admin/customers", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


// ==========================================
// GET CUSTOMER DETAILS
// ==========================================

export const getCustomerDetails = (customerId) => {
  const token = localStorage.getItem("token");

  return API.get(
    `/admin/customers/${customerId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};