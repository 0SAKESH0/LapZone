import "./Products.css";

import { useEffect, useMemo, useState } from "react";

import {
  FaChevronDown,
  FaChevronUp,
  FaSearch,
  FaSlidersH
} from "react-icons/fa";

import { getProducts } from "../../api/productApi";

import ProductCard from "../../components/ProductCard/ProductCard";


function Products() {

  // ==========================================
  // PRODUCTS FROM JAVA BACKEND
  // ==========================================

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // ==========================================
  // FILTER STATES
  // ==========================================

  const [search, setSearch] = useState("");

  const [selectedBrand, setSelectedBrand] =
    useState("All");

  const [rating, setRating] = useState(0);

  const [maxPrice, setMaxPrice] =
    useState(200000);

  const [sortBy, setSortBy] =
    useState("default");


  // ==========================================
  // FILTER SIDEBAR STATES
  // ==========================================

  const [openSections, setOpenSections] =
    useState({
      brand: true,
      price: true,
      rating: true,
    });


  // ==========================================
  // FETCH PRODUCTS FROM JAVA
  // ==========================================

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        setLoading(true);

        setError("");

        const response = await getProducts();

        console.log(
          "Products from Java:",
          response.data
        );


        // Convert Java product structure
        // into the structure used by ProductCard

        const formattedProducts =
          response.data.map((product) => ({

            id: product.id,

            name: product.name,

            brand: product.brand,

            price: product.price,

            rating: product.rating,

            discount: product.discount,

            category: product.category,

            image: product.image,

            description: product.description,


            // Convert flat Java fields
            // back into nested specs

            specs: {

              processor: product.processor,

              ram: product.ram,

              storage: product.storage,

              display: product.display,

              battery: product.battery,

              warranty: product.warranty,

            },

            stock: product.stock,

          }));


        setProducts(formattedProducts);

      } catch (error) {

        console.error(
          "Failed to fetch products:",
          error
        );

        setError(
          "Failed to load products. Please try again."
        );

      } finally {

        setLoading(false);

      }

    };


    fetchProducts();

  }, []);


  // ==========================================
  // BRANDS
  // ==========================================

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


  // ==========================================
  // TOGGLE FILTER SECTION
  // ==========================================

  const toggleSection = (section) => {

    setOpenSections((prev) => ({

      ...prev,

      [section]: !prev[section],

    }));

  };


  // ==========================================
  // CLEAR FILTERS
  // ==========================================

  const clearFilters = () => {

    setSearch("");

    setSelectedBrand("All");

    setRating(0);

    setMaxPrice(200000);

    setSortBy("default");

  };


  // ==========================================
  // FILTER + SORT PRODUCTS
  // ==========================================

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


    // Price: Low → High

    if (sortBy === "price-low") {

      result.sort(
        (a, b) => a.price - b.price
      );

    }


    // Price: High → Low

    if (sortBy === "price-high") {

      result.sort(
        (a, b) => b.price - a.price
      );

    }


    // Highest Rated

    if (sortBy === "rating") {

      result.sort(
        (a, b) => b.rating - a.rating
      );

    }


    // Name

    if (sortBy === "name") {

      result.sort(
        (a, b) =>
          a.name.localeCompare(b.name)
      );

    }


    return result;

  }, [
    products,
    search,
    selectedBrand,
    rating,
    maxPrice,
    sortBy,
  ]);


  // ==========================================
  // LOADING SCREEN
  // ==========================================

  if (loading) {

    return (

      <div className="products-page">

        <main className="products-content">

          <div className="no-products">

            <h2>
              Loading laptops...
            </h2>

            <p>
              Fetching products from LapZone server.
            </p>

          </div>

        </main>

      </div>

    );

  }


  // ==========================================
  // ERROR SCREEN
  // ==========================================

  if (error) {

    return (

      <div className="products-page">

        <main className="products-content">

          <div className="no-products">

            <div className="no-products-icon">
              <FaSearch />
            </div>

            <h2>
              Unable to load laptops
            </h2>

            <p>
              {error}
            </p>

            <button
              onClick={() =>
                window.location.reload()
              }
              className="reset-btn"
            >
              Try Again
            </button>

          </div>

        </main>

      </div>

    );

  }


  // ==========================================
  // MAIN PAGE
  // ==========================================

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


        {/* ==========================================
            BRAND
        ========================================== */}

        <div className="filter-box">

          <div
            className="filter-header"
            onClick={() =>
              toggleSection("brand")
            }
          >

            <h3>
              Brand
            </h3>


            {openSections.brand ? (

              <FaChevronUp />

            ) : (

              <FaChevronDown />

            )}

          </div>


          {openSections.brand && (

            <div className="filter-body">

              {brands
                .filter(
                  (brand) => brand !== "All"
                )
                .map((brand) => (

                  <label key={brand}>

                    <input
                      type="radio"
                      name="brand"
                      checked={
                        selectedBrand === brand
                      }
                      onChange={() =>
                        setSelectedBrand(
                          brand
                        )
                      }
                    />

                    <span>
                      {brand}
                    </span>

                  </label>

                ))}

            </div>

          )}

        </div>


        {/* ==========================================
            PRICE
        ========================================== */}

        <div className="filter-box">

          <div
            className="filter-header"
            onClick={() =>
              toggleSection("price")
            }
          >

            <h3>
              Price
            </h3>


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
                  setMaxPrice(
                    Number(e.target.value)
                  )
                }
              />


              <div className="price-range">

                <span>
                  ₹30K
                </span>


                <span>
                  ₹
                  {maxPrice.toLocaleString(
                    "en-IN"
                  )}
                </span>

              </div>

            </div>

          )}

        </div>


        {/* ==========================================
            RATING
        ========================================== */}

        <div className="filter-box">

          <div
            className="filter-header"
            onClick={() =>
              toggleSection("rating")
            }
          >

            <h3>
              Rating
            </h3>


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
                    checked={
                      rating === value
                    }
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


        {/* ==========================================
            SEARCH
        ========================================== */}

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


        {/* ==========================================
            HEADER
        ========================================== */}

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


        {/* ==========================================
            BRAND PILLS
        ========================================== */}

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


        {/* ==========================================
            RESULTS INFO
        ========================================== */}

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


        {/* ==========================================
            PRODUCT GRID
        ========================================== */}

        {filteredProducts.length > 0 ? (

          <div className="products-grid">

            {filteredProducts.map(
              (product) => (

                <div
                  className="product-wrapper"
                  key={product.id}
                >

                  <ProductCard
                    product={product}
                  />

                </div>

              )
            )}

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