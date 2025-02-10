package com.back.back.data.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.*;


import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_number")
    private Integer boardNumber;

    @NotNull
    private String title;

    @NotNull
    private String content;

    @NotNull
    @Column(name = "favorite_count")
    private Integer favoriteCount;

    @NotNull
    @Column(name = "comment_count")
    private Integer commentCount;

    @NotNull
    @Column(name = "view_count") // DB 컬럼과 매핑
    private Integer viewCount;

    @NotNull
    @Column(name = "writer_email")
    private String writerEmail;

    @NotNull
    @Column(name = "write_datetime") // DB 컬럼과 매핑
    private Date writerDatetime;
}
