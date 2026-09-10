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
    (total, item) => total + Number(item.price) * item.qty,
    0
  );

  const shipping = subtotal > 50000 ? 0 : 499;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  const totalItems = cart.reduce(
    (total, item) => total + item.qty,
    0
  );

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

          {/* =========================================
              LEFT SIDE
          ========================================= */}

          <main className="cart-left">

            <div className="cart-heading">

              <span className="cart-label">
                LAPZONE CART
              </span>

              <h1>Shopping Cart</h1>

              <p>
                {cart.length === 0
                  ? "Your cart is waiting for something great."
                  : `${totalItems} item${
                      totalItems !== 1 ? "s" : ""
                    } in your cart`}
              </p>

            </div>


            {/* =====================================
                EMPTY CART
            ===================================== */}

            {cart.length === 0 ? (

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

                {cart.map((item) => {

                  const stock = Number(item.stock || 0);

                  const isMaxQuantity =
                    item.qty >= stock;

                  return (

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
                          ₹
                          {Number(item.price).toLocaleString(
                            "en-IN"
                          )}
                          {" "}per item
                        </p>


                        {/* Quantity */}

                        <div className="quantity-box">

                          <button
                            type="button"
                            onClick={() =>
                              decreaseQty(item.id)
                            }
                            aria-label="Decrease quantity"
                            disabled={item.qty <= 1}
                          >
                            −
                          </button>

                          <span>{item.qty}</span>

                          <button
                            type="button"
                            onClick={() =>
                              increaseQty(item.id)
                            }
                            aria-label="Increase quantity"
                            disabled={isMaxQuantity}
                          >
                            +
                          </button>

                        </div>


                        {/* Stock Information */}

                        {stock > 0 && (
                          <p
                            className={`cart-stock ${
                              isMaxQuantity
                                ? "cart-stock-max"
                                : ""
                            }`}
                          >
                            {isMaxQuantity
                              ? `Maximum available: ${stock}`
                              : `${stock} available`}
                          </p>
                        )}

                        {stock <= 0 && (
                          <p className="cart-stock cart-stock-out">
                            Currently out of stock
                          </p>
                        )}

                      </div>


                      {/* Item Total */}

                      <div className="item-total">

                        <span>ITEM TOTAL</span>

                        <strong>
                          ₹
                          {(
                            Number(item.price) * item.qty
                          ).toLocaleString("en-IN")}
                        </strong>

                      </div>


                      {/* Remove */}

                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                        aria-label="Remove item"
                      >
                        <FaTrash />
                      </button>

                    </div>

                  );

                })}

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
                type="button"
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