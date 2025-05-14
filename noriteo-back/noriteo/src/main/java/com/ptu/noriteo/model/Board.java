package com.ptu.noriteo.model;

import lombok.Data;
import java.sql.Timestamp;
import java.util.List;

@Data
public class Board {
    private Long boardId;
    private String boardType;
    private String boardTitle;
    private String boardContent;
    private Long userId;

    private String placeKakaoId;
    private String placeName;
    private String roadAddressName;
    private Double boardLat;
    private Double boardLng;

    private Timestamp boardRegdate;
    private Long boardViews;

    private List<BoardPic> boardPics;



    // 추가................
    private int likes;
    private int boardRecommend;

}