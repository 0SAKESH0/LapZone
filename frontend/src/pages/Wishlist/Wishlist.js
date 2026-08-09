import "./Wishlist.css";

import { useContext } from "react";
import { Link } from "react-router-dom";

import Footer from "../../components/Footer/Footer";

import { WishlistContext } from "../../context/WishlistContext";
import { CartContext } from "../../context/CartContext";

import {
  FaTrash,
  FaShoppingCart,
  FaHeart,
  FaStar,
} from "react-icons/fa";

function Wishlist() {
  const { wishlist, addToWishlist } =
    useContext(WishlistContext);

  const { addToCart } =
    useContext(CartContext);

  return (
    <>
      <div className="wishlist-page">

        {/* =================================
            WISHLIST HEADER
        ================================= */}

        <div className="wishlist-header">

          <h1>
            My Wishlist

            <span>
              <FaHeart />
            </span>
          </h1>

          <p>
            {wishlist.length > 0
              ? `${wishlist.length} ${
                  wishlist.length === 1
                    ? "laptop"
                    : "laptops"
                } saved for later`
              : "Save your favorite laptops for later"}
          </p>

        </div>


        {/* =================================
            EMPTY WISHLIST
        ================================= */}

        {wishlist.length === 0 ? (

          <div className="wishlist-empty">

            <div className="wishlist-empty-icon">
              <FaHeart />
            </div>

            <h2>
              Your wishlist is empty
            </h2>

            <p>
              Save laptops you love and come
              back to them anytime.
            </p>

            <Link
              to="/products"
              className="browse-products-btn"
            >
              Browse Products
            </Link>

          </div>

        ) : (

          /* =================================
             WISHLIST PRODUCTS
          ================================= */

          <div className="wishlist-grid">

            {wishlist.map((product) => (

              <div
                className="wishlist-card"
                key={product.id}
              >

                {/* Discount Badge */}

                {product.discount && (
                  <span className="wishlist-discount">
                    {product.discount}
                  </span>
                )}


                {/* Remove From Wishlist */}

                <button
                  className="wishlist-remove"
                  onClick={() =>
                    addToWishlist(product)
                  }
                  aria-label="Remove from wishlist"
                >
                  <FaTrash />
                </button>


                {/* Product Image */}

                <Link
                  to={`/product/${product.id}`}
                  className="wishlist-image"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                  />
                </Link>


                {/* Product Brand */}

                <div className="wishlist-brand">
                  {product.brand}
                </div>


                {/* Product Name */}

                <h2 className="wishlist-name">
                  {product.name}
                </h2>


                {/* Product Rating */}

                <div className="wishlist-rating">

                  <FaStar className="star" />

                  <span>
                    {product.rating || "4.8"}
                  </span>

                </div>


                {/* Product Price */}

                <div className="wishlist-price">
                  ₹{product.price.toLocaleString("en-IN")}
                </div>


                {/* Add To Cart */}

                <button
                  className="wishlist-cart"
                  onClick={() =>
                    addToCart(product)
                  }
                >
                  <FaShoppingCart />

                  <span>
                    Add to Cart
                  </span>
                </button>

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