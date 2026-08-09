import "./OrderSuccess.css";

import { Link } from "react-router-dom";

import {
  FaCheck,
  FaCheckCircle,
  FaTruck,
  FaBoxOpen,
  FaCalendarAlt,
} from "react-icons/fa";

function OrderSuccess() {

  const orderId =
    "LZ" +
    Math.floor(
      100000 + Math.random() * 900000
    );

  const today = new Date();

  return (
    <div className="success-page">

      {/* Decorative background */}

      <div className="success-bg">

        <span className="success-orb orb-one"></span>
        <span className="success-orb orb-two"></span>
        <span className="success-orb orb-three"></span>

      </div>


      {/* Main Card */}

      <div className="success-card">

        {/* Success Icon */}

        <div className="success-icon-wrapper">

          <div className="success-ring ring-one"></div>
          <div className="success-ring ring-two"></div>

          <div className="success-icon">

            <FaCheck />

          </div>

        </div>


        {/* Heading */}

        <span className="success-label">
          ORDER CONFIRMED
        </span>

        <h1>
          Order Placed
          <br />
          <span>Successfully!</span>
        </h1>

        <p className="success-message">
          Thank you for shopping with
          <strong> LapZone</strong>.
          <br />
          Your order has been confirmed and
          is being prepared.
        </p>


        {/* Order Details */}

        <div className="order-info">

          {/* Order ID */}

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


          {/* Date */}

          <div className="order-info-card">

            <div className="info-icon">
              <FaCalendarAlt />
            </div>

            <div className="info-content">

              <span>
                ORDER DATE
              </span>

              <h3>
                {today.toLocaleDateString(
                  "en-IN"
                )}
              </h3>

            </div>

          </div>


          {/* Delivery */}

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


        {/* Delivery Status */}

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


        {/* Buttons */}

        <div className="success-buttons">

          <Link
            to="/products"
            className="shop-btn"
          >
            Continue Shopping
            <span>→</span>
          </Link>

          

        </div>


        {/* Bottom message */}

        <p className="success-footer">
          Need help with your order?
          <span> Contact LapZone Support</span>
        </p>

      </div>

    </div>
  );
}

export default OrderSuccess;