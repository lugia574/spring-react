package com.back.back.data.repository;

import com.back.back.data.entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
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
