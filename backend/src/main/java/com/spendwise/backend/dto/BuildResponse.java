package com.spendwise.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class BuildResponse {

    private String buildNumber;
    private String status;
    private String duration;
    private String triggeredBy;
}