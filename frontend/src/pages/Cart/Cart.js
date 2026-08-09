import "./Cart.css";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";

import {
  FaTrash,
  FaShoppingCart,
  FaTruck,
  FaShieldAlt,
  FaArrowRight,
  FaLock,
} from "react-icons/fa";

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
  } = useContext(CartContext);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const shipping = subtotal > 50000 ? 0 : 499;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  return (
    <>
      <div className="cart-page">

        {/* =========================================
            ANIMATED HERO-STYLE BACKGROUND
        ========================================= */}

        <div className="cart-background">
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* =========================================
            MAIN CONTENT
        ========================================= */}

        <div className="cart-container">

          {/* LEFT SIDE */}

          <main className="cart-left">

            <div className="cart-heading">
              <span className="cart-label">
                LAPZONE CART
              </span>

              <h1>Shopping Cart</h1>

              <p>
                {cart.length === 0
                  ? "Your cart is waiting for something great."
                  : `${cart.reduce(
                      (total, item) => total + item.qty,
                      0
                    )} item${
                      cart.reduce(
                        (total, item) => total + item.qty,
                        0
                      ) !== 1
                        ? "s"
                        : ""
                    } in your cart`}
              </p>
            </div>

            {cart.length === 0 ? (

              /* =====================================
                 EMPTY CART
              ===================================== */

              <div className="empty-cart">

                <div className="empty-cart-icon">
                  <FaShoppingCart />
                </div>

                <h2>Your Cart is Empty</h2>

                <p>
                  Looks like you haven't added
                  anything to your cart yet.
                </p>

                <Link
                  to="/products"
                  className="browse-btn"
                >
                  Browse Laptops
                  <FaArrowRight />
                </Link>

                <div className="cart-benefits">

                  <span>
                    <FaTruck />
                    Fast Delivery
                  </span>

                  <span>
                    <FaShieldAlt />
                    Secure Shopping
                  </span>

                  <span>
                    <FaLock />
                    Safe Payments
                  </span>

                </div>

              </div>

            ) : (

              /* =====================================
                 CART ITEMS
              ===================================== */

              <div className="cart-items">

                {cart.map((item) => (

                  <div
                    className="cart-card"
                    key={item.id}
                  >

                    {/* Product Image */}

                    <Link
                      to={`/product/${item.id}`}
                      className="cart-image"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                      />
                    </Link>

                    {/* Product Information */}

                    <div className="cart-info">

                      <span className="cart-brand">
                        {item.brand}
                      </span>

                      <h2>{item.name}</h2>

                      <p className="unit-price">
                        ₹{item.price.toLocaleString("en-IN")}
                        {" "}per item
                      </p>

                      {/* Quantity */}

                      <div className="quantity-box">

                        <button
                          onClick={() =>
                            decreaseQty(item.id)
                          }
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>

                        <span>{item.qty}</span>

                        <button
                          onClick={() =>
                            increaseQty(item.id)
                          }
                          aria-label="Increase quantity"
                        >
                          +
                        </button>

                      </div>

                    </div>

                    {/* Item Total */}

                    <div className="item-total">

                      <span>ITEM TOTAL</span>

                      <strong>
                        ₹
                        {(
                          item.price * item.qty
                        ).toLocaleString("en-IN")}
                      </strong>

                    </div>

                    {/* Remove */}

                    <button
                      className="delete-btn"
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                      aria-label="Remove item"
                    >
                      <FaTrash />
                    </button>

                  </div>

                ))}

              </div>

            )}

          </main>

          {/* =========================================
              ORDER SUMMARY
          ========================================= */}

          <aside className="summary">

            <span className="summary-label">
              YOUR ORDER
            </span>

            <h2>Order Summary</h2>

            {subtotal > 50000 && (
              <div className="free-delivery">
                <FaTruck />
                <span>
                  You've unlocked{" "}
                  <strong>FREE delivery!</strong>
                </span>
              </div>
            )}

            <div className="summary-row">
              <span>Subtotal</span>

              <strong>
                ₹{subtotal.toLocaleString("en-IN")}
              </strong>
            </div>

            <div className="summary-row">
              <span>Shipping</span>

              <strong
                className={
                  shipping === 0
                    ? "free"
                    : ""
                }
              >
                {shipping === 0
                  ? "FREE"
                  : `₹${shipping.toLocaleString("en-IN")}`}
              </strong>
            </div>

            <div className="summary-row">
              <span>GST (18%)</span>

              <strong>
                ₹{tax.toLocaleString("en-IN")}
              </strong>
            </div>

            <div className="summary-divider"></div>

            <div className="total-row">
              <span>Total</span>

              <strong>
                ₹{total.toLocaleString("en-IN")}
              </strong>
            </div>

            {cart.length > 0 ? (

              <Link
                to="/checkout"
                className="checkout-btn"
              >
                <span>Proceed to Checkout</span>
                <FaArrowRight />
              </Link>

            ) : (

              <button
                className="checkout-btn disabled"
                disabled
              >
                Cart is Empty
              </button>

            )}

            <div className="summary-benefits">

              <div>
                <FaShieldAlt />
                <span>Secure checkout</span>
              </div>

              <div>
                <FaTruck />
                <span>Fast delivery</span>
              </div>

              <div>
                <FaLock />
                <span>Safe payments</span>
              </div>

            </div>

          </aside>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Cart;