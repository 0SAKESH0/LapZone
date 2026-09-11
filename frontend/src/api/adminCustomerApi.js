import axios from "axios";

const API = axios.create({
  baseURL: "https://lapzone-hq43.onrender.com/api",
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