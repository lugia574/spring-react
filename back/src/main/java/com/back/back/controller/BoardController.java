package com.back.back.controller;

import com.back.back.dto.PostListDTO;
import com.back.back.entity.Board;
import com.back.back.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class BoardController {
    @Autowired
    private BoardService boardService;

    @ResponseBody
    @GetMapping("/api/boards")
    public PostListDTO getBoards(@RequestParam("pages") int pages) {
        return boardService.getBoards(pages);
    }

    @ResponseBody
    @GetMapping("/api/boards/{post_id}")
    public Board getBoardDetail(@PathVariable Integer post_id) {
        return boardService.getBoardDetail(post_id);
    }
}
