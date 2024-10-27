package com.example.Demo.service.impl;

import com.example.Demo.dto.response.ProvinceResponse;
import com.example.Demo.entity.Province;
import com.example.Demo.repository.ProvinceRepository;
import com.example.Demo.service.ProvinceService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProvinceImpl implements ProvinceService {
    private final ProvinceRepository provinceRepository;

    public ProvinceImpl(ProvinceRepository provinceRepository) {
        this.provinceRepository = provinceRepository;
    }

    @Override
    public List<ProvinceResponse> getProvinces() {
        List<Province> provinces = provinceRepository.findAll();
        return provinces.stream().map(ProvinceResponse::new).collect(Collectors.toList());
    }
}
