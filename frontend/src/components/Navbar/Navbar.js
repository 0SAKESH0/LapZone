import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";

import {
  FaShoppingCart,
  FaUserCircle,
  FaSearch,
  FaBars,
  FaTimes,
  FaLaptop,
  FaRegHeart,
} from "react-icons/fa";

function Navbar() {
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);

  const [menuOpen, setMenuOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <nav className="navbar">

      <Link to="/" className="logo">
        <FaLaptop />
        <span>LapZone</span>
      </Link>

      <div className={`nav-links ${menuOpen ? "active" : ""}`}>

        <Link to="/">Home</Link>

        <Link to="/products">Products</Link>

        <Link
  to="/wishlist"
  className="wishlist-icon"
  aria-label={`Wishlist: ${wishlist.length} item${wishlist.length === 1 ? "" : "s"}`}
>
  <FaRegHeart />

  {wishlist.length > 0 && (
    <span className="wishlist-badge">
      {wishlist.length}
    </span>
  )}
</Link>

        <Link to="/cart" className="cart-icon">

          <FaShoppingCart />

          {cartCount > 0 && (
            <span className="cart-badge">
              {cartCount}
            </span>
          )}

        </Link>

        <Link to="/login">
          <FaUserCircle />
        </Link>

      </div>

      <button
        className="menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

    </nav>
  );
}

export default Navbar;
