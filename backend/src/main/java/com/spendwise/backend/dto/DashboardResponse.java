package com.spendwise.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DashboardResponse {

    private long totalBuilds;
    private long successfulBuilds;
    private long failedBuilds;
    private String latestDeploymentStatus;

}