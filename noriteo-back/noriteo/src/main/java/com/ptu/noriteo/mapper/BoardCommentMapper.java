package com.ptu.noriteo.mapper;

import com.ptu.noriteo.model.BoardComment;

import java.util.List;

public interface BoardCommentMapper {
    // 게시글에 달린 댓글 전체 조회
    List<BoardComment> selectCommentsByBoardId(Long boardId);

    // 댓글 등록
    void insertComment(BoardComment comment);

    // 댓글 수정
    void updateComment(BoardComment comment);

    // 댓글 삭제
    void deleteComment(Long commentId);

}
