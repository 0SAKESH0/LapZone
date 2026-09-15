import "./ProductCard.css";
import "./PremiumProductCard.css";

import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import {
  FaShoppingCart,
  FaStar,
  FaHeart,
} from "react-icons/fa";


import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";

function ProductCard({ product, isProductPage }) {
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);

  const {
    addToWishlist,
    isInWishlist,
  } = useContext(WishlistContext);

  const [checkingServer, setCheckingServer] = useState(false);

  const isWishlisted = isInWishlist(product.id);

  // ==========================================
  // CHECK SERVER + STOCK
  // ==========================================

  const checkServerAndStock = async () => {
    const controller = new AbortController();

    // Don't wait forever if Render/server is unavailable
    const timeout = setTimeout(() => {
      controller.abort();
    }, 10000);

    try {
      const response = await fetch(
        "https://lapzone-hq43.onrender.com/api/products",
        {
          signal: controller.signal,
        }
      );

      if (!response.ok) {
        throw new Error("Server unavailable");
      }

      const backendProducts = await response.json();

      const backendProduct = backendProducts.find(
        (item) =>
          Number(item.id) === Number(product.id)
      );

      if (!backendProduct) {
        throw new Error("Product not found");
      }

      const stock = Number(
        backendProduct.stock || 0
      );

      return {
        success: true,
        stock,
      };

    } catch (error) {
      console.error(
        "Server check failed:",
        error
      );

      return {
        success: false,
        stock: 0,
      };

    } finally {
      clearTimeout(timeout);
    }
  };

  // ==========================================
  // ADD TO CART
  // ==========================================

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (checkingServer) {
      return;
    }

    setCheckingServer(true);

    const result =
      await checkServerAndStock();

    setCheckingServer(false);

    // Server unavailable
    if (!result.success) {
      alert(
        "Server is temporarily unavailable. Please try again later."
      );
      return;
    }

    // Out of stock
    if (result.stock <= 0) {
      alert("This product is currently out of stock.");
      return;
    }

    // Add latest stock to product
    addToCart({
      ...product,
      stock: result.stock,
    });
  };

  // ==========================================
  // BUY NOW
  // ==========================================

  const handleBuyNow = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (checkingServer) {
      return;
    }

    setCheckingServer(true);

    const result =
      await checkServerAndStock();

    setCheckingServer(false);

    // Server unavailable
    if (!result.success) {
      alert(
        "Server is temporarily unavailable. Please try again later."
      );
      return;
    }

    // Out of stock
    if (result.stock <= 0) {
      alert("This product is currently out of stock.");
      return;
    }

    navigate("/checkout", {
      state: {
        product: {
          ...product,
          stock: result.stock,
          qty: 1,
        },
      },
    });
  };

  // ==========================================
  // WISHLIST
  // ==========================================

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    addToWishlist(product);
  };

  // ==========================================
  // PRODUCT INFORMATION
  // ==========================================

  const ProductInfo = () => (
    <Link
      to={`/product/${product.id}`}
      className="product-link"
    >
      {product.discount && (
        <span className="discount">
          {product.discount}
        </span>
      )}

      <div className="image-box">
        <img
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="product-content">
        <span className="brand">
          {product.brand}
        </span>

        <h3>
          {product.name}
        </h3>

        <div className="rating">
          <FaStar />

          <span>
            {product.rating}
          </span>
        </div>

        <h2>
          ₹{" "}
          {Number(product.price).toLocaleString(
            "en-IN"
          )}
        </h2>
      </div>
    </Link>
  );

  // ==========================================
  // BUTTONS
  // ==========================================

  const Buttons = () => (
    <div className="buttons">

      {/* ADD TO CART */}

      <button
        type="button"
        className="cart-btn"
        onClick={handleAddToCart}
        disabled={checkingServer}
      >
        <FaShoppingCart />

        <span>
          {checkingServer
            ? "Checking..."
            : "Add to Cart"}
        </span>
      </button>


      {/* BUY NOW */}

     <button
  type="button"
  className="buy-now-btn"
  onClick={handleBuyNow}
  disabled={checkingServer}
>
  <span className="buy-now-text">
    {checkingServer
      ? "Checking..."
      : "Buy Now"}
  </span>

  <span className="buy-now-icon">
    <FaShoppingCart />
  </span>
</button>


      {/* WISHLIST */}

      <button
        type="button"
        className={`heart-btn ${
          isWishlisted ? "active" : ""
        }`}
        onClick={handleWishlist}
        aria-label={
          isWishlisted
            ? "Remove from wishlist"
            : "Add to wishlist"
        }
      >
        <FaHeart />
      </button>

    </div>
  );

  // ==========================================
  // RETURN
  // ==========================================

  return (
    <>
      {isProductPage ? (
        <div className="product-wrapper premium">

          <div className="outer">

            <div className="dot"></div>

            <div className="card">

              <div className="ray"></div>

              <ProductInfo />

              <Buttons />

              <div className="line topl"></div>

              <div className="line leftl"></div>

              <div className="line bottoml"></div>

              <div className="line rightl"></div>

            </div>

          </div>

        </div>
      ) : (
        <div className="product-wrapper">

          <div className="product-card">

            <ProductInfo />

            <Buttons />

          </div>

        </div>
      )}
    </>
  );
}

export default ProductCard;