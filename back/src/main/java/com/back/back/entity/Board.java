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
    @Column(name = "board_number")
    private Integer boardNumber;

    private String title;

    private String content;

    @Column(name = "favorite_count")
    private Integer favoriteCount;

    @Column(name = "comment_count")
    private Integer commentCount;

    @Column(name = "view_count") // DB 컬럼과 매핑
    private Integer viewCount;

    @Column(name = "writer_email")
    private String writerEmail;

    @Column(name = "write_datetime") // DB 컬럼과 매핑
    private Date writerDatetime;
}
