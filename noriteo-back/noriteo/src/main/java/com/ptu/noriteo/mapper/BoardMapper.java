package com.ptu.noriteo.mapper;

import com.ptu.noriteo.model.Board;
import java.util.List;

public interface BoardMapper {
    List<Board> selectBoardList();
    Board selectBoardDetail(Long boardId);
    void insertBoard(Board board);
    void updateBoard(Board board);
    void deleteBoard(Long boardId);

}