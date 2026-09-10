import "./OrderSuccess.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaCheck,
  FaCheckCircle,
  FaTruck,
  FaBoxOpen,
  FaCalendarAlt,
} from "react-icons/fa";


function OrderSuccess() {

  const [order, setOrder] = useState(null);


  // ==========================================
  // GET LAST ORDER
  // ==========================================

  useEffect(() => {

    const savedOrder =
      localStorage.getItem("lastOrder");


    if (savedOrder) {

      try {

        const data =
          JSON.parse(savedOrder);

        setOrder(data);

      } catch (error) {

        console.error(
          "Failed to read order:",
          error
        );

      }

    }

  }, []);


  // ==========================================
  // ORDER ID
  // ==========================================

  const orderId = order?.id
    ? `LZ${String(order.id).padStart(6, "0")}`
    : "LZ--------";


  // ==========================================
  // ORDER DATE
  // ==========================================

  const orderDate = order?.createdAt
    ? new Date(order.createdAt).toLocaleDateString(
        "en-IN"
      )
    : new Date().toLocaleDateString(
        "en-IN"
      );


  return (

    <div className="success-page">


      {/* ======================================
          DECORATIVE BACKGROUND
      ====================================== */}

      <div className="success-bg">

        <span className="success-orb orb-one"></span>

        <span className="success-orb orb-two"></span>

        <span className="success-orb orb-three"></span>

      </div>


      {/* ======================================
          MAIN CARD
      ====================================== */}

      <div className="success-card">


        {/* ==================================
            SUCCESS ICON
        ================================== */}

        <div className="success-icon-wrapper">

          <div className="success-ring ring-one"></div>

          <div className="success-ring ring-two"></div>

          <div className="success-icon">

            <FaCheck />

          </div>

        </div>


        {/* ==================================
            HEADING
        ================================== */}

        <span className="success-label">
          ORDER CONFIRMED
        </span>


        <h1>

          Order Placed

          <br />

          <span>
            Successfully!
          </span>

        </h1>


        <p className="success-message">

          Thank you for shopping with
          <strong> LapZone</strong>.

          <br />

          Your order has been confirmed and
          is being prepared.

        </p>


        {/* ==================================
            ORDER DETAILS
        ================================== */}

        <div className="order-info">


          {/* ORDER ID */}

          <div className="order-info-card">

            <div className="info-icon">

              <FaBoxOpen />

            </div>


            <div className="info-content">

              <span>
                ORDER ID
              </span>

              <h3>
                {orderId}
              </h3>

            </div>

          </div>


          {/* ORDER DATE */}

          <div className="order-info-card">

            <div className="info-icon">

              <FaCalendarAlt />

            </div>


            <div className="info-content">

              <span>
                ORDER DATE
              </span>

              <h3>
                {orderDate}
              </h3>

            </div>

          </div>


          {/* DELIVERY */}

          <div className="order-info-card delivery-card">

            <div className="info-icon delivery-icon">

              <FaTruck />

            </div>


            <div className="info-content">

              <span>
                ESTIMATED DELIVERY
              </span>

              <h3>
                3 - 5 Business Days
              </h3>

            </div>

          </div>


        </div>


        {/* ==================================
            DELIVERY STATUS
        ================================== */}

        <div className="delivery-status">

          <div className="status-check">

            <FaCheckCircle />

          </div>


          <div>

            <strong>
              Order confirmed
            </strong>

            <span>
              We'll notify you when your
              order is on the way.
            </span>

          </div>

        </div>


        {/* ==================================
            BUTTONS
        ================================== */}

        <div className="success-buttons">

          <Link
            to="/products"
            className="shop-btn"
          >

            Continue Shopping

            <span>
              →
            </span>

          </Link>

        </div>


        {/* ==================================
            FOOTER MESSAGE
        ================================== */}

        <p className="success-footer">

          Need help with your order?

          <span>
            {" "}Contact LapZone Support
          </span>

        </p>


      </div>

    </div>

  );

}


export default OrderSuccess;