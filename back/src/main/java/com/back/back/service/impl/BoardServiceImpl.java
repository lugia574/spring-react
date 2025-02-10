package com.back.back.service.impl;

import com.back.back.data.dao.BoardDAO;

import com.back.back.data.dto.BoardDTO;
import com.back.back.data.dto.PaginationDTO;
import com.back.back.data.dto.PostListDTO;
import com.back.back.data.dto.board.PostBoardRequestDTO;
import com.back.back.data.entity.Board;
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
    public void createPost(String token, PostBoardRequestDTO postBoardRequestDTO) {
        String validToken = jwtTokenProvider.validateJwtToken(token);
        String email = jwtTokenProvider.getUseremailFromToken(validToken);
        Date now = new Date();

        Board board = Board.builder()
                .title(postBoardRequestDTO.getTitle())
                .content(postBoardRequestDTO.getContent())
                .writerEmail(email)
                .writerDatetime(now)
                .favoriteCount(0)
                .commentCount(0)
                .viewCount(0)
                .build();

        boardDAO.save(board);
    }

    @Override
    public PostListDTO getBoards(String searchType, String keyword, int page) {
        int pageSize = 10;
        int pageIndex = Math.max(page - 1, 0);
        PageRequest pageRequest = PageRequest.of(pageIndex, pageSize, Sort.by(Sort.Direction.DESC, "writerDatetime"));

        Page<Board> boardPage;
        if (keyword == null || keyword.isEmpty()) {
            boardPage = boardDAO.findAll(pageRequest);
        } else {
            switch (searchType) {
                case "title":
                    boardPage = boardDAO.findByTitleContaining(keyword, pageRequest);
                    break;
                case "writer":
                    boardPage = boardDAO.findByWriterEmailContaining(keyword, pageRequest);
                    break;
                case "content":
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

        PaginationDTO pagination = PaginationDTO.builder()
                .page(boardPage.getNumber() + 1)
                .totalItems((int) boardPage.getTotalElements()).build();

        PostListDTO postList = PostListDTO.builder()
                .posts(boardDTOList)
                .pagination(pagination).build();


        return postList;
    }

    @Override
    public void updatePost(String token, Integer postId, PostBoardRequestDTO postBoardRequestDTO) {
        String validToken = jwtTokenProvider.validateJwtToken(token);
        String email = jwtTokenProvider.getUseremailFromToken(validToken);

        Board board = boardDAO.findByBoardNumberAndWriterEmail(postId, email)
                .orElseThrow(() -> new IllegalArgumentException("Unauthorized or Post not found"));

        board.setTitle(postBoardRequestDTO.getTitle());
        board.setContent(postBoardRequestDTO.getContent());

        boardDAO.save(board);
    }

    @Override
    @Transactional
    public void deleteBoard(String token, Integer postId) {
        String validToken = jwtTokenProvider.validateJwtToken(token);
        String email = jwtTokenProvider.getUseremailFromToken(validToken);

        Board board = boardDAO.findByBoardNumberAndWriterEmail(postId, email)
                .orElseThrow(() -> new IllegalArgumentException("Unauthorized or Post not found"));

        boardDAO.delete(board);
    }

    @Override
    public List<Board> getTop5Boards() {
        return boardDAO.findTop5ByOrderByViewCountDesc();
    }

    @Override
    public Board getBoardDetail(Integer boardNumber) {
        return boardDAO.findById(boardNumber)
                .orElseThrow(() -> new IllegalStateException("게시글을 찾을 수 없습니다."));
    }


    private BoardDTO mapToBoardDTO(Board board) {
        return BoardDTO.builder()
                .boardNumber(board.getBoardNumber())
                .title(board.getTitle())
                .content(board.getContent())
                .favoriteCount(board.getFavoriteCount())
                .commentCount(board.getCommentCount())
                .viewCount(board.getViewCount())
                .writerEmail(board.getWriterEmail())
                .writerDatetime(board.getWriterDatetime())
                .build();
    }
}
