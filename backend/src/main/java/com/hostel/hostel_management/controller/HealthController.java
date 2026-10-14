package com.hostel.hostel_management.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/")
    public String healthCheck() {
        return "Hostel Management System is running successfully!";
    }

    @GetMapping({"/health", "/api/healthz"})
    public String health() {
        return "OK";
    }
}
