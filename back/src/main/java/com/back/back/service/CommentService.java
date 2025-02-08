package com.back.back.service;

import com.back.back.data.dto.CommentDTO;
import com.back.back.data.dto.comment.CommentRequset;

import java.util.List;

public interface CommentService {
    List<CommentDTO> getComment(String userEmail, Integer boardNumber);
    void deleteComment(String token, Integer commentId);
    void postComment (String token, CommentRequset commentRequset);

}
