package com.back.back.data.dao;

import com.back.back.data.entity.CommentEntity;

import java.util.List;

public interface CommentDAO {
    List<CommentEntity> findByBoardNumber(Integer boardNumber);
    List<CommentEntity> findByUserEmail(String userEmail);
    void saveComment(CommentEntity comment);
    void deleteByCommentNumber(Integer commentId);
}
