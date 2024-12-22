package com.back.back.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.Date;

@Data
@Entity
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer board_number;

    private String title;

    private String content;

    private Integer favorite_count;

    private Integer comment_count;

    private Integer view_count;

    private String writer_email;

    @Column(name = "write_datetime") // MySQL 컬럼 이름과 매핑
    private Date writer_datetime;
}
