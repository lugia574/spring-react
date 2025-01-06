package com.back.back.repository;

import com.back.back.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository  extends JpaRepository<Board, Integer> {
    List<Board> findTop5ByOrderByViewCountDesc();

}
