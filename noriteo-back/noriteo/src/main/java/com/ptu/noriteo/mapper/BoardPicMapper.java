package com.ptu.noriteo.mapper;

import com.ptu.noriteo.model.BoardPic;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BoardPicMapper {
    void insertPic(BoardPic pic);

    // 🆕 게시글 ID로 사진 전체 삭제
    void deleteByBoardId(Long boardId);
}
