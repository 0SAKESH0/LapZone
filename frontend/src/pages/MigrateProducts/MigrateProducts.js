import { useState } from "react";
import axios from "axios";

import products from "../../data/products";

function MigrateProducts() {

  const [status, setStatus] = useState("");

  const migrateProducts = async () => {

    try {

      setStatus("Migrating products...");

      const productsForBackend = products.map((product) => ({
        name: product.name,
        brand: product.brand,
        price: product.price,
        rating: product.rating,
        discount: product.discount,
        category: product.category,
        image: product.image,
        description: product.description,

        processor: product.specs.processor,
        ram: product.specs.ram,
        storage: product.specs.storage,
        display: product.specs.display,
        battery: product.specs.battery,
        warranty: product.specs.warranty,

        stock: 10
      }));

      const response = await axios.post(
        "http://localhost:8080/api/products/bulk",
        productsForBackend
      );

      console.log(response.data);

      setStatus(
        `${response.data.length} products migrated successfully!`
      );

    } catch (error) {

      console.error(error);

      setStatus(
  JSON.stringify(
    error.response?.data ||
    error.message
  )
);

    }
  };

  return (
    <div style={{
      padding: "50px",
      textAlign: "center"
    }}>

      <h1>LapZone Product Migration</h1>

      <p>
        This will send all 35 products to the Java backend.
      </p>

      <button onClick={migrateProducts}>
        Migrate 35 Products
      </button>

      <h2>{status}</h2>

    </div>
  );
}

export default MigrateProducts;