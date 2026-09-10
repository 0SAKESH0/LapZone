package com.lapzone.controller;

import com.lapzone.service.AdminDashboardService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/dashboard")
public class AdminDashboardController {

    private final AdminDashboardService dashboardService;

    public AdminDashboardController(
            AdminDashboardService dashboardService
    ) {
        this.dashboardService = dashboardService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getDashboardStats() {

        return ResponseEntity.ok(
                dashboardService.getDashboardStats()
        );
    }
}