package com.back.back.data.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class User {
    @NotNull
    @Id
    private String email;

    @NotNull
    private String password;
    @NotNull
    @Column(nullable = true)
    private String nickname;
    private String profile;

}
