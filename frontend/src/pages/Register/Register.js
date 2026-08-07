import "./Register.css";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaLaptop } from "react-icons/fa";

import { registerUser } from "../../api/authApi";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await registerUser(formData);

      alert("Registration Successful");

      navigate("/login");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="register-container">

      <div className="blob blob1"></div>
      <div className="blob blob2"></div>
      <div className="blob blob3"></div>

      <form
        className="register-card"
        onSubmit={handleSubmit}
      >

        <div className="register-logo">
          <FaLaptop />
        </div>

        <h1>Create Account</h1>

        <p className="subtitle">
          Join LapZone Today
        </p>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

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

        <button type="submit">
          {loading ? "Creating..." : "Create Account"}
        </button>

        <p>
          Already have an account?

          <Link to="/login">
            Login
          </Link>

        </p>

      </form>

    </div>

  );

}

export default Register;