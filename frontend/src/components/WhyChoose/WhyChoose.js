import "./WhyChoose.css";

import {
  FaTruck,
  FaShieldAlt,
  FaHeadset,
  FaCreditCard
} from "react-icons/fa";

function WhyChoose() {

  const features = [

    {
      icon: <FaTruck />,
      title: "Free Delivery",
      text: "Free shipping on all laptop orders."
    },

    {
      icon: <FaShieldAlt />,
      title: "2 Years Warranty",
      text: "100% genuine products with warranty."
    },

    {
      icon: <FaCreditCard />,
      title: "Secure Payment",
      text: "Safe payment using trusted gateways."
    },

    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      text: "Customer support anytime you need."
    }

  ];

  return (

    <section className="why-choose">

      <h2>Why Choose LapZone?</h2>

      <div className="feature-container">

        {features.map((item, index) => (

          <div className="feature-card" key={index}>

            <div className="feature-icon">

              {item.icon}

            </div>

            <h3>{item.title}</h3>

            <p>{item.text}</p>

          </div>

        ))}

      </div>

    </section>

  );

}

export default WhyChoose;