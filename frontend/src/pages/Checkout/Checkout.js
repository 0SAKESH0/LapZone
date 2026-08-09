import "./Checkout.css";

import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import Footer from "../../components/Footer/Footer";

import {
  FaTruck,
  FaShieldAlt,
  FaCreditCard,
} from "react-icons/fa";


function Checkout() {

  const navigate = useNavigate();
  const location = useLocation();

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
  // TOTAL
  // ==========================================

  const subtotal = checkoutItems.reduce(
    (sum, item) =>
      sum + item.price * item.qty,
    0
  );


  const shipping =
    subtotal > 50000
      ? 0
      : 499;


  const tax =
    Math.round(subtotal * 0.18);


  const total =
    subtotal + shipping + tax;


  // ==========================================
  // PLACE ORDER
  // ==========================================

  const handlePlaceOrder = () => {

    if (checkoutItems.length === 0) {
      return;
    }


    /*
      If the user came from Cart,
      clear the cart.

      If the user used Buy Now,
      don't touch the existing cart.
    */

    if (!directProduct) {
      clearCart();
    }


    navigate("/loading");

  };


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
                  placeholder="Enter your full name"
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
                  placeholder="Enter your email"
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
                  placeholder="Enter your phone number"
                  required
                />

              </div>


              {/* Address */}

              <div className="form-group">

                <label>
                  Full Address
                </label>

                <textarea
                  placeholder="House number, street, area..."
                  rows="4"
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
                    placeholder="City"
                    required
                  />

                </div>


                <div className="form-group">

                  <label>
                    State
                  </label>

                  <input
                    type="text"
                    placeholder="State"
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
                  placeholder="6-digit pincode"
                  maxLength="6"
                  required
                />

              </div>


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
              >
                Place Order
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

              {checkoutItems.map((item) => (

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
                      item.price * item.qty
                    ).toLocaleString("en-IN")}
                  </strong>

                </div>

              ))}

            </div>


            {/* Price breakdown */}

            <div className="summary-prices">


              <div>

                <span>
                  Subtotal
                </span>

                <strong>
                  ₹{" "}
                  {subtotal.toLocaleString("en-IN")}
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
                  {tax.toLocaleString("en-IN")}
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
                {total.toLocaleString("en-IN")}
              </strong>

            </div>


            {/* Place order */}

            <button
              className="place-order"
              onClick={handlePlaceOrder}
              disabled={
                checkoutItems.length === 0
              }
            >

              {checkoutItems.length === 0
                ? "Cart is Empty"
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