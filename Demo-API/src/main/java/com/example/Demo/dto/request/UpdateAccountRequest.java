package com.example.Demo.dto.request;

import com.example.Demo.constant.Gender;
import lombok.Data;

@Data
public class UpdateAccountRequest {
    private String fullName;
    private Integer provinceId;
    private Gender gender;
}
