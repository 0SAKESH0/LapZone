package com.lapzone.controller;

import com.lapzone.entity.Order;
import com.lapzone.entity.User;
import com.lapzone.repository.OrderRepository;
import com.lapzone.repository.UserRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/admin/customers")
public class AdminCustomerController {

    private final UserRepository userRepository;
    private final OrderRepository orderRepository;

    public AdminCustomerController(
            UserRepository userRepository,
            OrderRepository orderRepository
    ) {
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
    }


    // ==========================================
    // GET ALL CUSTOMERS
    // ==========================================

    @GetMapping
    public ResponseEntity<List<CustomerResponse>> getAllCustomers() {

        List<User> users =
                userRepository.findByRoleOrderByCreatedAtDesc(
                        User.Role.user
                );

        List<CustomerResponse> customers =
                new ArrayList<>();

        for (User user : users) {

            int orderCount =
                    orderRepository
                            .findByUserIdOrderByCreatedAtDesc(
                                    user.getId()
                            )
                            .size();

            customers.add(
                    new CustomerResponse(
                            user.getId(),
                            user.getName(),
                            user.getEmail(),
                            user.getCreatedAt(),
                            orderCount
                    )
            );
        }

        return ResponseEntity.ok(customers);
    }


    // ==========================================
    // GET CUSTOMER DETAILS
    // ==========================================

    @GetMapping("/{customerId}")
    public ResponseEntity<?> getCustomerDetails(
            @PathVariable Long customerId
    ) {

        User user =
                userRepository
                        .findById(customerId)
                        .orElse(null);

        if (user == null ||
                user.getRole() != User.Role.user) {

            return ResponseEntity
                    .notFound()
                    .build();
        }


        List<Order> orders =
                orderRepository
                        .findByUserIdOrderByCreatedAtDesc(
                                customerId
                        );


        // ======================================
        // CALCULATE TOTAL SPENT
        // ======================================

        double totalSpent = 0;


        for (Order order : orders) {

            if (order.getStatus() != null &&
                    !"CANCELLED".equalsIgnoreCase(
                            order.getStatus()
                    )) {

                totalSpent += order.getTotal();
            }
        }


        // ======================================
        // RETURN CUSTOMER DETAILS
        // ======================================

        return ResponseEntity.ok(
                new CustomerDetailsResponse(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getCreatedAt(),
                        orders.size(),
                        totalSpent,
                        orders
                )
        );
    }


    // ==========================================
    // CUSTOMER RESPONSE
    // ==========================================

    static class CustomerResponse {

        private Long id;
        private String name;
        private String email;
        private java.time.LocalDateTime createdAt;
        private int orderCount;


        public CustomerResponse(
                Long id,
                String name,
                String email,
                java.time.LocalDateTime createdAt,
                int orderCount
        ) {

            this.id = id;
            this.name = name;
            this.email = email;
            this.createdAt = createdAt;
            this.orderCount = orderCount;
        }


        public Long getId() {
            return id;
        }


        public String getName() {
            return name;
        }


        public String getEmail() {
            return email;
        }


        public java.time.LocalDateTime getCreatedAt() {
            return createdAt;
        }


        public int getOrderCount() {
            return orderCount;
        }
    }


    // ==========================================
    // CUSTOMER DETAILS RESPONSE
    // ==========================================

    static class CustomerDetailsResponse {

        private Long id;
        private String name;
        private String email;
        private java.time.LocalDateTime createdAt;
        private int orderCount;
        private double totalSpent;
        private List<Order> orders;


        public CustomerDetailsResponse(
                Long id,
                String name,
                String email,
                java.time.LocalDateTime createdAt,
                int orderCount,
                double totalSpent,
                List<Order> orders
        ) {

            this.id = id;
            this.name = name;
            this.email = email;
            this.createdAt = createdAt;
            this.orderCount = orderCount;
            this.totalSpent = totalSpent;
            this.orders = orders;
        }


        public Long getId() {
            return id;
        }


        public String getName() {
            return name;
        }


        public String getEmail() {
            return email;
        }


        public java.time.LocalDateTime getCreatedAt() {
            return createdAt;
        }


        public int getOrderCount() {
            return orderCount;
        }


        public double getTotalSpent() {
            return totalSpent;
        }


        public List<Order> getOrders() {
            return orders;
        }
    }
}