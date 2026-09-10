package com.lapzone.controller;

import com.lapzone.dto.OrderRequest;
import com.lapzone.entity.Order;
import com.lapzone.entity.User;
import com.lapzone.service.OrderService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<?> createOrder(
            @RequestBody OrderRequest request
    ) {

        try {

            Authentication authentication =
                    SecurityContextHolder
                            .getContext()
                            .getAuthentication();

            if (
                    authentication == null ||
                            !(authentication.getPrincipal()
                                    instanceof User)
            ) {

                return ResponseEntity
                        .status(401)
                        .body(
                                "User is not authenticated"
                        );
            }

            User user =
                    (User) authentication.getPrincipal();

            Order order =
                    orderService.createOrder(
                            request,
                            user
                    );

            return ResponseEntity.ok(order);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .badRequest()
                    .body(
                            "Failed to create order: "
                                    + e.getMessage()
                    );
        }
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<?> getOrderById(
            @PathVariable Long orderId
    ) {

        try {

            Authentication authentication =
                    SecurityContextHolder
                            .getContext()
                            .getAuthentication();

            if (
                    authentication == null ||
                            !(authentication.getPrincipal()
                                    instanceof User)
            ) {

                return ResponseEntity
                        .status(401)
                        .body(
                                "User is not authenticated"
                        );
            }

            User user =
                    (User) authentication.getPrincipal();

            Order order =
                    orderService.getOrderById(
                            orderId,
                            user.getId()
                    );

            return ResponseEntity.ok(order);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(404)
                    .body(
                            "Order not found"
                    );
        }
    }

    @GetMapping("/my-orders")
    public ResponseEntity<?> getMyOrders() {

        try {

            Authentication authentication =
                    SecurityContextHolder
                            .getContext()
                            .getAuthentication();

            if (
                    authentication == null ||
                            !(authentication.getPrincipal()
                                    instanceof User)
            ) {

                return ResponseEntity
                        .status(401)
                        .body(
                                "User is not authenticated"
                        );
            }

            User user =
                    (User) authentication.getPrincipal();

            Long userId = user.getId();

            List<Order> orders =
                    orderService
                            .getOrdersByUser(userId);

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

    // CANCEL ORDER
    @PutMapping("/{orderId}/cancel")
    public ResponseEntity<?> cancelOrder(
            @PathVariable Long orderId
    ) {

        try {

            Authentication authentication =
                    SecurityContextHolder
                            .getContext()
                            .getAuthentication();

            if (
                    authentication == null ||
                            !(authentication.getPrincipal()
                                    instanceof User)
            ) {

                return ResponseEntity
                        .status(401)
                        .body(
                                "User is not authenticated"
                        );
            }

            User user =
                    (User) authentication.getPrincipal();

            Order cancelledOrder =
                    orderService.cancelOrder(
                            orderId,
                            user.getId()
                    );

            return ResponseEntity.ok(
                    cancelledOrder
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
                            "Failed to cancel order: "
                                    + e.getMessage()
                    );
        }
    }
}