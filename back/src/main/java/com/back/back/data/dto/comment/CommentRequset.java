package com.back.back.data.dto.comment;

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
