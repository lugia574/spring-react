package com.back.back.data.dto;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class CommentDTO {
    private Integer commentNumber;
    private  String commentContent;
    private String userEmail;

    private Integer boardNumber;

    private Date writeDatetime;

    private String userNickname;
}
