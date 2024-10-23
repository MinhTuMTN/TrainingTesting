package com.example.Demo.service;

import com.example.Demo.dto.request.AccountRegister;
import com.example.Demo.dto.request.LoginRequest;
import com.example.Demo.dto.request.UpdateAccountRequest;
import com.example.Demo.entity.Account;

public interface AccountService {
    Account registerAccount(AccountRegister request);
    String loginAccount(LoginRequest request);
    Account updateAccount(String authorization, UpdateAccountRequest request);
}
