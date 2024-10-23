package com.example.Demo.service.impl;

import com.example.Demo.constant.Role;
import com.example.Demo.dto.request.AccountRegister;
import com.example.Demo.dto.request.LoginRequest;
import com.example.Demo.dto.request.UpdateAccountRequest;
import com.example.Demo.entity.Account;
import com.example.Demo.repository.AccountRepository;
import com.example.Demo.security.CustomUserDetails;
import com.example.Demo.security.JwtTokenProvider;
import com.example.Demo.service.AccountService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class AccountServiceImpl implements AccountService {
    private final AccountRepository accountRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;

    public AccountServiceImpl(AccountRepository accountRepository, AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider, PasswordEncoder passwordEncoder) {
        this.accountRepository = accountRepository;
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Account registerAccount(AccountRegister request) {
        Optional<Account> accountOptional = accountRepository.findByEmail(request.getEmail());
        if (accountOptional.isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        Account account = new Account();
        account.setFullName(request.getFullName());
        account.setEmail(request.getEmail());
        account.setPassword(passwordEncoder.encode(request.getPassword()));
        account.setRole(Role.USER);

        accountRepository.save(account);
        return account;
    }

    @Override
    public String loginAccount(LoginRequest request) {
        Optional<Account> accountOptional = accountRepository.findByEmail(request.getEmail());
        if (accountOptional.isEmpty()) {
            throw new RuntimeException("Email not found");
        }

        Account account = accountOptional.get();
        if (!passwordEncoder.matches(request.getPassword(), account.getPassword())) {
            throw new RuntimeException("Password is incorrect");
        }

        Authentication authentication;
        try {

            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            account.getAccountId(),
                            request.getPassword()
                    )
            );
        } catch (Exception e) {
            throw new RuntimeException("Authentication failed");
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);
        return jwtTokenProvider.generateToken((CustomUserDetails) authentication.getPrincipal());
    }

    @Override
    public Account updateAccount(String authorization, UpdateAccountRequest request) {
        String accountId = jwtTokenProvider.getUserIdFromJwt(authorization.substring(7));
        Optional<Account> accountOptional = accountRepository.findByAccountId(UUID.fromString(accountId));
        if (accountOptional.isEmpty()) {
            throw new RuntimeException("Account not found");
        }

        Account account = accountOptional.get();
        account.setFullName(request.getFullName());
        this.accountRepository.save(account);
        return account;
    }
}
