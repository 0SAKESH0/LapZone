import "./Products.css";
import { useState } from "react";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import SearchBar from "../../components/SearchBar/SearchBar";
import Sidebar from "../../components/Sidebar/Sidebar";
import ProductCard from "../../components/ProductCard/ProductCard";
import products from "../../data/products";

function Products() {
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [maxPrice, setMaxPrice] = useState(200000);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  let filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.brand.toLowerCase().includes(search.toLowerCase());

    const matchesBrand =
      selectedBrand === "All" || product.brand === selectedBrand;

    const matchesPrice = product.price <= maxPrice;

    return matchesSearch && matchesBrand && matchesPrice;
  });

  if (sort === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <>
      <Navbar />

      <SearchBar
    search={search}
    setSearch={setSearch}
/>


      <div className="sort-section">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      <section className="products-page">

        <Sidebar
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        />

        <div className="products-grid">

          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isProductPage={true}
              />
            ))
          ) : (
            <h2>No Products Found</h2>
          )}

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Products;