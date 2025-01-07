package com.back.back.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_number")
    private Integer commentNumber;

    @Column(name = "comment_content")
    private String commentContent;

    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "board_number")
    private Integer boardNumber;

    @Column(name = "write_datetime")
    private Date writeDatetime;

    @Column(name = "user_nickname")
    private String userNickname;

}
