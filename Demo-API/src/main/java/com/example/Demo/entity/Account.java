package com.example.Demo.entity;

import com.example.Demo.constant.Role;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Entity
@Data
public class Account {
    @Id
    private UUID accountId;
    private String fullName;
    private String email;
    private String password;
    private Role role;
    private Date createdAt;
    private Date updatedAt;
    private boolean deleted;

    @PrePersist
    public void prePersist() {
        this.accountId = UUID.randomUUID();
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.deleted = false;
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = new Date();
    }
}
