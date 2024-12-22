package com.back.back.dto;

import lombok.Data;

import java.util.List;

@Data
public class PostListDTO {
    private List<BoardDTO> posts;
    private PaginationDTO pagination;
}


