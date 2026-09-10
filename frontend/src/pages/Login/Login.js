import "./Login.css";

import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FaLaptop } from "react-icons/fa";

import { loginUser } from "../../api/authApi";


function Login() {

  const navigate = useNavigate();
  const location = useLocation();


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  const [loading, setLoading] = useState(false);


  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  // ==========================================
  // HANDLE LOGIN
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();


    try {

      setLoading(true);


      const res = await loginUser(formData);


      // ========================================
      // SAVE LOGIN DETAILS
      // ========================================

      localStorage.setItem(
        "token",
        res.data.token
      );


      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );


      alert("Login Successful");


      // ========================================
      // RETURN TO PREVIOUS PAGE
      // ========================================

      const redirectPath =
        location.state?.from || "/";


      navigate(redirectPath, {
        replace: true,
      });


    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // RETURN
  // ==========================================

  return (

    <div className="login-container">


      <div className="blob blob1"></div>

      <div className="blob blob2"></div>

      <div className="blob blob3"></div>


      <form
        className="login-card"
        onSubmit={handleSubmit}
      >


        <div className="login-logo">

          <FaLaptop />

        </div>


        <h1>
          Welcome Back
        </h1>


        <p className="subtitle">
          Login to your LapZone account
        </p>


        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />


        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />


        <button
          type="submit"
          disabled={loading}
        >

          {loading
            ? "Logging in..."
            : "Login"}

        </button>


        <p>

          Don't have an account?

          {" "}

          <Link to="/register">
            Register
          </Link>

        </p>


      </form>

    </div>

  );

}


export default Login;