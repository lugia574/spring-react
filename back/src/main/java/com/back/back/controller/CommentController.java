package com.back.back.controller;

import com.back.back.constants.MessageConstants;
import com.back.back.dto.comment.CommentRequset;
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

@RestController
@RequestMapping("/api/comments")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @GetMapping
        public ResponseEntity<Map<String, Object>> getComment(@RequestParam(name = "userEmail", required = false) String userEmail,
                                       @RequestParam(name = "postId", required = false) String postId) {
        Map<String, Object> response = new HashMap<>();
        Integer postIdAsInteger = (postId != null && !postId.isEmpty()) ? Integer.parseInt(postId) : null;

        try {
            List<CommentDTO> commentList = commentService.getComment(userEmail, postIdAsInteger);
            response.put("message", MessageConstants.OK_SELECT_COMMENT);
            response.put("data", commentList);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("message", MessageConstants.BAD_REQUEST_UPDATE_POST);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }





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
