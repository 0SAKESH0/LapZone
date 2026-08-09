import "./Sidebar.css";
import { useState } from "react";
import {
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";

function Sidebar({
  selectedBrand,
  setSelectedBrand,
  maxPrice,
  setMaxPrice,
}) {

  const [showBrand, setShowBrand] = useState(true);
  const [showPrice, setShowPrice] = useState(true);
  const [showRating, setShowRating] = useState(true);

  const brands = [
    "All",
    "Apple",
    "Dell",
    "HP",
    "Lenovo",
    "ASUS",
    "Acer",
    "MSI",
  ];

  function clearFilters() {
    setSelectedBrand("All");
    setMaxPrice(200000);
  }

  return (

    <aside className="sidebar">

      <div className="sidebar-top">

        <h2>Filters</h2>

        <button
          className="clear-btn"
          onClick={clearFilters}
        >
          Clear
        </button>

      </div>

      {/* Brand */}

      <div className="filter-box">

        <div
          className="filter-header"
          onClick={() => setShowBrand(!showBrand)}
        >

          <h3>Brand</h3>

          {showBrand ? <FaChevronUp /> : <FaChevronDown />}

        </div>

        {showBrand && (

          <div className="filter-body">

            {brands.map((brand) => (

              <label key={brand}>

                <input
                  type="radio"
                  name="brand"
                  value={brand}
                  checked={selectedBrand === brand}
                  onChange={(e) =>
                    setSelectedBrand(e.target.value)
                  }
                />

                {brand}

              </label>

            ))}

          </div>

        )}

      </div>

      {/* Price */}

      <div className="filter-box">

        <div
          className="filter-header"
          onClick={() => setShowPrice(!showPrice)}
        >

          <h3>Price</h3>

          {showPrice ? <FaChevronUp /> : <FaChevronDown />}

        </div>

        {showPrice && (

          <div className="filter-body">

            <input
              type="range"
              min="50000"
              max="200000"
              step="5000"
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(Number(e.target.value))
              }
            />

            <p className="price-text">

              Up to ₹{maxPrice.toLocaleString()}

            </p>

          </div>

        )}

      </div>

      {/* Rating */}

      <div className="filter-box">

        <div
          className="filter-header"
          onClick={() => setShowRating(!showRating)}
        >

          <h3>Rating</h3>

          {showRating ? <FaChevronUp /> : <FaChevronDown />}

        </div>

        {showRating && (

          <div className="filter-body">

            <label>
              <input type="radio" name="rating" />
              4 ★ & Above
            </label>

            <label>
              <input type="radio" name="rating" />
              3 ★ & Above
            </label>

            <label>
              <input type="radio" name="rating" />
              2 ★ & Above
            </label>

          </div>

        )}

      </div>

    </aside>

  );
}

export default Sidebar;