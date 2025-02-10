package com.back.back.data.dao;

import com.back.back.data.entity.Comment;

import java.util.List;

public interface CommentDAO {
    List<Comment> findByBoardNumber(Integer boardNumber);
    List<Comment> findByUserEmail(String userEmail);
    void saveComment(Comment comment);
    void deleteByCommentNumber(Integer commentId);
}
