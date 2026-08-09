import "./Home.css";
import Hero from "../../components/Hero/Hero";
import BrandCard from "../../components/BrandCard/BrandCard";
import ProductCard from "../../components/ProductCard/ProductCard";
import WhyChoose from "../../components/WhyChoose/WhyChoose";
import SpecialOffers from "../../components/SpecialOffers/SpecialOffers";
import CustomerReviews from "../../components/CustomerReviews/CustomerReviews";
import Newsletter from "../../components/Newsletter/Newsletter";
import Footer from "../../components/Footer/Footer";

import products from "../../data/products"; 

function Home() {
  const brands = [
    {
      name: "Apple",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    },
    {
      name: "Dell",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg",
    },
    {
      name: "HP",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg",
    },
    {
      name: "Lenovo",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Lenovo_logo_2015.svg",
    },
    {
      name: "ASUS",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2e/ASUS_Logo.svg",
    },
    {
      name: "Acer",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Acer_2011.svg/960px-Acer_2011.svg.png?_=20241111050646",
    },
  ];  

  return (
    <>
     
      <Hero />

      {/* Shop By Brand */}

      <section className="brands">

        <h2>Shop By Brand</h2>

        <div className="brand-slider">

          <div className="brand-track">

            {[...brands, ...brands].map((brand, index) => (
              <BrandCard
                key={index}
                name={brand.name}
                logo={brand.logo}
              />
            ))}

          </div>

        </div>

      </section>

      {/* Featured Products */}

      <section className="featured">

        <h2>Featured Laptops</h2>

        <div className="product-container">

          {products.slice(0,4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              
            />
          ))}

        </div>

      </section>
      <WhyChoose />
      <SpecialOffers />
      <CustomerReviews />
      <Newsletter />
      <Footer />

    </>
  );
}

export default Home;