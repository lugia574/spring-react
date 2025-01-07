package com.back.back.controller;

import com.back.back.constants.MessageConstants;
import com.back.back.dto.Board.PostRequest;
import com.back.back.dto.PostListDTO;
import com.back.back.entity.Board;
import com.back.back.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/api/boards")
public class BoardController {
    @Autowired
    private BoardService boardService;


    @ResponseBody
    @GetMapping
    public PostListDTO getBoards(@RequestParam("pages") int pages) {
        return boardService.getBoards(pages);
    }

    @ResponseBody
    @GetMapping("/top5")
    public List<Board> getBestBoard(){
        return boardService.getTop5Boards();
    }



    @ResponseBody
    @PostMapping
    public ResponseEntity<Map<String, String>> postBoard(
            @RequestHeader(value = "Authorization", required = false) String token,
            @RequestBody PostRequest postRequest){
        Map<String, String> response = new HashMap<>();
        try {
            boardService.createPost(token, postRequest);
            response.put("message", MessageConstants.OK_UPLOAD_POST);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }catch (Exception e){
            response.put("message", e.getMessage()+MessageConstants.BAD_REQUEST_UPLOAD_POST);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

    }

    @ResponseBody
    @GetMapping("/{postId}")
    public Board getBoardDetail(@PathVariable("postId") String postId) {
        try {
            Integer postIdAsInteger = Integer.parseInt(postId);
            System.out.println("Post ID: " + postIdAsInteger);
            return boardService.getBoardDetail(postIdAsInteger);
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Invalid post ID format: " + postId, e);
        }

    }


    // update


    // delete


}
