package com.spendwise.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DeploymentResponse {

    private String version;
    private String environment;
    private String status;
    private String deployedAt;
}