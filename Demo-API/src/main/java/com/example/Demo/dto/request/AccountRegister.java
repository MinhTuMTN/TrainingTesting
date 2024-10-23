package com.example.Demo.dto.request;

import lombok.Data;

@Data
public class AccountRegister {
    private String fullName;
    private String email;
    private String password;
}
