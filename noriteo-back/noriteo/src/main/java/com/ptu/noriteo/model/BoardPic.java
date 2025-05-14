package com.ptu.noriteo.model;

import lombok.Data;

@Data
public class BoardPic {
    private Long boardPicId;
    private Long boardId;
    private String boardPicUrl;
    private Long boardPicOrder;

    public BoardPic(Long boardId, String boardPicUrl, Long boardPicOrder) {
        this.boardId = boardId;
        this.boardPicUrl = boardPicUrl;
        this.boardPicOrder = boardPicOrder;
    }


    public BoardPic() {

    }
}