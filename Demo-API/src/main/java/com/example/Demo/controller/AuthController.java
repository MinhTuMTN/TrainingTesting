package com.example.Demo.controller;

import com.example.Demo.dto.request.AccountRegister;
import com.example.Demo.dto.request.LoginRequest;
import com.example.Demo.dto.response.DemoResponse;
import com.example.Demo.service.AccountService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AccountService accountService;

    public AuthController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping("/register")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> registerAccount(
            @RequestBody AccountRegister request
    ) {
        return ResponseEntity.ok(DemoResponse.builder()
                .success(true)
                .message("Account registered successfully")
                .body(accountService.registerAccount(request))
                .build()
        );
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginAccount(
            @RequestBody LoginRequest request
    ) {
        return ResponseEntity.ok(DemoResponse.builder()
                .success(true)
                .message("Account logged in successfully")
                .body(accountService.loginAccount(request))
                .build()
        );
    }
}
