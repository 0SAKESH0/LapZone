import "./Products.css";
import { useMemo, useState } from "react";
import { FaChevronDown, FaChevronUp, FaSearch, FaSlidersH } from "react-icons/fa";

import products from "../../data/products";
import ProductCard from "../../components/ProductCard/ProductCard";

function Products() {
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [rating, setRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200000);
  const [sortBy, setSortBy] = useState("default");

  const [openSections, setOpenSections] = useState({
    brand: true,
    price: true,
    rating: true,
  });

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

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedBrand("All");
    setRating(0);
    setMaxPrice(200000);
    setSortBy("default");
  };

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        product.brand
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesBrand =
        selectedBrand === "All" ||
        product.brand === selectedBrand;

      const matchesRating =
        product.rating >= rating;

      const matchesPrice =
        product.price <= maxPrice;

      return (
        matchesSearch &&
        matchesBrand &&
        matchesRating &&
        matchesPrice
      );
    });

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (sortBy === "name") {
      result.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    return result;
  }, [
    search,
    selectedBrand,
    rating,
    maxPrice,
    sortBy,
  ]);

  return (

    
    <div className="products-page">

      {/* ==========================================
          FILTER SIDEBAR
      ========================================== */}

      <aside className="sidebar">

        <div className="sidebar-top">
          <div>
            <span className="filter-label">
              Refine
            </span>

            <h2>
              Filters
            </h2>
          </div>

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
            onClick={() => toggleSection("brand")}
          >
            <h3>Brand</h3>

            {openSections.brand ? (
              <FaChevronUp />
            ) : (
              <FaChevronDown />
            )}
          </div>

          {openSections.brand && (
            <div className="filter-body">

              {brands
                .filter((brand) => brand !== "All")
                .map((brand) => (
                  <label key={brand}>

                    <input
                      type="radio"
                      name="brand"
                      checked={
                        selectedBrand === brand
                      }
                      onChange={() =>
                        setSelectedBrand(brand)
                      }
                    />

                    <span>{brand}</span>

                  </label>
                ))}

            </div>
          )}

        </div>

        {/* Price */}

        <div className="filter-box">

          <div
            className="filter-header"
            onClick={() => toggleSection("price")}
          >
            <h3>Price</h3>

            {openSections.price ? (
              <FaChevronUp />
            ) : (
              <FaChevronDown />
            )}
          </div>

          {openSections.price && (
            <div className="filter-body">

              <input
                type="range"
                min="30000"
                max="200000"
                step="5000"
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(Number(e.target.value))
                }
              />

              <div className="price-range">
                <span>₹30K</span>

                <span>
                  ₹{maxPrice.toLocaleString("en-IN")}
                </span>
              </div>

            </div>
          )}

        </div>

        {/* Rating */}

        <div className="filter-box">

          <div
            className="filter-header"
            onClick={() => toggleSection("rating")}
          >
            <h3>Rating</h3>

            {openSections.rating ? (
              <FaChevronUp />
            ) : (
              <FaChevronDown />
            )}
          </div>

          {openSections.rating && (
            <div className="filter-body">

              {[4, 3, 2].map((value) => (
                <label key={value}>

                  <input
                    type="radio"
                    name="rating"
                    checked={rating === value}
                    onChange={() =>
                      setRating(value)
                    }
                  />

                  <span>
                    {value} ★ & Above
                  </span>

                </label>
              ))}

            </div>
          )}

        </div>

      </aside>


      {/* ==========================================
          MAIN PRODUCTS AREA
      ========================================== */}

      <main className="products-content">

        {/* Search */}

        <div className="products-search">

          <div className="search-box">

            <FaSearch />

            <input
              type="text"
              placeholder="Search laptops..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            <div className="search-glow"></div>

          </div>

        </div>


        {/* Header */}

        <div className="products-header">

          <div className="products-title">

            <span className="section-label">
              LAPZONE COLLECTION
            </span>

            <h1>
              Explore Laptops
            </h1>

            <p>
              Premium laptops from the world's
              leading brands.
            </p>

          </div>

          <div className="sort-section">

            <FaSlidersH />

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
            >
              <option value="default">
                Sort By
              </option>

              <option value="price-low">
                Price: Low to High
              </option>

              <option value="price-high">
                Price: High to Low
              </option>

              <option value="rating">
                Highest Rated
              </option>

              <option value="name">
                Name
              </option>
            </select>

          </div>

        </div>


        {/* Brand Pills */}

        <div className="brand-pills">

          {brands.map((brand) => (
            <button
              key={brand}
              className={
                selectedBrand === brand
                  ? "brand-pill active"
                  : "brand-pill"
              }
              onClick={() =>
                setSelectedBrand(brand)
              }
            >
              {brand}
            </button>
          ))}

        </div>


        {/* Results */}

        <div className="results-info">

          <span>
            Showing{" "}
            <strong>
              {filteredProducts.length}
            </strong>{" "}
            laptops
          </span>

          {selectedBrand !== "All" && (
            <span className="active-filter">
              {selectedBrand}
            </span>
          )}

        </div>


        {/* Product Grid */}

        {filteredProducts.length > 0 ? (

          <div className="products-grid">

            {filteredProducts.map((product) => (
              <div
                className="product-wrapper"
                key={product.id}
              >
                <ProductCard
                  product={product}
                />
              </div>
            ))}

          </div>

        ) : (

          <div className="no-products">

            <div className="no-products-icon">
              <FaSearch />
            </div>

            <h2>
              No laptops found
            </h2>

            <p>
              Try changing your search or
              filters.
            </p>

            <button
              onClick={clearFilters}
              className="reset-btn"
            >
              Reset Filters
            </button>

          </div>

        )}

      </main>

    </div>
  );
}

export default Products;