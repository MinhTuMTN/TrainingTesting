package com.example.Demo.dto.response;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class AuthResponse {
    private String fullName;
    private String email;
    private String token;
}
