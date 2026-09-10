package com.lapzone.controller;

import com.lapzone.entity.Order;
import com.lapzone.service.OrderService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/orders")
public class AdminOrderController {

    private final OrderService orderService;

    public AdminOrderController(
            OrderService orderService
    ) {
        this.orderService = orderService;
    }


    // ==========================================
    // GET ALL ORDERS
    // ==========================================

    @GetMapping
    public ResponseEntity<?> getAllOrders() {

        try {

            List<Order> orders =
                    orderService.getAllOrders();

            return ResponseEntity.ok(orders);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .badRequest()
                    .body(
                            "Failed to fetch orders: "
                                    + e.getMessage()
                    );
        }
    }


    // ==========================================
    // UPDATE ORDER STATUS
    // ==========================================

    @PutMapping("/{orderId}/status")
    public ResponseEntity<?> updateOrderStatus(
            @PathVariable Long orderId,
            @RequestBody Map<String, String> request
    ) {

        try {

            String status =
                    request.get("status");


            if (
                    status == null ||
                            status.trim().isEmpty()
            ) {

                return ResponseEntity
                        .badRequest()
                        .body(
                                "Status is required"
                        );
            }


            Order updatedOrder =
                    orderService.updateOrderStatus(
                            orderId,
                            status
                    );


            return ResponseEntity.ok(
                    updatedOrder
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            e.getMessage()
                    );

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .badRequest()
                    .body(
                            "Failed to update order status: "
                                    + e.getMessage()
                    );
        }
    }
}