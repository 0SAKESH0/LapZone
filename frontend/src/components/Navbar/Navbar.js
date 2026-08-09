import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";

import {
  FaShoppingCart,
  FaUserCircle,
  FaBars,
  FaTimes,
  FaLaptop,
  FaRegHeart,
} from "react-icons/fa";

function Navbar() {
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);

  const [menuOpen, setMenuOpen] = useState(false);

  const cartCount = cart.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  return (
    <nav className="navbar">

      {/* Logo */}
      <Link to="/" className="navbar-logo">
        <FaLaptop />
        <span>LapZone</span>
      </Link>

      {/* Navigation */}
      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>

        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>

        <Link
          to="/products"
          onClick={() => setMenuOpen(false)}
        >
          Products
        </Link>

        {/* Wishlist */}
        <Link
          to="/wishlist"
          className="nav-icon"
          aria-label={`Wishlist: ${wishlist.length} item${
            wishlist.length === 1 ? "" : "s"
          }`}
          onClick={() => setMenuOpen(false)}
        >
          <FaRegHeart />

          {wishlist.length > 0 && (
            <span className="nav-badge">
              {wishlist.length}
            </span>
          )}
        </Link>

        {/* Cart */}
        <Link
          to="/cart"
          className="nav-icon"
          aria-label={`Cart: ${cartCount} item${
            cartCount === 1 ? "" : "s"
          }`}
          onClick={() => setMenuOpen(false)}
        >
          <FaShoppingCart />

          {cartCount > 0 && (
            <span className="nav-badge">
              {cartCount}
            </span>
          )}
        </Link>

        {/* Profile */}
        <Link
          to="/login"
          className="nav-icon"
          aria-label="Profile"
          onClick={() => setMenuOpen(false)}
        >
          <FaUserCircle />
        </Link>

      </div>

      {/* Mobile Menu */}
      <button
        className="menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

    </nav>
  );
}

export default Navbar;