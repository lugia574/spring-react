package com.back.back.service;


import com.back.back.data.dto.PostListDTO;
import com.back.back.data.dto.board.PostRequest;
import com.back.back.data.entity.BoardEntity;

import java.util.List;

public interface BoardService {
    void createPost(String token, PostRequest postRequest);
    PostListDTO getBoards(String searchType, String keyword, int page);
    void updatePost(String token, Integer postId, PostRequest postRequest);
    void deleteBoard(String token, Integer postId);
    List<BoardEntity>getTop5Boards();
    BoardEntity getBoardDetail(Integer boardNumber);

}
