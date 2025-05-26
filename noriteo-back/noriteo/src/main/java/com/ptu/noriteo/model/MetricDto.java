package com.ptu.noriteo.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MetricDto {
    private long userCount;
    private long boardCount;
    private long commentCount;
}
