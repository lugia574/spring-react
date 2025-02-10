package com.back.back.data.dto;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class PaginationDTO {
    private int page;
    private long totalItems;
}