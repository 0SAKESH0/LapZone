import "./Hero.css";
import homeImage from "../../assets/images/home.png";
import { Link } from "react-router-dom";
import { useRef } from "react";

function Hero() {

  const heroRef = useRef(null);
  const imageRef = useRef(null);

  const handleMouseMove = (e) => {

    const hero = heroRef.current;
    const img = imageRef.current;

    const rect = hero.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    hero.style.setProperty("--x", `${x}px`);
    hero.style.setProperty("--y", `${y}px`);

    const rotateY = ((x / rect.width) - 0.5) * 18;
    const rotateX = ((y / rect.height) - 0.5) * -18;

    img.style.transform = `
      perspective(1200px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-12px)
    `;

  };

  const handleMouseLeave = () => {

    imageRef.current.style.transform = `
      perspective(1200px)
      rotateX(0deg)
      rotateY(0deg)
      translateY(0)
    `;

  };

  return (

    <section
      className="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >

      <div className="spotlight"></div>

      <div className="particles">

        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>

      </div>

      <div className="hero-content">

        <h1>Find Your Perfect Laptop</h1>

        <p>
          Shop the latest laptops from Apple,
          Dell, HP, ASUS, Lenovo,
          Acer and MSI.
        </p>

        <Link
          to="/products"
          className="shop-btn"
        >
          Shop Now
        </Link>

      </div>

      <div className="hero-image">

        <img
          ref={imageRef}
          src={homeImage}
          alt="Laptop"
        />

      </div>

    </section>

  );

}

export default Hero;