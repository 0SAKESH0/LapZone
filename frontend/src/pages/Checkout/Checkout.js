import "./Checkout.css";

import {
  useState,
  useContext,
  useEffect,
} from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import { CartContext } from "../../context/CartContext";
import Footer from "../../components/Footer/Footer";

import { createOrder } from "../../api/orderApi";

import {
  FaTruck,
  FaShieldAlt,
  FaCreditCard,
} from "react-icons/fa";


function Checkout() {

  const navigate = useNavigate();
  const location = useLocation();


  // ==========================================
  // CHECK LOGIN
  // ==========================================

  const [checkingLogin, setCheckingLogin] =
    useState(true);


  useEffect(() => {

    const token =
      localStorage.getItem("token");


    if (!token) {

      navigate("/login", {
        state: {
          from: "/checkout",
        },
        replace: true,
      });

      return;
    }


    setCheckingLogin(false);

  }, [navigate]);


  // ==========================================
  // CART
  // ==========================================

  const {
    cart,
    clearCart,
  } = useContext(CartContext);


  // ==========================================
  // DIRECT BUY NOW PRODUCT
  // ==========================================

  const directProduct =
    location.state?.product || null;


  // ==========================================
  // ITEMS TO CHECKOUT
  // ==========================================

  const checkoutItems = directProduct
    ? [directProduct]
    : cart;


  // ==========================================
  // FORM STATE
  // ==========================================

  const [formData, setFormData] = useState({

    customerName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",

  });


  // ==========================================
  // ORDER STATE
  // ==========================================

  const [placingOrder, setPlacingOrder] =
    useState(false);


  const [orderError, setOrderError] =
    useState("");


  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;


    setFormData((prev) => ({

      ...prev,

      [name]: value,

    }));

  };


  // ==========================================
  // TOTAL
  // ==========================================

  const subtotal = checkoutItems.reduce(
    (sum, item) =>
      sum +
      Number(item.price) *
      item.qty,
    0
  );


  const shipping =
    subtotal > 50000
      ? 0
      : 499;


  const tax =
    Math.round(
      subtotal * 0.18
    );


  const total =
    subtotal +
    shipping +
    tax;


  // ==========================================
  // PLACE ORDER
  // ==========================================

  const handlePlaceOrder = async () => {

    // Check login again before placing order
    const token =
      localStorage.getItem("token");


    if (!token) {

      navigate("/login", {
        state: {
          from: "/checkout",
        },
      });

      return;
    }


    if (checkoutItems.length === 0) {

      setOrderError(
        "Your cart is empty."
      );

      return;
    }


    try {

      setPlacingOrder(true);

      setOrderError("");


      // ========================================
      // PREPARE ORDER ITEMS
      // ========================================

      const items =
        checkoutItems.map(
          (item) => ({

            productId: item.id,

            productName: item.name,

            brand: item.brand,

            price: item.price,

            quantity: item.qty,

          })
        );


      // ========================================
      // PREPARE ORDER DATA
      // ========================================

      const orderData = {

        customerName:
          formData.customerName,

        email:
          formData.email,

        phone:
          formData.phone,

        address:
          formData.address,

        city:
          formData.city,

        state:
          formData.state,

        pincode:
          formData.pincode,

        subtotal,

        shipping,

        tax,

        total,

        items,

      };


      // ========================================
      // SEND TO JAVA BACKEND
      // ========================================

      const response =
        await createOrder(
          orderData
        );


      // ========================================
      // SAVE LAST ORDER
      // ========================================

      localStorage.setItem(
        "lastOrder",
        JSON.stringify({

          id:
            response.data.id,

          createdAt:
            response.data.createdAt,

        })
      );


      // ========================================
      // CLEAR CART
      // ========================================

      if (!directProduct) {

        clearCart();

      }


      // ========================================
      // GO TO LOADING
      // ========================================

      navigate("/loading");


    } catch (error) {

      console.error(
        "Order creation failed:",
        error
      );


      // ========================================
      // AUTH ERROR
      // ========================================

      if (
        error.response?.status === 401 ||
        error.response?.status === 403
      ) {

        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "user"
        );


        setOrderError(
          "Your session has expired. Please login again."
        );


        setTimeout(() => {

          navigate("/login", {
            state: {
              from: "/checkout",
            },
          });

        }, 1000);


        return;
      }


      // ========================================
      // BACKEND ERROR
      // ========================================

      const backendMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.response?.data;


      if (
        typeof backendMessage === "string" &&
        backendMessage.trim()
      ) {

        setOrderError(
          backendMessage
        );

      } else {

        setOrderError(
          "Unable to place your order. Please check your cart and try again."
        );

      }

    } finally {

      setPlacingOrder(false);

    }

  };


  // ==========================================
  // LOGIN CHECK SCREEN
  // ==========================================

  if (checkingLogin) {

    return (

      <div className="checkout-page">

        <div
          style={{
            width: "100%",
            minHeight: "500px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            fontWeight: "600",
          }}
        >
          Checking login...
        </div>

      </div>

    );

  }


  // ==========================================
  // RETURN
  // ==========================================

  return (

    <>

      <section className="checkout-page">


        {/* =====================================
            LEFT SIDE
        ===================================== */}

        <div className="checkout-left">


          <div className="checkout-heading">

            <span>
              DELIVERY DETAILS
            </span>

            <h1>
              Shipping Address
            </h1>

            <p>
              Enter your delivery details
              to complete your order.
            </p>

          </div>


          <div className="checkout-form-card">


            <form
              onSubmit={(e) => {

                e.preventDefault();

                handlePlaceOrder();

              }}
            >


              {/* Full Name */}

              <div className="form-group">

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  name="customerName"
                  placeholder="Enter your full name"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* Email */}

              <div className="form-group">

                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* Phone */}

              <div className="form-group">

                <label>
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* Address */}

              <div className="form-group">

                <label>
                  Full Address
                </label>

                <textarea
                  name="address"
                  placeholder="House number, street, area..."
                  rows="4"
                  value={formData.address}
                  onChange={handleChange}
                  required
                ></textarea>

              </div>


              {/* City + State */}

              <div className="form-row">


                <div className="form-group">

                  <label>
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />

                </div>


                <div className="form-group">

                  <label>
                    State
                  </label>

                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />

                </div>


              </div>


              {/* Pincode */}

              <div className="form-group">

                <label>
                  Pincode
                </label>

                <input
                  type="text"
                  name="pincode"
                  placeholder="6-digit pincode"
                  maxLength="6"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* Error */}

              {orderError && (

                <div className="order-error">

                  {orderError}

                </div>

              )}


              {/* Delivery Information */}

              <div className="checkout-benefits">


                <div>

                  <FaTruck />

                  <span>
                    Fast delivery
                  </span>

                </div>


                <div>

                  <FaShieldAlt />

                  <span>
                    Secure checkout
                  </span>

                </div>


                <div>

                  <FaCreditCard />

                  <span>
                    Safe payments
                  </span>

                </div>


              </div>


              {/* Mobile place order button */}

              <button
                type="submit"
                className="mobile-place-order"
                disabled={
                  placingOrder ||
                  checkoutItems.length === 0
                }
              >

                {placingOrder
                  ? "Placing Order..."
                  : "Place Order"}

              </button>


            </form>

          </div>

        </div>


        {/* =====================================
            RIGHT SIDE
        ===================================== */}

        <aside className="checkout-right">


          <div className="summary-card">


            <div className="summary-heading">

              <span>
                YOUR ORDER
              </span>

              <h2>
                Order Summary
              </h2>

            </div>


            {/* Products */}

            <div className="checkout-products">


              {checkoutItems.map(
                (item) => (

                  <div
                    className="checkout-product"
                    key={item.id}
                  >


                    <div className="checkout-product-image">

                      <img
                        src={item.image}
                        alt={item.name}
                      />

                    </div>


                    <div className="checkout-product-info">

                      <h3>
                        {item.name}
                      </h3>

                      <p>
                        {item.brand}
                      </p>

                      <span>
                        Qty: {item.qty}
                      </span>

                    </div>


                    <strong>

                      ₹{" "}

                      {(
                        Number(item.price) *
                        item.qty
                      ).toLocaleString(
                        "en-IN"
                      )}

                    </strong>


                  </div>

                )
              )}


            </div>


            {/* Price breakdown */}

            <div className="summary-prices">


              <div>

                <span>
                  Subtotal
                </span>

                <strong>
                  ₹{" "}
                  {subtotal.toLocaleString(
                    "en-IN"
                  )}
                </strong>

              </div>


              <div>

                <span>
                  Shipping
                </span>

                <strong
                  className={
                    shipping === 0
                      ? "free"
                      : ""
                  }
                >

                  {shipping === 0
                    ? "FREE"
                    : `₹${shipping.toLocaleString(
                        "en-IN"
                      )}`}

                </strong>

              </div>


              <div>

                <span>
                  GST (18%)
                </span>

                <strong>
                  ₹{" "}
                  {tax.toLocaleString(
                    "en-IN"
                  )}
                </strong>

              </div>


            </div>


            {/* Total */}

            <div className="checkout-total">

              <span>
                Total
              </span>

              <strong>
                ₹{" "}
                {total.toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>


            {/* Place order */}

            <button
              type="button"
              className="place-order"
              onClick={
                handlePlaceOrder
              }
              disabled={
                checkoutItems.length === 0 ||
                placingOrder
              }
            >

              {checkoutItems.length === 0
                ? "Cart is Empty"
                : placingOrder
                ? "Placing Order..."
                : "Place Order"}

            </button>


            {/* Security */}

            <div className="checkout-security">


              <div>

                <FaShieldAlt />

                <span>
                  Secure checkout
                </span>

              </div>


              <div>

                <FaTruck />

                <span>
                  Fast delivery
                </span>

              </div>


              <div>

                <FaCreditCard />

                <span>
                  Safe payments
                </span>

              </div>


            </div>


          </div>

        </aside>


      </section>


      <Footer />

    </>

  );

}


export default Checkout;