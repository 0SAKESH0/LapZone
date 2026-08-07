import "./ProductDetails.css";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
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
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, isInWishlist } = useContext(WishlistContext);

  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return <h1>Product Not Found</h1>;
  }

  return (
    <>
      <Navbar />

      <section className="details">

        <div className="image-section">

          <img
            src={product.image}
            alt={product.name}
          />

        </div>

        <div className="info-section">

          <h5>{product.brand}</h5>

          <h1>{product.name}</h1>

          <div className="rating">

            <FaStar />

            <span>{product.rating}</span>

          </div>

          <h2>

            ₹ {product.price.toLocaleString()}

          </h2>

          <p>{product.description}</p>

          <div className="buttons">

            <button className="buy">

              Buy Now

            </button>

           <button
className="cart"
onClick={()=>addToCart(product)}
>   

              <FaShoppingCart />

              Add To Cart

            </button>

            <button
              className="wish"
              onClick={() => addToWishlist(product)}
              aria-label={
                isInWishlist(product.id)
                  ? "Remove from wishlist"
                  : "Add to wishlist"
              }
            >
              {isInWishlist(product.id) ? <FaHeart /> : <FaRegHeart />}

            </button>

          </div>

          <div className="specs">

            <h3>Specifications</h3>

            <table>

              <tbody>

                <tr>
                  <td>Processor</td>
                  <td>{product.specs.processor}</td>
                </tr>

                <tr>
                  <td>RAM</td>
                  <td>{product.specs.ram}</td>
                </tr>

                <tr>
                  <td>Storage</td>
                  <td>{product.specs.storage}</td>
                </tr>

                <tr>
                  <td>Display</td>
                  <td>{product.specs.display}</td>
                </tr>

                <tr>
                  <td>Battery</td>
                  <td>{product.specs.battery}</td>
                </tr>

                <tr>
                  <td>Warranty</td>
                  <td>{product.specs.warranty}</td>
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
