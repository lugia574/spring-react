package com.back.back.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PaginationDTO {
    private int page;
    private long totalItems;
}