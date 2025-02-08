package com.back.back.repository;

import com.back.back.entity.BoardEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BoardRepository  extends JpaRepository<BoardEntity, Integer> {
    List<BoardEntity> findTop5ByOrderByViewCountDesc();
    Optional<BoardEntity> findByBoardNumberAndWriterEmail(Integer boardNumber, String writerEmail);
    Page<BoardEntity> findByTitleContaining(String keyword, Pageable pageable);
    Page<BoardEntity> findByWriterEmailContaining(String keyword, Pageable pageable);
    Page<BoardEntity> findByContentContaining(String keyword, Pageable pageable);

}
