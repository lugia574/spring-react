package com.back.back.data.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class BoardEntity {
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
