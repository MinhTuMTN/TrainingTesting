package com.example.Demo.service.impl;

import com.example.Demo.constant.Role;
import com.example.Demo.dto.request.AccountRegister;
import com.example.Demo.dto.request.LoginRequest;
import com.example.Demo.dto.request.UpdateAccountRequest;
import com.example.Demo.dto.response.AccountResponse;
import com.example.Demo.dto.response.AuthResponse;
import com.example.Demo.entity.Account;
import com.example.Demo.repository.AccountRepository;
import com.example.Demo.repository.ProvinceRepository;
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
    private final ProvinceRepository provinceRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;

    public AccountServiceImpl(
            AccountRepository accountRepository,
            ProvinceRepository provinceRepository,
            AuthenticationManager authenticationManager,
            JwtTokenProvider jwtTokenProvider,
            PasswordEncoder passwordEncoder
    ) {
        this.accountRepository = accountRepository;
        this.provinceRepository = provinceRepository;
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public AuthResponse registerAccount(AccountRegister request) {
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

        String token = authenticated(account.getAccountId().toString(), request.getPassword());

        return AuthResponse.builder()
                .fullName(account.getFullName())
                .email(account.getEmail())
                .token(token)
                .build();
    }

    @Override
    public AuthResponse loginAccount(LoginRequest request) {
        Optional<Account> accountOptional = accountRepository.findByEmail(request.getEmail());
        if (accountOptional.isEmpty()) {
            throw new RuntimeException("Email not found");
        }

        Account account = accountOptional.get();
        if (!passwordEncoder.matches(request.getPassword(), account.getPassword())) {
            throw new RuntimeException("Password is incorrect");
        }

        String token = authenticated(account.getAccountId().toString(), request.getPassword());

        return AuthResponse.builder()
                .fullName(account.getFullName())
                .email(account.getEmail())
                .token(token)
                .build();
    }

    private String authenticated(String accountId, String password) {
        Authentication authentication;
        try {

            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            accountId,
                            password
                    )
            );
        } catch (Exception e) {
            throw new RuntimeException("Authentication failed");
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);
        return jwtTokenProvider.generateToken(
                (CustomUserDetails) authentication.getPrincipal()
        );
    }

    @Override
    public AccountResponse updateAccount(String authorization, UpdateAccountRequest request) {
        String accountId = jwtTokenProvider.getUserIdFromJwt(authorization.substring(7));
        Optional<Account> accountOptional = accountRepository.findByAccountId(UUID.fromString(accountId));
        if (accountOptional.isEmpty()) {
            throw new RuntimeException("Account not found");
        }

        Account account = accountOptional.get();
        account.setFullName(request.getFullName());
        account.setProvinceId(request.getProvinceId());
        account.setGender(request.getGender());
        this.accountRepository.save(account);

        String provinceName = getProvinceName(account.getProvinceId());
        return new AccountResponse(account, provinceName);
    }

    @Override
    public AccountResponse getAccount(String authorization) {
        String accountId = jwtTokenProvider.getUserIdFromJwt(authorization.substring(7));
        Optional<Account> accountOptional = accountRepository.findByAccountId(UUID.fromString(accountId));
        if (accountOptional.isEmpty()) {
            throw new RuntimeException("Account not found");
        }

        Account account = accountOptional.get();
        String provinceName = getProvinceName(account.getProvinceId());

        return new AccountResponse(account, provinceName);
    }

    private String getProvinceName(Integer provinceId) {
        if (provinceId == null) {
            return null;
        }

        return provinceRepository.findById(provinceId)
                .orElseThrow(() -> null)
                .getProvinceName();
    }
}
