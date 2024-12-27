package com.back.back.controller;

import com.back.back.dto.CommentDTO;
import com.back.back.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/api/comments")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @ResponseBody
    @GetMapping("/{postId}")
    public List<CommentDTO> getComment(@PathVariable("postId") String postId){
        try {
            Integer postIdAsInteger = Integer.parseInt(postId);
            return commentService.getComment(postIdAsInteger);
        }catch (NumberFormatException e) {
            throw new IllegalArgumentException("Invalid post ID format: " + postId, e);
        }
    }

}
