import "./MyOrders.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getMyOrders } from "../../api/orderApi";


function MyOrders() {

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // ==========================================
  // FETCH ORDERS
  // ==========================================

  useEffect(() => {

    const token = localStorage.getItem("token");


    // User not logged in

    if (!token) {

      navigate("/login");

      return;

    }


    const fetchOrders = async () => {

      try {

        setLoading(true);

        const response =
          await getMyOrders();

        setOrders(response.data);

      } catch (error) {

        console.error(
          "Failed to fetch orders:",
          error
        );


        if (
          error.response?.status === 401 ||
          error.response?.status === 403
        ) {

          localStorage.removeItem("token");
          localStorage.removeItem("user");

          navigate("/login");

          return;

        }


        setError(
          "Unable to load your orders."
        );

      } finally {

        setLoading(false);

      }

    };


    fetchOrders();

  }, [navigate]);


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="my-orders-page">

        <div className="orders-loading">

          <h2>Loading Your Orders...</h2>

        </div>

      </div>

    );

  }


  // ==========================================
  // ERROR
  // ==========================================

  if (error) {

    return (

      <div className="my-orders-page">

        <div className="orders-error">

          <h2>{error}</h2>

          <button
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </button>

        </div>

      </div>

    );

  }


  // ==========================================
  // NO ORDERS
  // ==========================================

  if (orders.length === 0) {

    return (

      <div className="my-orders-page">

        <div className="no-orders">

          <div className="no-orders-icon">
            📦
          </div>

          <h1>No Orders Yet</h1>

          <p>
            You haven't placed any orders yet.
          </p>

          <button
            onClick={() => navigate("/products")}
          >
            Start Shopping
          </button>

        </div>

      </div>

    );

  }


  // ==========================================
  // ORDERS PAGE
  // ==========================================

  return (

    <div className="my-orders-page">


      {/* PAGE HEADER */}

      <div className="orders-header">

        <div>

          <p className="orders-label">
            LAPZONE
          </p>

          <h1>My Orders</h1>

          <p>
            Track and view your recent purchases.
          </p>

        </div>


        <div className="order-count">

          {orders.length}

          <span>
            {orders.length === 1
              ? " Order"
              : " Orders"}
          </span>

        </div>

      </div>


      {/* ORDERS */}

      <div className="orders-container">

        {orders.map((order) => (

          <div
            className="order-card"
            key={order.id}
          >


            {/* ORDER TOP */}

            <div className="order-top">

              <div>

                <span className="order-label">
                  ORDER ID
                </span>

                <h2>
                  LZ
                  {String(order.id)
                    .padStart(6, "0")}
                </h2>

              </div>


              <div className="order-status">

                <span>
                  {order.status}
                </span>

              </div>

            </div>


            {/* ORDER DATE */}

            <div className="order-date">

              Placed on{" "}

              {order.createdAt
                ? new Date(
                    order.createdAt
                  ).toLocaleDateString("en-IN")
                : "-"}

            </div>


            {/* ITEMS */}

            <div className="order-items">

              {order.items?.map((item) => (

                <div
                  className="order-item"
                  key={item.id}
                >

                  <div className="item-info">

                    <h3>
                      {item.productName}
                    </h3>

                    <p>
                      {item.brand}
                    </p>

                  </div>


                  <div className="item-quantity">

                    Qty: {item.quantity}

                  </div>


                  <div className="item-price">

                    ₹{" "}
                    {item.price.toLocaleString(
                      "en-IN"
                    )}

                  </div>

                </div>

              ))}

            </div>


            {/* ORDER BOTTOM */}

            <div className="order-bottom">


              {/* TOTAL */}

              <div className="order-summary">

                <span>
                  Total
                </span>

                <strong>
                  ₹{" "}
                  {order.total.toLocaleString(
                    "en-IN"
                  )}
                </strong>

              </div>


              {/* VIEW DETAILS */}

              <button
                className="view-order-btn"
                onClick={() =>
                  navigate(
                    `/my-orders/${order.id}`
                  )
                }
              >
                View Details
              </button>


            </div>

          </div>

        ))}

      </div>


      {/* SHOP MORE */}

      <div className="orders-footer">

        <button
          onClick={() => navigate("/products")}
        >
          Continue Shopping
        </button>

      </div>

    </div>

  );

}


export default MyOrders;