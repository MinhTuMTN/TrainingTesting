package com.example.Demo.dto.response;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class DemoResponse {
    private boolean success;
    private String message;
    private Object data;
}
