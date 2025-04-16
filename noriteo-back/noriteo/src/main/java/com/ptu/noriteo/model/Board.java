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
    private String boardAddress;
    private Double boardLat;
    private Double boardLng;
    private String placeId;
    private Timestamp boardRegdate;
    private Integer boardViews;

    private List<BoardPic> boardPics;
}