package com.back.back.data.dto.board;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class PostBoardRequestDTO {

    @NotNull
    private String title;

    @NotNull
    private String content;
}
