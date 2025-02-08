package com.back.back.service;

import com.back.back.dto.comment.CommentRequset;
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
    public List<CommentDTO> getComment(String userEmail, Integer boardNumber) {
        try{
            List<Comment> comments;
            if ((userEmail == null || userEmail.isEmpty()) && boardNumber != null) {
                comments = commentRepository.findByBoardNumber(boardNumber);

            } else if (boardNumber == null && userEmail != null && !userEmail.isEmpty()) {
                comments = commentRepository.findByUserEmail(userEmail);
            } else {
                throw new IllegalArgumentException("Bad request: Either userEmail or boardNumber");
            }
            // Comment 엔티티 리스트를 CommentDTO 리스트로 변환
            List<CommentDTO> CommentList = comments.stream().map(this::convertToDTO).collect(Collectors.toList());
            return CommentList;
        }catch (Exception e){
            e.printStackTrace();
            System.out.println(e.getMessage());
            throw e;
        }
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
