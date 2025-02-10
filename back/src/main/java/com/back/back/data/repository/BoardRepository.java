package com.back.back.data.repository;

import com.back.back.data.entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BoardRepository  extends JpaRepository<Board, Integer> {
    List<Board> findTop5ByOrderByViewCountDesc();
    Optional<Board> findByBoardNumberAndWriterEmail(Integer boardNumber, String writerEmail);
    Page<Board> findByTitleContaining(String keyword, Pageable pageable);
    Page<Board> findByWriterEmailContaining(String keyword, Pageable pageable);
    Page<Board> findByContentContaining(String keyword, Pageable pageable);

}
