package com.spendwise.backend.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spendwise.backend.dto.DeploymentResponse;
import com.spendwise.backend.entity.Deployment;
import com.spendwise.backend.service.DeploymentService;
import com.spendwise.backend.util.ApiResponse;

@RestController
@RequestMapping("/api/deployments")
public class DeploymentController {

    private static final Logger logger =
            LoggerFactory.getLogger(DeploymentController.class);

    private final DeploymentService deploymentService;

    public DeploymentController(DeploymentService deploymentService) {
        this.deploymentService = deploymentService;
    }

    // Get Latest Deployment
    @GetMapping("/latest")
    public ApiResponse<DeploymentResponse> getLatestDeployment() {

        logger.info("Fetching latest deployment");

        DeploymentResponse response = deploymentService.getLatestDeployment()
                .map(deployment -> new DeploymentResponse(
                        deployment.getVersion(),
                        deployment.getEnvironment(),
                        deployment.getStatus(),
                        deployment.getDeployedAt().toString()
                ))
                .orElse(new DeploymentResponse(
                        "N/A",
                        "N/A",
                        "NO DEPLOYMENTS",
                        "N/A"
                ));

        logger.info("Latest deployment fetched successfully");

        return new ApiResponse<>(
                true,
                "Latest deployment retrieved successfully",
                response
        );
    }

    // Trigger Deployment
    @PostMapping("/trigger")
    public ApiResponse<Deployment> triggerDeployment() {

        logger.info("Deployment trigger requested");

        Deployment deployment = deploymentService.triggerDeployment();

        logger.info("Deployment '{}' completed successfully",
                deployment.getVersion());

        return new ApiResponse<>(
                true,
                "Deployment triggered successfully",
                deployment
        );
    }
}