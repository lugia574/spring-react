package com.back.back.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer comment_number;

    private String comment_content;
    private String user_email;

    // board_number 컬럼을 Integer로 추가합니다.
    private Integer board_number;  // foreign key 컬럼 board_number를 Integer로 추가

    private Date write_datetime;
}
