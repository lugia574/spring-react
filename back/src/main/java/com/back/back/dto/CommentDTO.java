package com.back.back.dto;

import lombok.Data;

import java.util.Date;

@Data
public class CommentDTO {
    private Integer commentNumber;
    private  String commentContent;
    private String userEmail;

    private Integer boardNumber;

    private Date writeDatetime;

    private String userNickname;
}
