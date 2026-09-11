import "./Home.css";

import { useEffect, useState } from "react";

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

  // ==========================================
  // BRANDS
  // ==========================================

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


  // ==========================================
  // FEATURED PRODUCTS
  // ==========================================

  const [featuredProducts, setFeaturedProducts] = useState([]);


  // ==========================================
  // GET STOCK FROM BACKEND
  // ==========================================

  useEffect(() => {

    fetch("https://lapzone-hq43.onrender.com/api/products")

      .then((response) => {

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        return response.json();

      })

      .then((backendProducts) => {

        const updatedProducts = products.map((localProduct) => {

          const backendProduct = backendProducts.find(
            (item) =>
              Number(item.id) === Number(localProduct.id)
          );


          return {
            ...localProduct,

            stock: backendProduct
              ? backendProduct.stock
              : 0,
          };

        });


        setFeaturedProducts(updatedProducts);

      })

      .catch((error) => {

        console.error(
          "Failed to load product stock:",
          error
        );

      });

  }, []);


  // ==========================================
  // RETURN
  // ==========================================

  return (
    <>

      {/* ======================================
          HERO
      ====================================== */}

      <Hero />


      {/* ======================================
          SHOP BY BRAND
      ====================================== */}

      <section className="brands">

        <h2>Shop By Brand</h2>

        <div className="brand-slider">

          <div className="brand-track">

            {[...brands, ...brands].map(
              (brand, index) => (

                <BrandCard
                  key={index}
                  name={brand.name}
                  logo={brand.logo}
                />

              )
            )}

          </div>

        </div>

      </section>


      {/* ======================================
          FEATURED LAPTOPS
      ====================================== */}

      <section className="featured">

        <h2>Featured Laptops</h2>

        <div className="product-container">

          {featuredProducts
            .slice(0, 4)
            .map((product) => (

              <ProductCard
                key={product.id}
                product={product}
              />

            ))}

        </div>

      </section>


      {/* ======================================
          OTHER HOME SECTIONS
      ====================================== */}

      <WhyChoose />

      <SpecialOffers />

      <CustomerReviews />

      <Newsletter />

      <Footer />

    </>
  );
}


export default Home;