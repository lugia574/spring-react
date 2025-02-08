package com.back.back.data.dto;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class PostListDTO {
    private List<BoardDTO> posts;
    private PaginationDTO pagination;
}


