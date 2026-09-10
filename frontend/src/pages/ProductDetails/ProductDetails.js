import "./ProductDetails.css";

import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Footer from "../../components/Footer/Footer";

import { getProductById } from "../../api/productApi";

import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";

import {
  FaStar,
  FaShoppingCart,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";


function ProductDetails() {

  const { id } = useParams();

  const navigate = useNavigate();


  // ==========================================
  // CONTEXT
  // ==========================================

  const { addToCart } =
    useContext(CartContext);

  const {
    addToWishlist,
    isInWishlist,
  } = useContext(WishlistContext);


  // ==========================================
  // PRODUCT STATE
  // ==========================================

  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // ==========================================
  // GET PRODUCT FROM JAVA BACKEND
  // ==========================================

  useEffect(() => {

    const fetchProduct = async () => {

      try {

        setLoading(true);

        setError("");

        const response =
          await getProductById(id);

        const data = response.data;


        // Convert Java product structure
        // into the structure used by this page

        const formattedProduct = {

          id: data.id,

          name: data.name,

          brand: data.brand,

          price: data.price,

          rating: data.rating,

          discount: data.discount,

          category: data.category,

          image: data.image,

          description: data.description,


          specs: {

            processor: data.processor,

            ram: data.ram,

            storage: data.storage,

            display: data.display,

            battery: data.battery,

            warranty: data.warranty,

          },

          stock: data.stock,

        };


        setProduct(formattedProduct);

      } catch (error) {

        console.error(
          "Failed to fetch product:",
          error
        );

        setError(
          "Product not found"
        );

      } finally {

        setLoading(false);

      }

    };


    fetchProduct();

  }, [id]);


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="product-not-found">

        <h2>
          Loading Product...
        </h2>

      </div>

    );

  }


  // ==========================================
  // PRODUCT NOT FOUND
  // ==========================================

  if (!product || error) {

    return (

      <div className="product-not-found">

        <h2>
          Product Not Found
        </h2>

      </div>

    );

  }


  // ==========================================
  // STOCK
  // ==========================================

  const stock = Number(product.stock || 0);

  const isOutOfStock = stock <= 0;

  const isLowStock =
    stock > 0 && stock <= 5;


  // ==========================================
  // BUY NOW
  // ==========================================

  const handleBuyNow = () => {

    if (isOutOfStock) {
      return;
    }

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

    if (isOutOfStock) {
      return;
    }

    addToCart(product);

  };


  // ==========================================
  // PAGE
  // ==========================================

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
            ₹{" "}
            {Number(product.price)
              .toLocaleString("en-IN")}
          </h2>


          {/* STOCK STATUS */}

          <div className="product-stock-status">

            {isOutOfStock ? (

              <span className="stock-out">
                Out of Stock
              </span>

            ) : isLowStock ? (

              <span className="stock-low">
                Only {stock} left in stock
              </span>

            ) : (

              <span className="stock-available">
                In Stock
              </span>

            )}

          </div>


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
              disabled={isOutOfStock}
            >
              {isOutOfStock
                ? "Out of Stock"
                : "Buy Now"}
            </button>


            {/* ADD TO CART */}

            <button
              className="cart"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
            >

              <FaShoppingCart />

              {isOutOfStock
                ? "Out of Stock"
                : "Add To Cart"}

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

                  <td>
                    Processor
                  </td>

                  <td>
                    {product.specs.processor}
                  </td>

                </tr>


                <tr>

                  <td>
                    RAM
                  </td>

                  <td>
                    {product.specs.ram}
                  </td>

                </tr>


                <tr>

                  <td>
                    Storage
                  </td>

                  <td>
                    {product.specs.storage}
                  </td>

                </tr>


                <tr>

                  <td>
                    Display
                  </td>

                  <td>
                    {product.specs.display}
                  </td>

                </tr>


                <tr>

                  <td>
                    Battery
                  </td>

                  <td>
                    {product.specs.battery}
                  </td>

                </tr>


                <tr>

                  <td>
                    Warranty
                  </td>

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