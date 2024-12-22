package com.back.back.repository;

import com.back.back.entity.Board;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository  extends JpaRepository<Board, Integer> {

}
