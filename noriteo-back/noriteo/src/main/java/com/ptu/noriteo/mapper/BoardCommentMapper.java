package com.ptu.noriteo.mapper;

import com.ptu.noriteo.model.BoardComment;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface BoardCommentMapper {
    List<BoardComment> getCommentsByBoardId(Long boardId);
    int insertComment(BoardComment comment);
    int updateComment(BoardComment comment);
    int deleteComment(BoardComment comment); // userId와 함께 전달
    List<BoardComment> selectMyComments(Long userId);

    void insertReplyComment(BoardComment comment);

    void updateStepsForReply(@Param("ref") Long ref, @Param("step") int step);

    BoardComment findById(@Param("commentId") Long commentId);
    void updateCommentRef(BoardComment comment);
    BoardComment selectCommentById(Long boardCommentId);
    int updateStepsForReply(@Param("ref") int ref, @Param("step") int step);

}
