package com.back.back.data.dto.board;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;

@Getter
public class GetBoardsRequestDTO {

    @Pattern(regexp = "title|content|writer", message = "Invalid search type. Valid options are 'title', 'content', 'writer'.")
    private String searchType;

    @NotBlank(message = "Keyword must not be blank.")
    private String keyword;

    @Min(value = 1, message = "Pages must be greater than or equal to 1.")
    private int pages;
}
