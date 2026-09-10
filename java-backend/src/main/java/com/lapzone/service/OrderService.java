package com.lapzone.service;

import com.lapzone.dto.OrderRequest;
import com.lapzone.entity.Order;
import com.lapzone.entity.OrderItem;
import com.lapzone.entity.Product;
import com.lapzone.entity.User;
import com.lapzone.repository.OrderRepository;
import com.lapzone.repository.ProductRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    public OrderService(
            OrderRepository orderRepository,
            ProductRepository productRepository
    ) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    // ==========================================
    // CREATE ORDER
    // ==========================================

    @Transactional
    public Order createOrder(
            OrderRequest request,
            User user
    ) {

        // CHECK ALL PRODUCT STOCK FIRST
        if (request.getItems() != null) {

            for (
                    OrderRequest.OrderItemRequest itemRequest
                    : request.getItems()
            ) {

                Product product =
                        productRepository
                                .findByIdForUpdate(
                                        itemRequest.getProductId()
                                )
                                .orElseThrow(() ->
                                        new RuntimeException(
                                                "Product not found: "
                                                        + itemRequest.getProductId()
                                        )
                                );

                if (itemRequest.getQuantity() <= 0) {

                    throw new RuntimeException(
                            "Invalid quantity for product: "
                                    + product.getName()
                    );
                }

                if (
                        product.getStock()
                                < itemRequest.getQuantity()
                ) {

                    throw new RuntimeException(
                            "Not enough stock for "
                                    + product.getName()
                                    + ". Available stock: "
                                    + product.getStock()
                    );
                }
            }
        }


        // CREATE ORDER
        Order order = new Order();

        // CUSTOMER DETAILS
        order.setCustomerName(
                request.getCustomerName()
        );

        order.setEmail(
                request.getEmail()
        );

        order.setPhone(
                request.getPhone()
        );

        order.setAddress(
                request.getAddress()
        );

        order.setCity(
                request.getCity()
        );

        order.setState(
                request.getState()
        );

        order.setPincode(
                request.getPincode()
        );


        // ORDER TOTALS
        order.setSubtotal(
                request.getSubtotal()
        );

        order.setShipping(
                request.getShipping()
        );

        order.setTax(
                request.getTax()
        );

        order.setTotal(
                request.getTotal()
        );


        // ORDER STATUS
        order.setStatus("PLACED");


        // CONNECT ORDER TO LOGGED-IN USER
        order.setUser(user);


        // ADD ORDER ITEMS
        if (request.getItems() != null) {

            for (
                    OrderRequest.OrderItemRequest itemRequest
                    : request.getItems()
            ) {

                OrderItem item = new OrderItem();

                item.setProductId(
                        itemRequest.getProductId()
                );

                item.setProductName(
                        itemRequest.getProductName()
                );

                item.setBrand(
                        itemRequest.getBrand()
                );

                item.setPrice(
                        itemRequest.getPrice()
                );

                item.setQuantity(
                        itemRequest.getQuantity()
                );

                order.addItem(item);
            }
        }


        // REDUCE STOCK
        if (request.getItems() != null) {

            for (
                    OrderRequest.OrderItemRequest itemRequest
                    : request.getItems()
            ) {

                Product product =
                        productRepository
                                .findByIdForUpdate(
                                        itemRequest.getProductId()
                                )
                                .orElseThrow(() ->
                                        new RuntimeException(
                                                "Product not found"
                                        )
                                );

                int newStock =
                        product.getStock()
                                - itemRequest.getQuantity();

                product.setStock(newStock);

                productRepository.save(product);
            }
        }


        // SAVE ORDER
        return orderRepository.save(order);
    }


    // ==========================================
    // GET CUSTOMER ORDERS
    // ==========================================

    public List<Order> getOrdersByUser(
            Long userId
    ) {

        return orderRepository
                .findByUserIdOrderByCreatedAtDesc(userId);
    }


    // ==========================================
    // GET SINGLE ORDER
    // ==========================================

    public Order getOrderById(
            Long orderId,
            Long userId
    ) {

        Order order =
                orderRepository.findById(orderId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Order not found"
                                )
                        );

        if (
                order.getUser() == null ||
                        !order.getUser()
                                .getId()
                                .equals(userId)
        ) {

            throw new RuntimeException(
                    "You are not authorized to view this order"
            );
        }

        return order;
    }


    // ==========================================
    // GET ALL ORDERS - ADMIN
    // ==========================================

    public List<Order> getAllOrders() {

        return orderRepository
                .findAllByOrderByCreatedAtDesc();
    }


    // ==========================================
    // UPDATE ORDER STATUS - ADMIN
    // ==========================================

    public Order updateOrderStatus(
            Long orderId,
            String status
    ) {

        Order order =
                orderRepository.findById(orderId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Order not found"
                                )
                        );

        if (
                status == null ||
                        status.trim().isEmpty()
        ) {

            throw new RuntimeException(
                    "Status is required"
            );
        }

        String newStatus =
                status.trim().toUpperCase();

        if (
                !newStatus.equals("PLACED") &&
                        !newStatus.equals("CONFIRMED") &&
                        !newStatus.equals("SHIPPED") &&
                        !newStatus.equals("DELIVERED") &&
                        !newStatus.equals("CANCELLED")
        ) {

            throw new RuntimeException(
                    "Invalid order status"
            );
        }

        order.setStatus(newStatus);

        return orderRepository.save(order);
    }


    // ==========================================
    // CANCEL ORDER - CUSTOMER
    // ==========================================

    @Transactional
    public Order cancelOrder(
            Long orderId,
            Long userId
    ) {

        Order order =
                orderRepository.findById(orderId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Order not found"
                                )
                        );


        // CHECK ORDER OWNER
        if (
                order.getUser() == null ||
                        !order.getUser()
                                .getId()
                                .equals(userId)
        ) {

            throw new RuntimeException(
                    "You are not authorized to cancel this order"
            );
        }


        // CHECK CURRENT STATUS
        if (
                !order.getStatus().equals("PLACED") &&
                        !order.getStatus().equals("CONFIRMED")
        ) {

            throw new RuntimeException(
                    "This order cannot be cancelled"
            );
        }


        // ======================================
        // RESTORE PRODUCT STOCK
        // ======================================

        if (order.getItems() != null) {

            for (OrderItem item : order.getItems()) {

                Product product =
                        productRepository
                                .findById(
                                        item.getProductId()
                                )
                                .orElse(null);

                if (product != null) {

                    int restoredStock =
                            product.getStock()
                                    + item.getQuantity();

                    product.setStock(
                            restoredStock
                    );

                    productRepository.save(product);
                }
            }
        }


        // CHANGE ORDER STATUS
        order.setStatus("CANCELLED");


        // SAVE ORDER
        return orderRepository.save(order);
    }
}