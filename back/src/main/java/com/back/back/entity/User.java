package com.back.back.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class User {
    @Id
    private String email;
    private String password;
    private String nickname;
    private String tel;
    private String address;
    private String address_detail;
    private String profile;

}
