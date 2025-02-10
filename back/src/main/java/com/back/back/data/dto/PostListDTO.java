package com.back.back.data.dto;


import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class PostListDTO {
    private List<BoardDTO> posts;
    private PaginationDTO pagination;
}


