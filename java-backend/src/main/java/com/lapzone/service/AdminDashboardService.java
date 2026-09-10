package com.lapzone.service;

import com.lapzone.entity.Order;
import com.lapzone.entity.Product;
import com.lapzone.entity.User;
import com.lapzone.repository.OrderRepository;
import com.lapzone.repository.ProductRepository;
import com.lapzone.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminDashboardService {

    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    public AdminDashboardService(
            ProductRepository productRepository,
            OrderRepository orderRepository,
            UserRepository userRepository
    ) {
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }

    public Map<String, Object> getDashboardStats() {

        // ==========================================
        // TOTAL PRODUCTS
        // ==========================================

        long totalProducts =
                productRepository.count();


        // ==========================================
        // ALL ORDERS
        // ==========================================

        List<Order> orders =
                orderRepository.findAll();

        long totalOrders =
                orders.size();


        // ==========================================
        // TOTAL CUSTOMERS
        // ==========================================

        long totalCustomers =
                userRepository.countByRole(
                        User.Role.user
                );


        // ==========================================
        // ORDER STATISTICS
        // ==========================================

        double totalRevenue = 0;

        long placedOrders = 0;
        long confirmedOrders = 0;
        long shippedOrders = 0;
        long deliveredOrders = 0;
        long cancelledOrders = 0;


        for (Order order : orders) {

            String status =
                    order.getStatus();

            if (status == null) {
                continue;
            }


            switch (status.toUpperCase()) {

                case "PLACED":

                    placedOrders++;

                    break;


                case "CONFIRMED":

                    confirmedOrders++;

                    break;


                case "SHIPPED":

                    shippedOrders++;

                    break;


                case "DELIVERED":

                    deliveredOrders++;

                    totalRevenue +=
                            order.getTotal();

                    break;


                case "CANCELLED":

                    cancelledOrders++;

                    break;
            }
        }


        // ==========================================
        // LOW STOCK PRODUCTS
        // ==========================================

        List<Product> lowStockProducts =
                productRepository
                        .findByStockLessThanEqualOrderByStockAsc(5);


        // ==========================================
        // RECENT ORDERS
        // ==========================================

        List<Order> recentOrders =
                orderRepository
                        .findAllByOrderByCreatedAtDesc()
                        .stream()
                        .limit(5)
                        .toList();


        // ==========================================
        // DASHBOARD RESPONSE
        // ==========================================

        Map<String, Object> stats =
                new HashMap<>();


        stats.put(
                "totalProducts",
                totalProducts
        );


        stats.put(
                "totalOrders",
                totalOrders
        );


        stats.put(
                "totalCustomers",
                totalCustomers
        );


        stats.put(
                "totalRevenue",
                totalRevenue
        );


        stats.put(
                "placedOrders",
                placedOrders
        );


        stats.put(
                "confirmedOrders",
                confirmedOrders
        );


        stats.put(
                "shippedOrders",
                shippedOrders
        );


        stats.put(
                "deliveredOrders",
                deliveredOrders
        );


        stats.put(
                "cancelledOrders",
                cancelledOrders
        );


        stats.put(
                "lowStockProducts",
                lowStockProducts
        );


        stats.put(
                "recentOrders",
                recentOrders
        );


        return stats;
    }
}