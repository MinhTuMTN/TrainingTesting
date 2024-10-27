package com.example.Demo.controller;

import com.example.Demo.dto.request.UpdateAccountRequest;
import com.example.Demo.service.AccountService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@PreAuthorize("hasRole('USER')")
@RequestMapping("/api/accounts")
public class AccountController {
    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PutMapping
    public ResponseEntity<?> updateAccount(
            @RequestHeader("Authorization") String authorization,
            @RequestBody UpdateAccountRequest request
        ) {
        return ResponseEntity.ok(accountService.updateAccount(authorization, request));
    }

    @GetMapping
    public ResponseEntity<?> getAccount(
            @RequestHeader("Authorization") String authorization
    ) {
        return ResponseEntity.ok(accountService.getAccount(authorization));
    }
}
