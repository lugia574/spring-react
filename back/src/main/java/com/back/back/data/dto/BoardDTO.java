package com.back.back.data.dto;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
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
