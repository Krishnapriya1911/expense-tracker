package com.spendwise.backend.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spendwise.backend.dto.DashboardResponse;
import com.spendwise.backend.service.BuildService;
import com.spendwise.backend.service.DeploymentService;
import com.spendwise.backend.util.ApiResponse;

@RestController
@RequestMapping("/api")
public class DashboardController {

    private static final Logger logger =
            LoggerFactory.getLogger(DashboardController.class);

    private final BuildService buildService;
    private final DeploymentService deploymentService;

    public DashboardController(BuildService buildService,
                               DeploymentService deploymentService) {
        this.buildService = buildService;
        this.deploymentService = deploymentService;
    }

    @GetMapping("/dashboard")
    public ApiResponse<DashboardResponse> getDashboard() {

        logger.info("Dashboard requested");

        long totalBuilds = buildService.getTotalBuilds();

        long successfulBuilds = buildService.getAllBuilds()
                .stream()
                .filter(build -> "SUCCESS".equalsIgnoreCase(build.getStatus()))
                .count();

        long failedBuilds = buildService.getAllBuilds()
                .stream()
                .filter(build -> "FAILED".equalsIgnoreCase(build.getStatus()))
                .count();

        String latestDeploymentStatus = deploymentService
                .getLatestDeployment()
                .map(deployment -> deployment.getStatus())
                .orElse("NO DEPLOYMENTS");

        DashboardResponse response = new DashboardResponse(
                totalBuilds,
                successfulBuilds,
                failedBuilds,
                latestDeploymentStatus
        );

        logger.info("Dashboard data sent successfully");

        return new ApiResponse<>(
                true,
                "Dashboard Data Retrieved Successfully",
                response
        );
    }
}