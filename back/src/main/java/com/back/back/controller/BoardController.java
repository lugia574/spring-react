package com.back.back.controller;

import com.back.back.dto.PostListDTO;
import com.back.back.entity.Board;
import com.back.back.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/boards")
public class BoardController {
    @Autowired
    private BoardService boardService;

    @ResponseBody
    @GetMapping("/")
    public PostListDTO getBoards(@RequestParam("pages") int pages) {
        return boardService.getBoards(pages);
    }

    @ResponseBody
    @GetMapping("/{postId}")
    public Board getBoardDetail(@PathVariable("postId") String postId) {
        try {
            Integer postIdAsInteger = Integer.parseInt(postId);
            System.out.println("Post ID: " + postIdAsInteger);
            return boardService.getBoardDetail(postIdAsInteger);
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Invalid post ID format: " + postId, e);
        }

    }
}
