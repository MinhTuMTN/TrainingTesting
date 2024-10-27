package com.example.Demo.service;

import com.example.Demo.dto.request.AccountRegister;
import com.example.Demo.dto.request.LoginRequest;
import com.example.Demo.dto.request.UpdateAccountRequest;
import com.example.Demo.dto.response.AccountResponse;
import com.example.Demo.dto.response.AuthResponse;

public interface AccountService {
    AuthResponse registerAccount(AccountRegister request);
    AuthResponse loginAccount(LoginRequest request);
    AccountResponse updateAccount(String authorization, UpdateAccountRequest request);
    AccountResponse getAccount(String authorization);
}
