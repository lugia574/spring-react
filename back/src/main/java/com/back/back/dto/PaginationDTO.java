package com.back.back.dto;

import lombok.Data;

@Data
public class PaginationDTO {
    private int page;
    private long totalItems;
}