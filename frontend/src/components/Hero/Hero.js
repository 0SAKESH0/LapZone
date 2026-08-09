import "./Hero.css";
import homeImage from "../../assets/images/home.png";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">

      {/* Animated Wave Background */}
      <div className="wave">
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Background Particles */}
      <div className="particles">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Hero Content */}
      <div className="hero-content">

        <div className="hero-badge">
          <span>✦</span>
          Premium Laptops
        </div>

        <h1>
          Find Your
          <span>Perfect Laptop</span>
        </h1>

        <p>
          Shop the latest laptops from Apple, Dell, HP, ASUS,
          Lenovo, Acer, MSI and more at the best prices.
        </p>

        <Link to="/products" className="shop-btn">
          <span className="button-text">Shop Now</span>
          <span className="button-arrow">→</span>
        </Link>

        {/* Hero Stats */}
        <div className="hero-stats">

          <div className="stat">
            <strong>500+</strong>
            <span>Laptops</span>
          </div>

          <div className="stat">
            <strong>7</strong>
            <span>Top Brands</span>
          </div>

          <div className="stat">
            <strong>2 Year</strong>
            <span>Warranty</span>
          </div>

        </div>

      </div>

      {/* Laptop */}
      <div className="hero-image">

        <div className="laptop-glow"></div>

        <img
          src={homeImage}
          alt="Laptop"
        />

      </div>

    </section>
  );
}

export default Hero;