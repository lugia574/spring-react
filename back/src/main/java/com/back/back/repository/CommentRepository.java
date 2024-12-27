package com.back.back.repository;

import com.back.back.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
    // JPQL 쿼리로 명시적으로 board_number 컬럼을 조회하도록 수정
    @Query("SELECT c FROM Comment c WHERE c.board_number = :board_number")
    List<Comment> findByBoardNumber(@Param("board_number") Integer board_number);
}
