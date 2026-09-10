import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});


// ==========================================
// GET ALL ORDERS
// ==========================================

export const getAllOrders = () => {

  const token =
    localStorage.getItem("token");

  return API.get("/admin/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

};


// ==========================================
// UPDATE ORDER STATUS
// ==========================================

export const updateOrderStatus = (
  orderId,
  status
) => {

  const token =
    localStorage.getItem("token");

  return API.put(
    `/admin/orders/${orderId}/status`,
    {
      status: status,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

};