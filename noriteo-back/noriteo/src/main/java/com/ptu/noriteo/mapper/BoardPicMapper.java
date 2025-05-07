package com.ptu.noriteo.mapper;

import com.ptu.noriteo.model.BoardPic;


public interface BoardPicMapper {
    void insertPic(BoardPic pic);

    // 게시글 ID로 사진 전체 삭제
    void deleteByBoardId(Long boardId);
}
