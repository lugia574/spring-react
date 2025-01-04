package com.back.back.dto.auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JoinRequest {
    private String email;
    private String nickname;
    private String password;
    private String confirmPassword;
}
