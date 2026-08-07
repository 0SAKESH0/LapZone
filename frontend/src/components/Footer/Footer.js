import "./Footer.css";

import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub
} from "react-icons/fa";

function Footer() {
  return (

    <footer className="footer">

      <div className="footer-container">

        <div className="footer-box">

          <h2>LapZone</h2>

          <p>
            Your trusted destination for premium laptops,
            gaming machines and business notebooks.
          </p>

        </div>

        <div className="footer-box">

          <h3>Quick Links</h3>

          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/cart">Cart</a>
          <a href="/login">Login</a>

        </div>

        <div className="footer-box">

          <h3>Support</h3>

          <a href="/">Contact</a>
          <a href="/">Privacy Policy</a>
          <a href="/">Terms & Conditions</a>
          <a href="/">Help Center</a>

        </div>

        <div className="footer-box">

          <h3>Follow Us</h3>

          <div className="social-icons">

            <FaFacebook />
            <FaInstagram />
            <FaLinkedin />
            <FaGithub />

          </div>

        </div>

      </div>

      <hr />

      <p className="copyright">
        © 2026 LapZone. All Rights Reserved.
      </p>

    </footer>

  );
}

export default Footer;