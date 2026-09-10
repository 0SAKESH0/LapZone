package com.lapzone.controller;

import com.lapzone.entity.Product;
import com.lapzone.repository.ProductRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // Get all products
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {

        return ResponseEntity.ok(
                productRepository.findAll()
        );
    }

    @PostMapping("/bulk")
    public ResponseEntity<?> createProducts(
            @RequestBody List<Product> products
    ) {

        try {

            List<Product> savedProducts =
                    productRepository.saveAll(products);

            return ResponseEntity.ok(savedProducts);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    // Get product by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(
            @PathVariable Long id
    ) {

        return productRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(
                        ResponseEntity.notFound().build()
                );
    }
}