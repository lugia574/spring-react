package com.back.back.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtTokenProvider {
    private final static String SECRET_KEY = "mysecretmysecretmysecretmysecretmysecret"; // mysecret*5
    private final static SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    private final long EXPIRATION_TIME = 3600000;

    public String createToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key)
                .compact();
    }


    // JWT에서 사용자 이름 추출
    public String getUseremailFromToken(String token) {
        try {
            String email = Jwts.parser().verifyWith(key).
                    build().parseSignedClaims(token).
                    getPayload().getSubject();
            return email;
        }catch (Exception err){
            err.printStackTrace();
            throw new IllegalArgumentException("Invalid token");
        }

    }

    // JWT 검증
    public static String validateJwtToken(String token){
        System.out.println(token);
        if (token == null || !token.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Invalid Authorization header");
        }
        String sliceToken = token.substring(7).trim();
        try {
            Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(sliceToken)
                    .getPayload().getSubject();
            return sliceToken;
        }catch (Exception err){
            err.printStackTrace();
            return "";
        }
    }
}
