import "./ProductDetails.css";

import { useParams, useNavigate } from "react-router-dom";

import Footer from "../../components/Footer/Footer";

import products from "../../data/products";

import { useContext } from "react";

import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";

import {
  FaStar,
  FaShoppingCart,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";


function ProductDetails() {

  const { addToCart } =
    useContext(CartContext);

  const {
    addToWishlist,
    isInWishlist,
  } = useContext(WishlistContext);

  const { id } = useParams();

  const navigate = useNavigate();


  const product = products.find(
    (item) => item.id === Number(id)
  );


  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product Not Found</h2>
      </div>
    );
  }


  // ==========================================
  // BUY NOW
  // Directly go to checkout
  // ==========================================

  const handleBuyNow = () => {

    navigate("/checkout", {
      state: {
        product: {
          ...product,
          qty: 1,
        },
      },
    });

  };


  // ==========================================
  // ADD TO CART
  // ==========================================

  const handleAddToCart = () => {

    addToCart(product);

  };


  return (
    <>

      


      <section className="details">

        {/* ==================================
            PRODUCT IMAGE
        ================================== */}

        <div className="image-section">

          <div className="image-glow"></div>

          <img
            src={product.image}
            alt={product.name}
          />

        </div>


        {/* ==================================
            PRODUCT INFORMATION
        ================================== */}

        <div className="info-section">

          <h5>
            {product.brand}
          </h5>


          <h1>
            {product.name}
          </h1>


          {/* Rating */}

          <div className="rating">

            <FaStar />

            <span>
              {product.rating}
            </span>

          </div>


          {/* Price */}

          <h2>
            ₹ {product.price.toLocaleString("en-IN")}
          </h2>


          {/* Description */}

          <p>
            {product.description}
          </p>


          {/* ==================================
              BUTTONS
          ================================== */}

          <div className="buttons">


            {/* BUY NOW */}

            <button
              className="buy"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>


            {/* ADD TO CART */}

            <button
              className="cart"
              onClick={handleAddToCart}
            >

              <FaShoppingCart />

              Add To Cart

            </button>


            {/* WISHLIST */}

            <button
              className="wish"
              onClick={() =>
                addToWishlist(product)
              }
              aria-label={
                isInWishlist(product.id)
                  ? "Remove from wishlist"
                  : "Add to wishlist"
              }
            >

              {isInWishlist(product.id) ? (
                <FaHeart />
              ) : (
                <FaRegHeart />
              )}

            </button>

          </div>


          {/* ==================================
              SPECIFICATIONS
          ================================== */}

          <div className="specs">

            <h3>
              Specifications
            </h3>


            <table>

              <tbody>

                <tr>
                  <td>Processor</td>
                  <td>
                    {product.specs.processor}
                  </td>
                </tr>


                <tr>
                  <td>RAM</td>
                  <td>
                    {product.specs.ram}
                  </td>
                </tr>


                <tr>
                  <td>Storage</td>
                  <td>
                    {product.specs.storage}
                  </td>
                </tr>


                <tr>
                  <td>Display</td>
                  <td>
                    {product.specs.display}
                  </td>
                </tr>


                <tr>
                  <td>Battery</td>
                  <td>
                    {product.specs.battery}
                  </td>
                </tr>


                <tr>
                  <td>Warranty</td>
                  <td>
                    {product.specs.warranty}
                  </td>
                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </section>


      <Footer />

    </>
  );
}


export default ProductDetails;