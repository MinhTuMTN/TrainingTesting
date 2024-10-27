package com.example.Demo.dto.response;

import com.example.Demo.constant.Gender;
import com.example.Demo.entity.Account;
import lombok.Data;
import org.springframework.beans.BeanUtils;

import java.util.UUID;

@Data
public class AccountResponse {
    private UUID accountId;
    private String fullName;
    private String email;
    private Integer provinceId;
    private String provinceName;
    private Gender gender;

    public AccountResponse(Account account, String provinceName) {
        BeanUtils.copyProperties(account, this);
        this.provinceName = provinceName;
    }
}
