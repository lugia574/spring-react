package com.back.back.data.dao.impl;

import com.back.back.data.dao.BoardDAO;
import com.back.back.data.entity.BoardEntity;
import com.back.back.data.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
    public BoardEntity save(BoardEntity board) {
        return boardRepository.save(board);
    }

    @Override
    public Optional<BoardEntity> findById(Integer boardNumber) {
        return boardRepository.findById(boardNumber);
    }

    @Override
    public Optional<BoardEntity> findByBoardNumberAndWriterEmail(Integer boardNumber, String writerEmail) {
        return boardRepository.findByBoardNumberAndWriterEmail(boardNumber, writerEmail);
    }

    @Override
    public void delete(BoardEntity board) {
        boardRepository.delete(board);
    }

    @Override
    public Page<BoardEntity> findAll(Pageable pageable) {
        return boardRepository.findAll(pageable);
    }

    @Override
    public Page<BoardEntity> findByTitleContaining(String keyword, Pageable pageable) {
        return boardRepository.findByTitleContaining(keyword, pageable);
    }

    @Override
    public Page<BoardEntity> findByWriterEmailContaining(String keyword, Pageable pageable) {
        return boardRepository.findByWriterEmailContaining(keyword, pageable);
    }

    @Override
    public Page<BoardEntity> findByContentContaining(String keyword, Pageable pageable) {
        return boardRepository.findByContentContaining(keyword, pageable);
    }

    @Override
    public List<BoardEntity> findTop5ByOrderByViewCountDesc() {
        return boardRepository.findTop5ByOrderByViewCountDesc();
    }
}
