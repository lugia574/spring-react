package com.back.back.service;

import com.back.back.dto.BoardDTO;
import com.back.back.dto.PaginationDTO;
import com.back.back.dto.PostListDTO;
import com.back.back.entity.Board;
import com.back.back.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BoardService   {
    @Autowired
    private BoardRepository boardRepository;

    public PostListDTO getBoards(int page){
        int pageSize = 10;

        int pageIndex = Math.max(page - 1, 0);
        try{
            Page<Board> boardPage = boardRepository.findAll(PageRequest.of(pageIndex, pageSize));

            List<BoardDTO> boardDTOList = boardPage.getContent().stream().map(board -> {
                BoardDTO dto = new BoardDTO();
                dto.setBoardNumber(board.getBoard_number());
                dto.setTitle(board.getTitle());
                dto.setContent(board.getContent());
                dto.setFavoriteCount(board.getFavorite_count());
                dto.setCommentCount(board.getComment_count());
                dto.setViewCount(board.getView_count());
                dto.setWriterEmail(board.getWriter_email());
                dto.setWriterDatetime(board.getWriter_datetime());
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

    public Board getBoardDetail(Integer boardNumber) {
        return boardRepository.findById(boardNumber)
                .orElseThrow(() -> new IllegalStateException("게시글을 찾을 수 없습니다."));
    }
}
