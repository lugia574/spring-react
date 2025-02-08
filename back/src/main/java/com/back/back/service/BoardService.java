package com.back.back.service;

import com.back.back.dto.board.PostRequest;
import com.back.back.dto.BoardDTO;
import com.back.back.dto.PaginationDTO;
import com.back.back.dto.PostListDTO;
import com.back.back.entity.Board;
import com.back.back.repository.BoardRepository;
import com.back.back.repository.CommentRepository;
import com.back.back.security.JwtTokenProvider;
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
public class BoardService   {
    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;


    public void createPost(String token, PostRequest postRequest){
        String validToken = jwtTokenProvider.validateJwtToken(token);

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

    public PostListDTO getBoards(String searchType, String keyword, int page){
        int pageSize = 10;

        int pageIndex = Math.max(page - 1, 0);
        PageRequest pageRequest = PageRequest.of(pageIndex, pageSize, Sort.by(Sort.Direction.DESC, "writerDatetime"));
        try{
            Page<Board> boardPage;
            if(keyword == null || keyword.isEmpty()){
                boardPage = boardRepository.findAll(pageRequest);
            }else{
                switch (searchType) {
                    case "제목":
                        boardPage = boardRepository.findByTitleContaining(keyword, pageRequest);
                        break;
                    case "닉네임":
                        boardPage = boardRepository.findByWriterEmailContaining(keyword, pageRequest);
                        break;
                    case "내용":
                        boardPage = boardRepository.findByContentContaining(keyword, pageRequest);
                        break;
                    default:
                        System.err.println("Invalid searchType: " + searchType);
                        boardPage = boardRepository.findAll(pageRequest);
                }
            }


            List<BoardDTO> boardDTOList = boardPage.getContent().stream()
                    .map(this::mapToBoardDTO)
                    .collect(Collectors.toList());

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

    public void updatePost(String token, Integer postId, PostRequest postRequest){
        String validToken = jwtTokenProvider.validateJwtToken(token);
        String email = jwtTokenProvider.getUseremailFromToken(validToken);

        Board board = boardRepository.findByBoardNumberAndWriterEmail(postId, email)
                .orElseThrow(() -> new IllegalArgumentException(("Unauthorized or Post not found")));


        board.setTitle(postRequest.getTitle());
        board.setContent(postRequest.getContent());
        boardRepository.save(board); // 저장
    }

    @Transactional
    public void deleteBoard(String token, Integer postId){
        String validToken = jwtTokenProvider.validateJwtToken(token);
        String email = jwtTokenProvider.getUseremailFromToken(validToken);

        Board board = boardRepository.findByBoardNumberAndWriterEmail(postId, email)
                .orElseThrow(() -> new IllegalArgumentException(("Unauthorized or Post not found")));

        // Delete comments associated with the board
        commentRepository.deleteByBoardNumber(postId);

        // Delete the board
        boardRepository.delete(board);
    }

    public List<Board> getTop5Boards(){
        List<Board> top5Boards = boardRepository.findTop5ByOrderByViewCountDesc();
        return top5Boards;
    }

    public Board getBoardDetail(Integer boardNumber) {
        return boardRepository.findById(boardNumber)
                .orElseThrow(() -> new IllegalStateException("게시글을 찾을 수 없습니다."));
    }


    private BoardDTO mapToBoardDTO(Board board) {
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
