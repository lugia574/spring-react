package com.back.back.dto;

import lombok.Data;
import java.util.Date;

@Data
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
