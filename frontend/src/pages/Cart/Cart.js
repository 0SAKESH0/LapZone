import "./Cart.css";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

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
      <Navbar />

      <div className="cart-page">

        <div className="cart-left">

          <h1>Shopping Cart</h1>

          {cart.length === 0 ? (

            <div className="empty-cart">

              <h2>Your Cart is Empty</h2>

              <p>Add your favourite laptop.</p>

            </div>

          ) : (

            cart.map((item) => (

              <div
                className="cart-card"
                key={item.id}
              >

                <img
                  src={item.image}
                  alt={item.name}
                />

                <div className="cart-info">

                  <h2>{item.name}</h2>

                  <p>{item.brand}</p>

                  <h3>

                    ₹ {item.price.toLocaleString()}

                  </h3>

                </div>

                <div className="qty-box">

                  <button
                    onClick={() =>
                      decreaseQty(item.id)
                    }
                  >
                    -
                  </button>

                  <span>{item.qty}</span>

                  <button
                    onClick={() =>
                      increaseQty(item.id)
                    }
                  >
                    +
                  </button>

                </div>

                <h2>

                  ₹ {(item.price * item.qty).toLocaleString()}

                </h2>

                <button
                  className="delete-btn"
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                >
                  <FaTrash />
                </button>

              </div>

            ))

          )}

        </div>

        <div className="summary">

          <h2>Order Summary</h2>

          <div>

            <span>Subtotal</span>

            <span>
              ₹ {subtotal.toLocaleString()}
            </span>

          </div>

          <div>

            <span>Shipping</span>

            <span>

              {shipping === 0
                ? "FREE"
                : `₹${shipping}`}

            </span>

          </div>

          <div>

            <span>GST (18%)</span>

            <span>
              ₹ {tax.toLocaleString()}
            </span>

          </div>

          <hr />

          <div className="grand-total">

            <span>Total</span>

            <span>
              ₹ {total.toLocaleString()}
            </span>

          </div>

          <Link
  to="/checkout"
  className="checkout-btn"
>
  Proceed to Checkout
</Link>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Cart;