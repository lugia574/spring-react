package com.back.back.service.impl;

import com.back.back.data.dao.CommentDAO;
import com.back.back.data.dto.CommentDTO;
import com.back.back.data.dto.comment.CommentRequset;
import com.back.back.data.entity.CommentEntity;
import com.back.back.security.JwtTokenProvider;
import com.back.back.service.CommentService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentServiceImpl implements CommentService{

    private final CommentDAO commentDAO;
    private final JwtTokenProvider jwtTokenProvider;


    @Autowired
    public CommentServiceImpl(CommentDAO commentDAO, JwtTokenProvider jwtTokenProvider){
        this.commentDAO = commentDAO;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public List<CommentDTO> getComment(String userEmail, Integer boardNumber) {
        try{
            List<CommentEntity> comments;
            if ((userEmail == null || userEmail.isEmpty()) && boardNumber != null) {
                comments = commentDAO.findByBoardNumber(boardNumber);

            } else if (boardNumber == null && userEmail != null && !userEmail.isEmpty()) {
                comments = commentDAO.findByUserEmail(userEmail);
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

    @Override
    @Transactional
    public void deleteComment(String token, Integer commentId) {
        String validToken = jwtTokenProvider.validateJwtToken(token);
        commentDAO.deleteByCommentNumber(commentId);
    }

    @Override
    public void postComment(String token, CommentRequset commentRequset) {
        String validToken = jwtTokenProvider.validateJwtToken(token);

        Date now = new Date();

        CommentEntity comment = new CommentEntity();
        comment.setBoardNumber(commentRequset.getBoardNumber());
        comment.setUserEmail(commentRequset.getUserEmail());
        comment.setUserNickname(commentRequset.getUserNickname());
        comment.setCommentContent(commentRequset.getCommentContent());
        comment.setWriteDatetime(now);

        commentDAO.saveComment(comment);
    }

    private CommentDTO convertToDTO(CommentEntity comment) {
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
