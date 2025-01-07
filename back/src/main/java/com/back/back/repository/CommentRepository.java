package com.back.back.repository;

import com.back.back.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {

    List<Comment> findByBoardNumber(Integer boardNumber);
    void deleteByCommentNumber(Integer commentNumber);
}
