package com.back.back.data.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@ToString
public class CommentDTO {
    private Integer commentNumber;
    private  String commentContent;
    private String userEmail;

    private Integer boardNumber;

    private Date writeDatetime;

    private String userNickname;
}
