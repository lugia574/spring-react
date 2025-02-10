package com.back.back.service;


import com.back.back.data.dto.PostListDTO;
import com.back.back.data.dto.board.PostBoardRequestDTO;
import com.back.back.data.entity.Board;

import java.util.List;

public interface BoardService {
    void createPost(String token, PostBoardRequestDTO postBoardRequestDTO);
    PostListDTO getBoards(String searchType, String keyword, int page);
    void updatePost(String token, Integer postId, PostBoardRequestDTO postBoardRequestDTO);
    void deleteBoard(String token, Integer postId);
    List<Board>getTop5Boards();
    Board getBoardDetail(Integer boardNumber);

}
