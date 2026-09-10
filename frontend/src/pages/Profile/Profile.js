import "./Profile.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaIdCard,
  FaShoppingBag,
  FaHeart,
  FaShoppingCart,
  FaCog,
  FaShieldAlt,
  FaArrowRight,
  FaSignOutAlt,
} from "react-icons/fa";

import { getProfile } from "../../api/authApi";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // FETCH PROFILE
  // ==========================================

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await getProfile(token);

        setUser(res.data);

        // Keep localStorage user information updated
        localStorage.setItem(
          "user",
          JSON.stringify(res.data)
        );
      } catch (error) {
        console.error("Failed to fetch profile:", error);

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="profile-loading-page">
        <div className="profile-loader"></div>
        <p>Loading your account...</p>
      </div>
    );
  }

  // ==========================================
  // NO USER
  // ==========================================

  if (!user) {
    return null;
  }

  const isAdmin =
    String(user.role).toLowerCase() === "admin";

  const avatarLetter =
    user.name?.charAt(0)?.toUpperCase() || "U";

  // ==========================================
  // PROFILE
  // ==========================================

  return (
    <div className="profile-page">

      {/* ======================================
          PAGE HEADER
      ====================================== */}

      <div className="profile-header">

        <div>
          <span className="profile-label">
            LAPZONE ACCOUNT
          </span>

          <h1>My Account</h1>

          <p>
            Manage your account and explore your
            LapZone activity.
          </p>
        </div>

      </div>


      {/* ======================================
          MAIN ACCOUNT AREA
      ====================================== */}

      <div className="profile-layout">

        {/* ====================================
            PROFILE CARD
        ==================================== */}

        <div className="profile-user-card">

          <div className="profile-avatar">
            {avatarLetter}
          </div>

          <div className="profile-user-info">

            <div className="profile-name-row">

              <h2>{user.name}</h2>

              <span
                className={`profile-role ${
                  isAdmin
                    ? "profile-role-admin"
                    : "profile-role-user"
                }`}
              >
                <FaShieldAlt />

                {isAdmin ? "ADMIN" : "USER"}
              </span>

            </div>

            <p className="profile-email">
              <FaEnvelope />

              {user.email}
            </p>

          </div>

        </div>


        {/* ====================================
            ACCOUNT INFORMATION
        ==================================== */}

        <div className="profile-details-card">

          <div className="profile-section-heading">

            <div>
              <span>ACCOUNT DETAILS</span>

              <h2>Personal Information</h2>
            </div>

          </div>


          <div className="profile-details-grid">

            {/* NAME */}

            <div className="profile-detail-item">

              <div className="profile-detail-icon">
                <FaUser />
              </div>

              <div>
                <span>Full Name</span>
                <strong>{user.name}</strong>
              </div>

            </div>


            {/* EMAIL */}

            <div className="profile-detail-item">

              <div className="profile-detail-icon">
                <FaEnvelope />
              </div>

              <div>
                <span>Email Address</span>
                <strong>{user.email}</strong>
              </div>

            </div>


            {/* USER ID */}

            <div className="profile-detail-item">

              <div className="profile-detail-icon">
                <FaIdCard />
              </div>

              <div>
                <span>Customer ID</span>

                <strong>
                  LZ{String(user.id).padStart(6, "0")}
                </strong>
              </div>

            </div>


            {/* ACCOUNT TYPE */}

            <div className="profile-detail-item">

              <div className="profile-detail-icon">
                <FaShieldAlt />
              </div>

              <div>
                <span>Account Type</span>

                <strong>
                  {isAdmin ? "Administrator" : "Customer"}
                </strong>
              </div>

            </div>

          </div>

        </div>


        {/* ====================================
            QUICK ACTIONS
        ==================================== */}

        <div className="profile-actions-card">

          <div className="profile-section-heading">

            <div>
              <span>QUICK ACCESS</span>

              <h2>What would you like to do?</h2>
            </div>

          </div>


          <div className="profile-actions-grid">

            {/* MY ORDERS */}

            <button
              className="profile-action"
              onClick={() => navigate("/my-orders")}
            >

              <div className="profile-action-icon">
                <FaShoppingBag />
              </div>

              <div className="profile-action-content">

                <strong>My Orders</strong>

                <span>
                  View and track your orders
                </span>

              </div>

              <FaArrowRight className="profile-action-arrow" />

            </button>


            {/* WISHLIST */}

            <button
              className="profile-action"
              onClick={() => navigate("/wishlist")}
            >

              <div className="profile-action-icon wishlist-icon">
                <FaHeart />
              </div>

              <div className="profile-action-content">

                <strong>Wishlist</strong>

                <span>
                  View your saved laptops
                </span>

              </div>

              <FaArrowRight className="profile-action-arrow" />

            </button>


            {/* CART */}

            <button
              className="profile-action"
              onClick={() => navigate("/cart")}
            >

              <div className="profile-action-icon cart-icon">
                <FaShoppingCart />
              </div>

              <div className="profile-action-content">

                <strong>Shopping Cart</strong>

                <span>
                  Continue your purchase
                </span>

              </div>

              <FaArrowRight className="profile-action-arrow" />

            </button>


            {/* HOME */}

            <button
              className="profile-action"
              onClick={() => navigate("/")}
            >

              <div className="profile-action-icon home-icon">
                <FaCog />
              </div>

              <div className="profile-action-content">

                <strong>Continue Shopping</strong>

                <span>
                  Explore the latest laptops
                </span>

              </div>

              <FaArrowRight className="profile-action-arrow" />

            </button>


            {/* ADMIN */}

            {isAdmin && (
              <button
                className="profile-action profile-admin-action"
                onClick={() => navigate("/admin")}
              >

                <div className="profile-action-icon admin-icon">
                  <FaShieldAlt />
                </div>

                <div className="profile-action-content">

                  <strong>Admin Dashboard</strong>

                  <span>
                    Manage LapZone
                  </span>

                </div>

                <FaArrowRight className="profile-action-arrow" />

              </button>
            )}

          </div>

        </div>


        {/* ====================================
            ACCOUNT STATUS
        ==================================== */}

        <div className="profile-bottom">

          <div className="profile-status">

            <span className="status-dot"></span>

            <div>
              <strong>Account Active</strong>

              <span>
                Your LapZone account is currently active.
              </span>
            </div>

          </div>


          <button
            className="profile-logout-btn"
            onClick={handleLogout}
          >
            <FaSignOutAlt />

            Logout
          </button>

        </div>

      </div>

    </div>
  );
}

export default Profile;