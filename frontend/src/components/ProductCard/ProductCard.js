import "./ProductCard.css";
import "./PremiumProductCard.css";

import { Link } from "react-router-dom";
import { useContext } from "react";

import {
  FaShoppingCart,
  FaStar,
  FaHeart,
} from "react-icons/fa";

import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";

function ProductCard({ product, isProductPage }) {
  const { addToCart } = useContext(CartContext);

  const {
    addToWishlist,
    isInWishlist,
  } = useContext(WishlistContext);

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToWishlist(product);
  };

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

      <h3>{product.name}</h3>

      <div className="rating">
        <FaStar />
        <span>{product.rating}</span>
      </div>

      <h2>
        ₹ {Number(product.price).toLocaleString("en-IN")}
      </h2>

    </div>

  </Link>
);

 const Buttons = () => (
  <div className="buttons">

    <button
      type="button"
      className="cart-btn"
      onClick={handleAddToCart}
    >
      <FaShoppingCart />
      <span>Add to Cart</span>
    </button>

    <button
      type="button"
      className={`heart-btn ${isWishlisted ? "active" : ""}`}
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