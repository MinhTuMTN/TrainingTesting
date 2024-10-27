package com.example.Demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import org.hibernate.annotations.Nationalized;

@Entity
@Data
public class Province {
    @Id
    private int provinceId;

    @Nationalized
    private String provinceName;
    private boolean deleted;
}
