package com.back.back.data.dao.impl;

import com.back.back.data.dao.CommentDAO;
import com.back.back.data.entity.Comment;
import com.back.back.data.repository.CommentRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CommentDAOImpl implements CommentDAO {

    private final CommentRepository commentRepository;

    public CommentDAOImpl(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }
    @Override
    public List<Comment> findByBoardNumber(Integer boardNumber) {
        return commentRepository.findByBoardNumber(boardNumber);
    }

    @Override
    public List<Comment> findByUserEmail(String userEmail) {
        return commentRepository.findByUserEmail(userEmail);
    }

    @Override
    public void saveComment(Comment comment) {
        commentRepository.save(comment);
    }

    @Override
    public void deleteByCommentNumber(Integer commentId) {
        commentRepository.deleteByCommentNumber(commentId);
    }
}
