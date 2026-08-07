import "./Checkout.css";

import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const { cart } = useContext(CartContext);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <>
      <Navbar />

      <section className="checkout-page">

        <div className="checkout-left">

          <h2>Shipping Address</h2>

          <form>

            <input
              type="text"
              placeholder="Full Name"
            />

            <input
              type="email"
              placeholder="Email"
            />

            <input
              type="text"
              placeholder="Phone Number"
            />

            <textarea
              placeholder="Full Address"
            ></textarea>

            <input
              type="text"
              placeholder="City"
            />

            <input
              type="text"
              placeholder="State"
            />

            <input
              type="text"
              placeholder="Pincode"
            />

          </form>

        </div>

        <div className="checkout-right">

          <h2>Order Summary</h2>

          {cart.map((item) => (

            <div
              className="summary-item"
              key={item.id}
            >

              <span>
                {item.name} × {item.qty}
              </span>

              <span>
                ₹ {(item.price * item.qty).toLocaleString()}
              </span>

            </div>

          ))}

          <hr />

          <div className="summary-total">

            <h3>Total</h3>

            <h3>
              ₹ {total.toLocaleString()}
            </h3>

          </div>

          <button
  className="place-order"
  onClick={() => navigate("/loading")}
>
  Place Order
</button>

        </div>  

      </section>

      <Footer />

    </>
  );
}

export default Checkout;