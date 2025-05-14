package com.ptu.noriteo.model;

import lombok.Data;

@Data
public class BoardComment{
    private Long boardCommentId;
    private Long boardId;
    private Long userId;
    private String boardCommentContent;
    private Long boardCommentRegdate;
    private Long ref;
    private Long step;
    private Long depth;
}
