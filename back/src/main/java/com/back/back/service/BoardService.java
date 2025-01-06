package com.back.back.service;

import com.back.back.dto.Board.PostRequest;
import com.back.back.dto.BoardDTO;
import com.back.back.dto.PaginationDTO;
import com.back.back.dto.PostListDTO;
import com.back.back.entity.Board;
import com.back.back.repository.BoardRepository;
import com.back.back.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BoardService   {
    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;


    public void createPost(String token, PostRequest postRequest){
        String validToken = jwtTokenProvider.validateJwtToken(token);
        if(validToken.equals("")){
            throw new IllegalArgumentException("Invalid token");
        }

        String email = jwtTokenProvider.getUseremailFromToken(validToken);

        Date now = new Date();

        Board board = new Board();
        board.setTitle(postRequest.getTitle());
        board.setContent(postRequest.getContent());
        board.setWriterEmail(email);
        board.setWriterDatetime(now);
        board.setFavoriteCount(0);
        board.setCommentCount(0);
        board.setViewCount(0);

        boardRepository.save(board);
    }

    public PostListDTO getBoards(int page){
        int pageSize = 10;

        int pageIndex = Math.max(page - 1, 0);
        try{
            Page<Board> boardPage = boardRepository.findAll(
                    PageRequest.of(pageIndex, pageSize, Sort.by(Sort.Direction.DESC, "writerDatetime"))
            );

            List<BoardDTO> boardDTOList = boardPage.getContent().stream().map(board -> {
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
            }).collect(Collectors.toList());

            // Pagination 정보 생성
            PaginationDTO pagination = new PaginationDTO();
            pagination.setPage(boardPage.getNumber() + 1); // 0부터 시작이므로 +1
            pagination.setTotalItems((int) boardPage.getTotalElements());;

            // PostListDTO 반환
            PostListDTO postList = new PostListDTO();
            postList.setPosts(boardDTOList);
            postList.setPagination(pagination);

            return postList;

        }catch (Exception err){
            System.err.println("Error fetching boards: " + err.getMessage());
            throw err;
        }
    }

    public List<Board> getTop5Boards(){
        List<Board> top5Boards = boardRepository.findTop5ByOrderByViewCountDesc();
        return top5Boards;
    }

    public Board getBoardDetail(Integer boardNumber) {
        return boardRepository.findById(boardNumber)
                .orElseThrow(() -> new IllegalStateException("게시글을 찾을 수 없습니다."));
    }
}
