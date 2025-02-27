package com.back.back.data.repository;

import com.back.back.data.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {

    List<Comment> findByBoardNumber(Integer boardNumber);

    List<Comment> findByUserEmail(String email);
    void deleteByCommentNumber(Integer commentNumber);

    @Transactional
    void deleteByBoardNumber(Integer boardNumber);
}
