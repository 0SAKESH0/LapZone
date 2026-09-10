import axios from "axios";


const API = axios.create({
  baseURL: "http://localhost:8080/api",
});


// ==========================================
// CREATE ORDER
// ==========================================

export const createOrder = (orderData) => {

  const token =
    localStorage.getItem("token");

  return API.post(
    "/orders",
    orderData,
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

};


// ==========================================
// GET MY ORDERS
// ==========================================

export const getMyOrders = () => {

  const token =
    localStorage.getItem("token");

  return API.get(
    "/orders/my-orders",
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

};


// ==========================================
// GET SINGLE ORDER
// ==========================================

export const getOrderById = (orderId) => {

  const token =
    localStorage.getItem("token");

  return API.get(
    `/orders/${orderId}`,
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

};

export const cancelOrder = (orderId) => {
  const token = localStorage.getItem("token");

  return API.put(
    `/orders/${orderId}/cancel`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};