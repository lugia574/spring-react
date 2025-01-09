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


    @GetMapping
    public ResponseEntity<PostListDTO> getBoards(
            @RequestParam(name = "searchType", required = false) String searchType,
            @RequestParam(name = "keyword", required = false) String keyword,
            @RequestParam(name = "pages") String pages
    ) {
        System.out.println(searchType + "@@@@" + keyword + "@@@@" + pages + " 말해봐 새끼야");
        Integer pagesAsInteger = Integer.parseInt(pages);
        PostListDTO postListDTO = boardService.getBoards(searchType, keyword, pagesAsInteger);
        return ResponseEntity.ok(postListDTO);
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
    @ResponseBody
    @PutMapping("/{postId}")
    public ResponseEntity<Map<String, String>> putComment(
            @RequestHeader(value = "Authorization", required = false) String token,
            @PathVariable("postId") String postId,
            @RequestBody PostRequest postRequest){
        Map<String, String> response = new HashMap<>();
        Integer postIdAsInteger = Integer.parseInt(postId);
        try {
            boardService.updatePost(token, postIdAsInteger, postRequest);
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
