package com.back.back.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class User {
    @Id
    private String email;
    private String password;
    @Column(nullable = true)
    private String nickname;
    private String profile;

}
