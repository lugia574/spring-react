package com.back.back.service.impl;

import com.back.back.data.dao.BoardDAO;
import com.back.back.data.dto.BoardDTO;
import com.back.back.data.dto.PaginationDTO;
import com.back.back.data.dto.PostListDTO;
import com.back.back.data.dto.board.PostRequest;
import com.back.back.data.entity.BoardEntity;
import com.back.back.security.JwtTokenProvider;
import com.back.back.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BoardServiceImpl implements BoardService {
    private final BoardDAO boardDAO;
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public BoardServiceImpl(BoardDAO boardDAO, JwtTokenProvider jwtTokenProvider) {
        this.boardDAO = boardDAO;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public void createPost(String token, PostRequest postRequest) {
        String validToken = jwtTokenProvider.validateJwtToken(token);
        String email = jwtTokenProvider.getUseremailFromToken(validToken);
        Date now = new Date();

        BoardEntity board = new BoardEntity();
        board.setTitle(postRequest.getTitle());
        board.setContent(postRequest.getContent());
        board.setWriterEmail(email);
        board.setWriterDatetime(now);
        board.setFavoriteCount(0);
        board.setCommentCount(0);
        board.setViewCount(0);

        boardDAO.save(board);
    }

    @Override
    public PostListDTO getBoards(String searchType, String keyword, int page) {
        int pageSize = 10;
        int pageIndex = Math.max(page - 1, 0);
        PageRequest pageRequest = PageRequest.of(pageIndex, pageSize, Sort.by(Sort.Direction.DESC, "writerDatetime"));

        Page<BoardEntity> boardPage;
        if (keyword == null || keyword.isEmpty()) {
            boardPage = boardDAO.findAll(pageRequest);
        } else {
            switch (searchType) {
                case "제목":
                    boardPage = boardDAO.findByTitleContaining(keyword, pageRequest);
                    break;
                case "닉네임":
                    boardPage = boardDAO.findByWriterEmailContaining(keyword, pageRequest);
                    break;
                case "내용":
                    boardPage = boardDAO.findByContentContaining(keyword, pageRequest);
                    break;
                default:
                    System.err.println("Invalid searchType: " + searchType);
                    boardPage = boardDAO.findAll(pageRequest);
            }
        }

        List<BoardDTO> boardDTOList = boardPage.getContent().stream()
                .map(this::mapToBoardDTO)
                .collect(Collectors.toList());

        PaginationDTO pagination = new PaginationDTO();
        pagination.setPage(boardPage.getNumber() + 1);
        pagination.setTotalItems((int) boardPage.getTotalElements());

        PostListDTO postList = new PostListDTO();
        postList.setPosts(boardDTOList);
        postList.setPagination(pagination);

        return postList;
    }

    @Override
    public void updatePost(String token, Integer postId, PostRequest postRequest) {
        String validToken = jwtTokenProvider.validateJwtToken(token);
        String email = jwtTokenProvider.getUseremailFromToken(validToken);

        BoardEntity board = boardDAO.findByBoardNumberAndWriterEmail(postId, email)
                .orElseThrow(() -> new IllegalArgumentException("Unauthorized or Post not found"));

        board.setTitle(postRequest.getTitle());
        board.setContent(postRequest.getContent());

        boardDAO.save(board);
    }

    @Override
    @Transactional
    public void deleteBoard(String token, Integer postId) {
        String validToken = jwtTokenProvider.validateJwtToken(token);
        String email = jwtTokenProvider.getUseremailFromToken(validToken);

        BoardEntity board = boardDAO.findByBoardNumberAndWriterEmail(postId, email)
                .orElseThrow(() -> new IllegalArgumentException("Unauthorized or Post not found"));

        boardDAO.delete(board);
    }

    @Override
    public List<BoardEntity> getTop5Boards() {
        return boardDAO.findTop5ByOrderByViewCountDesc();
    }

    @Override
    public BoardEntity getBoardDetail(Integer boardNumber) {
        return boardDAO.findById(boardNumber)
                .orElseThrow(() -> new IllegalStateException("게시글을 찾을 수 없습니다."));
    }


    private BoardDTO mapToBoardDTO(BoardEntity board) {
        BoardDTO dto = new BoardDTO();
        dto.setBoardNumber(board.getBoardNumber());
        dto.setTitle(board.getTitle());
        dto.setContent(board.getContent());
        dto.setFavoriteCount(board.getFavoriteCount());
        dto.setCommentCount(board.getCommentCount());
        dto.setViewCount(board.getViewCount());
        dto.setWriterEmail(board.getWriterEmail());
        dto.setWriterDatetime(board.getWriterDatetime());
        return dto;
    }
}
