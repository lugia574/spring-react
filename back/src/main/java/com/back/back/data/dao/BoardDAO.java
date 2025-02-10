package com.back.back.data.dao;

import com.back.back.data.entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface BoardDAO {
    Board save(Board board);
    Optional<Board> findById(Integer boardNumber);
    Optional<Board> findByBoardNumberAndWriterEmail(Integer boardNumber, String writerEmail);
    void delete(Board board);
    Page<Board> findAll(PageRequest pageRequest);
    Page<Board> findByTitleContaining(String keyword, Pageable pageable);
    Page<Board> findByWriterEmailContaining(String keyword, Pageable pageable);
    Page<Board> findByContentContaining(String keyword, Pageable pageable);
    List<Board> findTop5ByOrderByViewCountDesc();
}
