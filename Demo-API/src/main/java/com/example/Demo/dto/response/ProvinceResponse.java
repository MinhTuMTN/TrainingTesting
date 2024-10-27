package com.example.Demo.dto.response;

import com.example.Demo.entity.Province;
import lombok.Data;

@Data
public class ProvinceResponse {
    private int provinceId;
    private String provinceName;

    public ProvinceResponse(Province province) {
        this.provinceId = province.getProvinceId();
        this.provinceName = province.getProvinceName();
    }
}
