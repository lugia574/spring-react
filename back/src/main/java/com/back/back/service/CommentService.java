package com.back.back.service;

import com.back.back.dto.CommentDTO;
import com.back.back.entity.Comment;
import com.back.back.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    // 특정 게시글의 댓글 조회
    public List<CommentDTO> getComment(Integer boardNumber) {
        // board_number를 기준으로 댓글 조회
        List<Comment> comments = commentRepository.findByBoardNumber(boardNumber);

        // Comment 엔티티 리스트를 CommentDTO 리스트로 변환
        return comments.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private CommentDTO convertToDTO(Comment comment) {
        CommentDTO commentDTO = new CommentDTO();
        commentDTO.setCommentNumber(comment.getComment_number());
        commentDTO.setCommentContent(comment.getComment_content());
        commentDTO.setUserEmail(comment.getUser_email());
        commentDTO.setBoardNumber(comment.getBoard_number());  // board_number를 그대로 사용
        commentDTO.setWriteDatetime(comment.getWrite_datetime());
        return commentDTO;
    }
}
