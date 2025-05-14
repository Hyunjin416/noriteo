package com.ptu.noriteo.service;

import com.ptu.noriteo.mapper.BoardCommentMapper;
import com.ptu.noriteo.model.BoardComment;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardCommentService {
    private final BoardCommentMapper boardCommentMapper;

    public List<BoardComment> getCommentsByBoardId(Long boardId) {
        return boardCommentMapper.selectCommentsByBoardId(boardId);
    }

    public void addComment(BoardComment comment) {
        boardCommentMapper.insertComment(comment);
    }

    public void deleteComment(Long commentId) {
        boardCommentMapper.deleteComment(commentId);
    }

    public void updateComment(BoardComment comment) {
        boardCommentMapper.updateComment(comment);
    }
}
