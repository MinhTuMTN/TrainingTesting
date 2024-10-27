package com.example.Demo.controller;

import com.example.Demo.dto.response.DemoResponse;
import com.example.Demo.service.ProvinceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/provinces")
public class ProvinceController {
    private final ProvinceService provinceService;

    public ProvinceController(ProvinceService provinceService) {
        this.provinceService = provinceService;
    }

    @GetMapping
    public ResponseEntity<?> getProvinces() {
        return ResponseEntity.ok(DemoResponse.builder()
                .success(true)
                .message("Get provinces successfully")
                .body(provinceService.getProvinces())
                .build()
                );
    }
}
