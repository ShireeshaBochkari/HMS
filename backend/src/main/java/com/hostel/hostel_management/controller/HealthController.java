package com.hostel.hostel_management.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping({"/health", "/api/healthz"})
    public Map<String, String> health() {
        return Map.of("status", "UP");
    }
}
