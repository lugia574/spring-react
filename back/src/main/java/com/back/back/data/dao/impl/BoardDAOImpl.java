package com.back.back.data.dao.impl;

import com.back.back.data.dao.BoardDAO;
import com.back.back.data.entity.Board;
import com.back.back.data.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class BoardDAOImpl implements BoardDAO {

    private final BoardRepository boardRepository;

    @Autowired
    public BoardDAOImpl(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    @Override
    public Board save(Board board) {
        return boardRepository.save(board);
    }

    @Override
    public Optional<Board> findById(Integer boardNumber) {
        return boardRepository.findById(boardNumber);
    }

    @Override
    public Optional<Board> findByBoardNumberAndWriterEmail(Integer boardNumber, String writerEmail) {
        return boardRepository.findByBoardNumberAndWriterEmail(boardNumber, writerEmail);
    }

    @Override
    public void delete(Board board) {
        boardRepository.delete(board);
    }

    @Override
    public Page<Board> findAll(PageRequest pageRequest) {
        return boardRepository.findAll(pageRequest);
    }

    @Override
    public Page<Board> findByTitleContaining(String keyword, Pageable pageable) {
        return boardRepository.findByTitleContaining(keyword, pageable);
    }

    @Override
    public Page<Board> findByWriterEmailContaining(String keyword, Pageable pageable) {
        return boardRepository.findByWriterEmailContaining(keyword, pageable);
    }

    @Override
    public Page<Board> findByContentContaining(String keyword, Pageable pageable) {
        return boardRepository.findByContentContaining(keyword, pageable);
    }

    @Override
    public List<Board> findTop5ByOrderByViewCountDesc() {
        return boardRepository.findTop5ByOrderByViewCountDesc();
    }
}
