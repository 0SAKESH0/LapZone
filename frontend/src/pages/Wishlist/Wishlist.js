import "./Wishlist.css";

import { useContext } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { WishlistContext } from "../../context/WishlistContext";
import { CartContext } from "../../context/CartContext";

import {
  FaTrash,
  FaShoppingCart,
} from "react-icons/fa";

function Wishlist() {

  const {
    wishlist,
    addToWishlist,
  } = useContext(WishlistContext);

  const { addToCart } =
    useContext(CartContext);

  return (
    <>
      <Navbar />

      <div className="wishlist-page">

        <h1>My Wishlist ❤️</h1>

        {wishlist.length === 0 ? (

          <div className="empty">

            <h2>Your wishlist is empty</h2>

            <Link to="/products">
              Browse Products
            </Link>

          </div>

        ) : (

          <div className="wishlist-grid">

            {wishlist.map((product) => (

              <div
                className="wishlist-card"
                key={product.id}
              >

                <img
                  src={product.image}
                  alt={product.name}
                />

                <h3>{product.name}</h3>

                <p>{product.brand}</p>

                <h2>
                  ₹ {product.price.toLocaleString()}
                </h2>

                <div className="wishlist-buttons">

                  <button
                    className="cart"
                    onClick={() =>
                      addToCart(product)
                    }
                  >
                    <FaShoppingCart />
                    Add to Cart
                  </button>

                  <button
                    className="remove"
                    onClick={() =>
                      addToWishlist(product)
                    }
                  >
                    <FaTrash />
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      <Footer />
    </>
  );
}

export default Wishlist;