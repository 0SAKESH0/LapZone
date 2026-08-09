import "./WhyChoose.css";

import { useEffect, useRef, useState } from "react";

import {
  FaTruck,
  FaShieldAlt,
  FaHeadset,
  FaCreditCard,
} from "react-icons/fa";

function WhyChoose() {

  const sectionRef = useRef(null);

  const [visible, setVisible] = useState(false);

  const features = [
    {
      icon: <FaTruck />,
      title: "Free Delivery",
      text: "Free shipping on all laptop orders.",
    },

    {
      icon: <FaShieldAlt />,
      title: "2 Years Warranty",
      text: "100% genuine products with warranty.",
    },

    {
      icon: <FaCreditCard />,
      title: "Secure Payment",
      text: "Safe payment using trusted gateways.",
    },

    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      text: "Customer support anytime you need.",
    },
  ];

  /* =========================================
     SCROLL REVEAL
  ========================================= */

  useEffect(() => {

    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {

        if (entry.isIntersecting) {

          setVisible(true);

          observer.unobserve(section);
        }

      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };

  }, []);

  return (

    <section
      ref={sectionRef}
      className={`why-choose ${
        visible ? "is-visible" : ""
      }`}
    >

      {/* Section Heading */}

      <h2>
        Why Choose LapZone?
      </h2>


      {/* Feature Cards */}

      <div className="feature-container">

        {features.map((item, index) => (

          <div
            className="feature-card"
            key={index}
            style={{
              "--delay": `${index * 0.12}s`,
            }}
          >

            {/* Icon */}

            <div className="feature-icon">
              {item.icon}
            </div>


            {/* Title */}

            <h3>
              {item.title}
            </h3>


            {/* Description */}

            <p>
              {item.text}
            </p>

          </div>

        ))}

      </div>

    </section>

  );
}

export default WhyChoose;