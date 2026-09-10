import "./OrderDetails.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getOrderById,
  cancelOrder,
} from "../../api/orderApi";

function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancelling, setCancelling] = useState(false);

  // ==========================================
  // FETCH ORDER
  // ==========================================

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getOrderById(orderId);

        setOrder(response.data);
      } catch (error) {
        if (
          error.response?.status === 401 ||
          error.response?.status === 403
        ) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          navigate("/login");
          return;
        }

        setError("Order not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, navigate]);

  // ==========================================
  // CANCEL ORDER
  // ==========================================

  const handleCancelOrder = async () => {
    if (!order) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setCancelling(true);

      const response = await cancelOrder(order.id);

      setOrder(response.data);

      alert("Order cancelled successfully!");
    } catch (error) {
      const backendMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.response?.data;

      if (
        typeof backendMessage === "string" &&
        backendMessage.trim()
      ) {
        alert(backendMessage);
      } else {
        alert("Failed to cancel order.");
      }
    } finally {
      setCancelling(false);
    }
  };

  // ==========================================
  // CHECK IF ORDER CAN BE CANCELLED
  // ==========================================

  const canCancel =
    order &&
    (order.status === "PLACED" ||
      order.status === "CONFIRMED");

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="order-details-page">
        <div className="order-details-loading">
          <h2>Loading Order...</h2>
        </div>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error || !order) {
    return (
      <div className="order-details-page">
        <div className="order-details-error">
          <h1>Order Not Found</h1>

          <p>
            We couldn't find this order.
          </p>

          <button
            onClick={() => navigate("/my-orders")}
          >
            Back to My Orders
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // ORDER ID
  // ==========================================

  const formattedOrderId =
    `LZ${String(order.id).padStart(6, "0")}`;

  // ==========================================
  // DATE
  // ==========================================

  const formattedDate =
    order.createdAt
      ? new Date(order.createdAt).toLocaleDateString(
          "en-IN",
          {
            day: "numeric",
            month: "long",
            year: "numeric",
          }
        )
      : "-";

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="order-details-page">

      {/* ======================================
          BACK
      ====================================== */}

      <div className="order-details-top">
        <button
          className="back-orders-btn"
          onClick={() => navigate("/my-orders")}
        >
          ← Back to My Orders
        </button>
      </div>

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="order-details-header">
        <div>
          <span>
            LAPZONE ORDER
          </span>

          <h1>
            {formattedOrderId}
          </h1>

          <p>
            Placed on {formattedDate}
          </p>
        </div>

        <div className="details-status">
          {order.status}
        </div>
      </div>

      {/* ======================================
          MAIN CONTENT
      ====================================== */}

      <div className="order-details-grid">

        {/* ====================================
            LEFT
        ==================================== */}

        <div className="order-details-main">

          {/* ORDER ITEMS */}

          <div className="details-card">
            <div className="details-card-header">
              <h2>
                Items Ordered
              </h2>

              <span>
                {order.items?.length || 0}{" "}
                {order.items?.length === 1
                  ? "item"
                  : "items"}
              </span>
            </div>

            <div className="details-items">
              {order.items?.map((item) => (
                <div
                  className="details-item"
                  key={item.id}
                >
                  <div className="details-item-info">
                    <h3>
                      {item.productName}
                    </h3>

                    <p>
                      {item.brand}
                    </p>
                  </div>

                  <div className="details-item-qty">
                    Qty: {item.quantity}
                  </div>

                  <div className="details-item-price">
                    ₹{" "}
                    {Number(item.price).toLocaleString(
                      "en-IN"
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DELIVERY ADDRESS */}

          <div className="details-card">
            <h2>
              Delivery Address
            </h2>

            <div className="address-details">
              <strong>
                {order.customerName}
              </strong>

              <p>
                {order.address}
              </p>

              <p>
                {order.city}, {order.state}
              </p>

              <p>
                PIN: {order.pincode}
              </p>

              <p>
                Phone: {order.phone}
              </p>
            </div>
          </div>

        </div>

        {/* ====================================
            RIGHT
        ==================================== */}

        <div className="order-details-sidebar">

          {/* ORDER SUMMARY */}

          <div className="details-card">
            <h2>
              Order Summary
            </h2>

            <div className="summary-row">
              <span>
                Subtotal
              </span>

              <strong>
                ₹{" "}
                {Number(order.subtotal).toLocaleString(
                  "en-IN"
                )}
              </strong>
            </div>

            <div className="summary-row">
              <span>
                Shipping
              </span>

              <strong>
                {Number(order.shipping) === 0
                  ? "FREE"
                  : `₹ ${Number(
                      order.shipping
                    ).toLocaleString("en-IN")}`}
              </strong>
            </div>

            <div className="summary-row">
              <span>
                GST
              </span>

              <strong>
                ₹{" "}
                {Number(order.tax).toLocaleString(
                  "en-IN"
                )}
              </strong>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span>
                Total
              </span>

              <strong>
                ₹{" "}
                {Number(order.total).toLocaleString(
                  "en-IN"
                )}
              </strong>
            </div>
          </div>

          {/* CUSTOMER */}

          <div className="details-card">
            <h2>
              Customer Information
            </h2>

            <div className="customer-details">
              <p>
                <span>Name</span>

                <strong>
                  {order.customerName}
                </strong>
              </p>

              <p>
                <span>Email</span>

                <strong>
                  {order.email}
                </strong>
              </p>

              <p>
                <span>Phone</span>

                <strong>
                  {order.phone}
                </strong>
              </p>
            </div>
          </div>

          {/* CANCEL ORDER */}

          {canCancel && (
            <div className="details-card cancel-order-card">
              <h2>
                Order Actions
              </h2>

              <p className="cancel-order-text">
                You can cancel this order before it
                is shipped.
              </p>

              <button
                className="cancel-order-btn"
                onClick={handleCancelOrder}
                disabled={cancelling}
              >
                {cancelling
                  ? "Cancelling..."
                  : "Cancel Order"}
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default OrderDetails;