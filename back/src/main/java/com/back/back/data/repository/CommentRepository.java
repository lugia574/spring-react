package com.back.back.repository;

import com.back.back.entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<CommentEntity, Integer> {

    List<CommentEntity> findByBoardNumber(Integer boardNumber);

    List<CommentEntity> findByUserEmail(String email);
    void deleteByCommentNumber(Integer commentNumber);

    @Transactional
    void deleteByBoardNumber(Integer boardNumber);
}
