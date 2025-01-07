package com.back.back.dto.Comment;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentRequset {
    private Integer boardNumber;
    private String commentContent;
    private String userEmail;
    private String userNickname;
}
