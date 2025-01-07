package com.back.back.controller;

import com.back.back.constants.MessageConstants;
import com.back.back.dto.Comment.CommentRequset;
import com.back.back.dto.CommentDTO;
import com.back.back.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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



    @ResponseBody
    @DeleteMapping("/{commentId}")
    public ResponseEntity<Map<String, String>> deleteComment(
            @RequestHeader(value = "Authorization", required = false) String token,
            @PathVariable("commentId") String commentId){
        Map<String, String> response = new HashMap<>();
        Integer commentIdAsInteger = Integer.parseInt(commentId);
        try {
            commentService.deleteComment(token, commentIdAsInteger);
            response.put("message", MessageConstants.OK_DELETE_COMMENT);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(response);
        }catch (Exception e){
            e.printStackTrace();
            response.put("message", MessageConstants.BAD_REQUEST_COMMENT);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @ResponseBody
    @PostMapping
    public ResponseEntity<Map<String, String>> postComment(
            @RequestHeader(value = "Authorization", required = false) String token,
            @RequestBody CommentRequset commentRequset){
        Map<String, String> response = new HashMap<>();
        try {
            commentService.postComment(token, commentRequset);
            response.put("message", MessageConstants.OK_UPLOAD_COMMENT);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }catch (Exception e){
            e.printStackTrace();
            response.put("message", MessageConstants.BAD_REQUEST_USER);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

    }

}
