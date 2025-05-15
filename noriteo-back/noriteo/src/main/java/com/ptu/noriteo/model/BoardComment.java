package com.ptu.noriteo.model;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class BoardComment {
    private Long boardCommentId;
    private Long boardId;
    private Long userId;
    private String boardCommentContent;
    private Timestamp boardCommentRegdate;
    private Integer ref;
    private int step;
    private int depth;

    private Long parentId;

}

