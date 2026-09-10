package com.lapzone.controller;

import com.lapzone.entity.Product;
import com.lapzone.repository.ProductRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/products")
public class AdminProductController {

    private final ProductRepository productRepository;

    public AdminProductController(
            ProductRepository productRepository
    ) {
        this.productRepository = productRepository;
    }


    // Get all products for admin
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {

        return ResponseEntity.ok(
                productRepository.findAll()
        );
    }


    // Add new product
    @PostMapping
    public ResponseEntity<?> createProduct(
            @RequestBody Product product
    ) {

        try {

            Product savedProduct =
                    productRepository.save(product);

            return ResponseEntity.ok(savedProduct);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .badRequest()
                    .body(
                            "Failed to create product: "
                                    + e.getMessage()
                    );
        }
    }


    // Update existing product
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(
            @PathVariable Long id,
            @RequestBody Product product
    ) {

        try {

            Product existingProduct =
                    productRepository.findById(id)
                            .orElse(null);

            if (existingProduct == null) {

                return ResponseEntity
                        .notFound()
                        .build();
            }


            existingProduct.setName(
                    product.getName()
            );

            existingProduct.setBrand(
                    product.getBrand()
            );

            existingProduct.setPrice(
                    product.getPrice()
            );

            existingProduct.setRating(
                    product.getRating()
            );

            existingProduct.setDiscount(
                    product.getDiscount()
            );

            existingProduct.setCategory(
                    product.getCategory()
            );

            existingProduct.setImage(
                    product.getImage()
            );

            existingProduct.setDescription(
                    product.getDescription()
            );

            existingProduct.setProcessor(
                    product.getProcessor()
            );

            existingProduct.setRam(
                    product.getRam()
            );

            existingProduct.setStorage(
                    product.getStorage()
            );

            existingProduct.setDisplay(
                    product.getDisplay()
            );

            existingProduct.setBattery(
                    product.getBattery()
            );

            existingProduct.setWarranty(
                    product.getWarranty()
            );

            existingProduct.setStock(
                    product.getStock()
            );


            Product updatedProduct =
                    productRepository.save(
                            existingProduct
                    );

            return ResponseEntity.ok(
                    updatedProduct
            );

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .badRequest()
                    .body(
                            "Failed to update product: "
                                    + e.getMessage()
                    );
        }
    }


    // Delete product
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(
            @PathVariable Long id
    ) {

        try {

            if (!productRepository.existsById(id)) {

                return ResponseEntity
                        .notFound()
                        .build();
            }

            productRepository.deleteById(id);

            return ResponseEntity.ok(
                    "Product deleted successfully"
            );

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .badRequest()
                    .body(
                            "Failed to delete product: "
                                    + e.getMessage()
                    );
        }
    }
}