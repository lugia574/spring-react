package com.back.back.data.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@ToString
public class BoardDTO {
    private Integer boardNumber;
    private String title;
    private String content;
    private Integer favoriteCount;
    private Integer commentCount;
    private Integer viewCount;
    private String writerEmail;
    private Date writerDatetime;
}
