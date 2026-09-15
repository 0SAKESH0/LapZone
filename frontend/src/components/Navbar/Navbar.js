import "./Navbar.css";

import { Link, useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);


  // ==========================================
  // CART COUNT
  // ==========================================

  const cartCount = cart.reduce(
    (sum, item) => sum + item.qty,
    0
  );


  // ==========================================
  // LOGIN STATUS
  // ==========================================

  const token = localStorage.getItem("token");

  const storedUser = localStorage.getItem("user");

  let user = null;

  try {

    user = storedUser
      ? JSON.parse(storedUser)
      : null;

  } catch (error) {

    user = null;

  }


  // ==========================================
  // ADMIN CHECK
  // ==========================================

  const isAdmin =
    Boolean(token) &&
    user &&
    String(user.role).toLowerCase() === "admin";


  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setProfileOpen(false);
    setMenuOpen(false);

    navigate("/login");

  };


  // ==========================================
  // CLOSE MOBILE MENU
  // ==========================================

  const closeMenu = () => {

    setMenuOpen(false);

  };


  return (

    <nav className="navbar">


      {/* ======================================
          LOGO
      ====================================== */}

      <Link
        to="/"
        className="navbar-logo"
        onClick={closeMenu}
      >

        <FaLaptop />

        <span>
          LapZone
        </span>

      </Link>


      {/* ======================================
          NAVIGATION
      ====================================== */}

      <div
        className={`navbar-links ${
          menuOpen ? "active" : ""
        }`}
      >


        {/* ====================================
            HOME
        ==================================== */}

        <Link
          to="/"
          onClick={closeMenu}
        >
          Home
        </Link>


        {/* ====================================
            PRODUCTS
        ==================================== */}

        <Link
          to="/products"
          onClick={closeMenu}
        >
          Products
        </Link>


        {/* ====================================
            WISHLIST
        ==================================== */}

        <Link
          to="/wishlist"
          className="nav-icon"
          aria-label={`Wishlist: ${wishlist.length} item${
            wishlist.length === 1 ? "" : "s"
          }`}
          onClick={closeMenu}
        >

          <FaRegHeart />

<span className="mobile-nav-label">
  Wishlist
</span>

{wishlist.length > 0 && (

            <span className="nav-badge">
              {wishlist.length}
            </span>

          )}

        </Link>


        {/* ====================================
            CART
        ==================================== */}

        <Link
          to="/cart"
          className="nav-icon"
          aria-label={`Cart: ${cartCount} item${
            cartCount === 1 ? "" : "s"
          }`}
          onClick={closeMenu}
        >

          <FaShoppingCart />

<span className="mobile-nav-label">
  Cart
</span>

{cartCount > 0 && (

            <span className="nav-badge">
              {cartCount}
            </span>

          )}

        </Link>


        {/* ====================================
            PROFILE
        ==================================== */}

        <div className="profile-menu">


          {/* USER ICON */}

          <button
            className="profile-icon-btn"
            onClick={() =>
              setProfileOpen(!profileOpen)
            }
            aria-label="Account menu"
          >

            <FaUserCircle />

<span className="mobile-nav-label">
  Account
</span>

          </button>


          {/* ==================================
              PROFILE DROPDOWN
          ================================== */}

          {profileOpen && (

            <div className="profile-dropdown">


              {token ? (

                <>


                  {/* ==================================
                      MY PROFILE
                  ================================== */}

                  <Link
                    to="/profile"
                    onClick={() => {

                      setProfileOpen(false);
                      closeMenu();

                    }}
                  >
                    My Profile
                  </Link>


                  {/* ==================================
                      MY ORDERS
                  ================================== */}

                  <Link
                    to="/my-orders"
                    onClick={() => {

                      setProfileOpen(false);
                      closeMenu();

                    }}
                  >
                    My Orders
                  </Link>


                  {/* ==================================
                      ADMIN DASHBOARD
                  ================================== */}

                  {isAdmin && (

                    <Link
                      to="/admin"
                      onClick={() => {

                        setProfileOpen(false);
                        closeMenu();

                      }}
                    >
                      Admin Dashboard
                    </Link>

                  )}


                  {/* ==================================
                      LOGOUT
                  ================================== */}

                  <button
                    className="logout-btn"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>


                </>

              ) : (


                /* ==================================
                   NOT LOGGED IN
                ================================== */

                <Link
                  to="/login"
                  onClick={() => {

                    setProfileOpen(false);
                    closeMenu();

                  }}
                >
                  Login
                </Link>

              )}

            </div>

          )}

        </div>


      </div>


      {/* ======================================
          MOBILE MENU
      ====================================== */}

      <button
        className="menu-btn"
        onClick={() => {

          setMenuOpen(!menuOpen);
          setProfileOpen(false);

        }}
        aria-label="Toggle menu"
      >

        {menuOpen
          ? <FaTimes />
          : <FaBars />
        }

      </button>


    </nav>

  );

}


export default Navbar;