package com.ptu.noriteo.service;

import com.ptu.noriteo.mapper.BoardCommentMapper;
import com.ptu.noriteo.model.BoardComment;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardCommentService {
    private final BoardCommentMapper boardCommentMapper;


    public List<BoardComment> getCommentsByBoardId(Long boardId) {
        return boardCommentMapper.getCommentsByBoardId(boardId);
    }

    public boolean addComment(BoardComment comment) {
        return boardCommentMapper.insertComment(comment) > 0;
    }

    public boolean updateComment(Long commentId, Long userId, String content) {
        BoardComment comment = new BoardComment();
        comment.setBoardCommentId(commentId);
        comment.setUserId(userId);
        comment.setBoardCommentContent(content);
        return boardCommentMapper.updateComment(comment) > 0;
    }

    public boolean deleteComment(Long commentId, Long userId) {
        BoardComment comment = new BoardComment();
        comment.setBoardCommentId(commentId);
        comment.setUserId(userId);
        return boardCommentMapper.deleteComment(comment) > 0;
    }



    public List<BoardComment> getMyComments(Long userId) {
        return boardCommentMapper.selectMyComments(userId);
    }


    @Transactional
    public void addReplyComment(BoardComment parentComment, BoardComment reply) {
        // 1. 기존 댓글 STEP 정렬 밀기
        boardCommentMapper.updateStepsForReply((long) parentComment.getRef(), parentComment.getStep());

        // 2. 대댓글 정보 세팅
        reply.setRef(parentComment.getRef());
        reply.setStep(parentComment.getStep() + 1);
        reply.setDepth(parentComment.getDepth() + 1);

        // 3. 삽입
        boardCommentMapper.insertReplyComment(reply);
    }
    // BoardCommentService.java
    public BoardComment getCommentById(Long commentId) {
        return boardCommentMapper.findById(commentId);
    }



}
