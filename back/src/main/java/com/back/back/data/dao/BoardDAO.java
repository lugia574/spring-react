package com.back.back.data.dao;

import com.back.back.data.entity.BoardEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface BoardDAO {
    BoardEntity save(BoardEntity board);
    Optional<BoardEntity> findById(Integer boardNumber);
    Optional<BoardEntity> findByBoardNumberAndWriterEmail(Integer boardNumber, String writerEmail);
    void delete(BoardEntity board);
    Page<BoardEntity> findAll(Pageable pageable);
    Page<BoardEntity> findByTitleContaining(String keyword, Pageable pageable);
    Page<BoardEntity> findByWriterEmailContaining(String keyword, Pageable pageable);
    Page<BoardEntity> findByContentContaining(String keyword, Pageable pageable);
    List<BoardEntity> findTop5ByOrderByViewCountDesc();
}
