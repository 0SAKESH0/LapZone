package com.lapzone.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // ==========================================
    // CUSTOMER DETAILS
    // ==========================================

    @Column(nullable = false)
    private String customerName;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false, length = 1000)
    private String address;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String state;

    @Column(nullable = false)
    private String pincode;


    // ==========================================
    // ORDER TOTALS
    // ==========================================

    @Column(nullable = false)
    private double subtotal;

    @Column(nullable = false)
    private double shipping;

    @Column(nullable = false)
    private double tax;

    @Column(nullable = false)
    private double total;


    // ==========================================
    // ORDER STATUS
    // ==========================================

    @Column(nullable = false)
    private String status;


    // ==========================================
    // CREATED DATE
    // ==========================================

    private LocalDateTime createdAt;


    // ==========================================
    // USER RELATIONSHIP
    // ==========================================

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    @JsonIgnore
    private User user;


    // ==========================================
    // ORDER ITEMS
    // ==========================================

    @OneToMany(
            mappedBy = "order",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<OrderItem> items = new ArrayList<>();


    // ==========================================
    // CREATE DATE
    // ==========================================

    @PrePersist
    protected void onCreate() {

        createdAt = LocalDateTime.now();

        if (status == null) {
            status = "PLACED";
        }
    }


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
    // CUSTOMER NAME
    // ==========================================

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }


    // ==========================================
    // EMAIL
    // ==========================================

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    // ==========================================
    // PHONE
    // ==========================================

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }


    // ==========================================
    // ADDRESS
    // ==========================================

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }


    // ==========================================
    // CITY
    // ==========================================

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }


    // ==========================================
    // STATE
    // ==========================================

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }


    // ==========================================
    // PINCODE
    // ==========================================

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }


    // ==========================================
    // SUBTOTAL
    // ==========================================

    public double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(double subtotal) {
        this.subtotal = subtotal;
    }


    // ==========================================
    // SHIPPING
    // ==========================================

    public double getShipping() {
        return shipping;
    }

    public void setShipping(double shipping) {
        this.shipping = shipping;
    }


    // ==========================================
    // TAX
    // ==========================================

    public double getTax() {
        return tax;
    }

    public void setTax(double tax) {
        this.tax = tax;
    }


    // ==========================================
    // TOTAL
    // ==========================================

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }


    // ==========================================
    // STATUS
    // ==========================================

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }


    // ==========================================
    // CREATED AT
    // ==========================================

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }


    // ==========================================
    // USER
    // ==========================================

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }


    // ==========================================
    // ORDER ITEMS
    // ==========================================

    public List<OrderItem> getItems() {
        return items;
    }

    public void setItems(List<OrderItem> items) {
        this.items = items;
    }


    // ==========================================
    // ADD ITEM
    // ==========================================

    public void addItem(OrderItem item) {

        items.add(item);

        item.setOrder(this);
    }
}