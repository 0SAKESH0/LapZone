package com.lapzone.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "order_items")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // ==========================================
    // PRODUCT ID
    // ==========================================

    @Column(nullable = false)
    private Long productId;


    // ==========================================
    // PRODUCT NAME
    // ==========================================

    @Column(nullable = false)
    private String productName;


    // ==========================================
    // BRAND
    // ==========================================

    @Column(nullable = false)
    private String brand;


    // ==========================================
    // PRICE
    // ==========================================

    @Column(nullable = false)
    private double price;


    // ==========================================
    // QUANTITY
    // ==========================================

    @Column(nullable = false)
    private int quantity;


    // ==========================================
    // ITEM TOTAL
    // ==========================================

    @Column(nullable = false)
    private double itemTotal;


    // ==========================================
    // ORDER RELATIONSHIP
    // ==========================================

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    @JsonIgnore
    private Order order;


    // ==========================================
    // ID
    // ==========================================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    // ==========================================
    // PRODUCT ID
    // ==========================================

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }


    // ==========================================
    // PRODUCT NAME
    // ==========================================

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }


    // ==========================================
    // BRAND
    // ==========================================

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }


    // ==========================================
    // PRICE
    // ==========================================

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }


    // ==========================================
    // QUANTITY
    // ==========================================

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }


    // ==========================================
    // ITEM TOTAL
    // ==========================================

    public double getItemTotal() {
        return itemTotal;
    }

    public void setItemTotal(double itemTotal) {
        this.itemTotal = itemTotal;
    }


    // ==========================================
    // ORDER
    // ==========================================

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }
}