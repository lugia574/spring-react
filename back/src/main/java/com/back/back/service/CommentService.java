package com.back.back.service;

import com.back.back.dto.Comment.CommentRequset;
import com.back.back.dto.CommentDTO;
import com.back.back.entity.Comment;
import com.back.back.repository.CommentRepository;
import com.back.back.security.JwtTokenProvider;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    // 특정 게시글의 댓글 조회
    public List<CommentDTO> getComment(Integer boardNumber) {
        // board_number를 기준으로 댓글 조회
        List<Comment> comments = commentRepository.findByBoardNumber(boardNumber);

        // Comment 엔티티 리스트를 CommentDTO 리스트로 변환
        return comments.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Transactional
    public void deleteComment(String token, Integer commentId){
        String validToken = jwtTokenProvider.validateJwtToken(token);
        commentRepository.deleteByCommentNumber(commentId);
    }
    public void postComment(String token, CommentRequset commentRequset){
        String validToken = jwtTokenProvider.validateJwtToken(token);

        Date now = new Date();

        Comment comment = new Comment();
        comment.setBoardNumber(commentRequset.getBoardNumber());
        comment.setUserEmail(commentRequset.getUserEmail());
        comment.setUserNickname(commentRequset.getUserNickname());
        comment.setCommentContent(commentRequset.getCommentContent());
        comment.setWriteDatetime(now);

        commentRepository.save(comment);
    }

    private CommentDTO convertToDTO(Comment comment) {
        CommentDTO commentDTO = new CommentDTO();
        commentDTO.setCommentNumber(comment.getCommentNumber());
        commentDTO.setCommentContent(comment.getCommentContent());
        commentDTO.setUserEmail(comment.getUserEmail());
        commentDTO.setBoardNumber(comment.getBoardNumber());
        commentDTO.setWriteDatetime(comment.getWriteDatetime());
        commentDTO.setUserNickname(comment.getUserNickname());
        return commentDTO;
    }
}
