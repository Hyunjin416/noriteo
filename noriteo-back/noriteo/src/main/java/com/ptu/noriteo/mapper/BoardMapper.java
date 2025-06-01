package com.ptu.noriteo.mapper;

import com.ptu.noriteo.model.Board;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface BoardMapper {
    List<Board> selectBoardList();
    Board selectBoardDetail(Long boardId);
    void insertBoard(Board board);
    void updateBoard(Board board);
    void deleteBoard(Long boardId);
    List<Board> selectBoardListByType(String boardType);

    int isBoardLiked(@Param("userId") Long userId, @Param("boardId") Long boardId);
    void insertBoardLike(@Param("userId") Long userId, @Param("boardId") Long boardId);
    int countBoardLikes(@Param("boardId") Long boardId); // ← 여긴 한 개 param만
    void deleteBoardLike(@Param("userId") Long userId, @Param("boardId") Long boardId);

    Board selectBoardById(Long boardId);

    /** 게시글 조회수 1 증가 */
    void incrementViews(@Param("boardId") Long boardId);


    int countLikes(Long boardId);

    // 저장 여부 확인 (0 or 1로 반환)
    int isBoardSaved(@Param("userId") Long userId, @Param("boardId") Long boardId);

    void insertBoardSave(@Param("userId") Long userId, @Param("boardId") Long boardId);
    void deleteBoardSave(@Param("userId") Long userId, @Param("boardId") Long boardId);


    List<Board> selectPopularBoards();
    List<Board> selectBoardsByUserId(@Param("userId") Long userId);

    List<Board> selectMySavedBoards(Long userId);

    List<Board> selectMyLikedBoards(Long userId);

    // 게시글 수 조회
    // BoardMapper.java
    long countBoards();
    List<Board> selectAll();
    void deleteById(Long id);

}