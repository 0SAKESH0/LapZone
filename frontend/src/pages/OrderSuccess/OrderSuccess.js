import "./OrderSuccess.css";

import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { FaCheckCircle } from "react-icons/fa";

function OrderSuccess() {

  const orderId =
    "LZ" + Math.floor(100000 + Math.random() * 900000);

  const today = new Date();

  return (
    <>
      <Navbar />

      <div className="success-page">

        <div className="success-card">

          <FaCheckCircle className="success-icon" />

          <h1>Order Placed Successfully!</h1>

          <p>
            Thank you for shopping with
            <strong> LapZone</strong>.
          </p>

          <div className="order-info">

            <div>
              <span>Order ID</span>
              <h3>{orderId}</h3>
            </div>

            <div>
              <span>Order Date</span>
              <h3>{today.toLocaleDateString()}</h3>
            </div>

            <div>
              <span>Delivery</span>
              <h3>3 - 5 Business Days</h3>
            </div>

          </div>

          <div className="success-buttons">

            <Link
              to="/products"
              className="shop-btn"
            >
              Continue Shopping
            </Link>

            <Link
              to="/orders"
              className="orders-btn"
            >
              View Orders
            </Link>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default OrderSuccess;