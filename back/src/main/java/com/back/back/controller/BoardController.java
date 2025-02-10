package com.back.back.controller;

import com.back.back.constants.MessageConstants;
import com.back.back.data.dto.board.GetBoardsRequestDTO;
import com.back.back.data.dto.board.PostBoardRequestDTO;
import com.back.back.data.dto.PostListDTO;
import com.back.back.data.entity.Board;
import com.back.back.service.BoardService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/boards")
public class BoardController {
    private final BoardService boardService;

    @Autowired
    public BoardController(BoardService boardService){
        this.boardService = boardService;
    }


    @Validated
    @GetMapping
    public ResponseEntity<PostListDTO> getBoards(GetBoardsRequestDTO getBoardsRequestDTO) {
        PostListDTO postListDTO = boardService.getBoards(getBoardsRequestDTO.getSearchType(), getBoardsRequestDTO.getKeyword(), getBoardsRequestDTO.getPages());

        return ResponseEntity.ok(postListDTO);
    }


    @GetMapping("/top5")
    public List<Board> getBestBoard(){
        return boardService.getTop5Boards();
    }




    @PostMapping
    public ResponseEntity<Map<String, String>> postBoard(
            @RequestHeader(value = "Authorization", required = false) String token,
            @Valid @RequestBody PostBoardRequestDTO postBoardRequestDTO){
        Map<String, String> response = new HashMap<>();
        try {
            boardService.createPost(token, postBoardRequestDTO);
            response.put("message", MessageConstants.OK_UPLOAD_POST);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }catch (Exception e){
            response.put("message", e.getMessage()+MessageConstants.BAD_REQUEST_UPLOAD_POST);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

    }


    @GetMapping("/{postId}")
    public Board getBoardDetail(@PathVariable("postId") @Min(1) @Pattern(regexp = "\\d+") int postId) {
        return boardService.getBoardDetail(postId);
    }


    // update
    @PutMapping("/{postId}")
    public ResponseEntity<Map<String, String>> putComment(
            @RequestHeader(value = "Authorization", required = false) String token,
            @PathVariable("postId") String postId,
            @Valid @RequestBody PostBoardRequestDTO postBoardRequestDTO){
        Map<String, String> response = new HashMap<>();
        Integer postIdAsInteger = Integer.parseInt(postId);
        try {
            boardService.updatePost(token, postIdAsInteger, postBoardRequestDTO);
            response.put("message", MessageConstants.OK_UPDATE_POST);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
        }catch (Exception e){
            e.printStackTrace();
            response.put("message", MessageConstants.BAD_REQUEST_UPDATE_POST);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // delete
    @DeleteMapping("/{postId}")
    public ResponseEntity<Map<String, String>> deleteBaord(
            @RequestHeader(value = "Authorization", required = false) String token,
            @PathVariable("postId") Integer postId){
        Map<String, String> response = new HashMap<>();

        try{
            boardService.deleteBoard(token, postId);
            response.put("message", MessageConstants.OK_DELETE_POST);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e){
            e.printStackTrace();
            response.put("message", MessageConstants.BAD_REQUEST_USER);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

}
