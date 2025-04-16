package com.ptu.noriteo.model;

import lombok.Data;

@Data
public class BoardPic {
    private Long boardPicId;
    private Long boardId;
    private String boardPicUrl;
    private Integer boardPicOrder;

    public BoardPic(Long boardId, String boardPicUrl, int boardPicOrder) {
        this.boardId = boardId;
        this.boardPicUrl = boardPicUrl;
        this.boardPicOrder = boardPicOrder;
    }


    public BoardPic() {

    }
}