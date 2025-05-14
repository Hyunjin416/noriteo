package com.ptu.noriteo.model;

import lombok.Data;
import java.sql.Timestamp;

@Data
public class BoardLike {
    private long boardLikeId;
    private long userId;
    private long boardId;
    private Timestamp boardLikeRegdate;
}
