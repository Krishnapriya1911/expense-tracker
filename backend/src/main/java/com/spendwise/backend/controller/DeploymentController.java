package com.spendwise.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spendwise.backend.dto.DeploymentResponse;
import com.spendwise.backend.entity.Deployment;
import com.spendwise.backend.service.DeploymentService;

@RestController
@RequestMapping("/api/deployments")
public class DeploymentController {

    private final DeploymentService deploymentService;

    public DeploymentController(DeploymentService deploymentService) {
        this.deploymentService = deploymentService;
    }

    // Get latest deployment
    @GetMapping("/latest")
    public DeploymentResponse getLatestDeployment() {

        return deploymentService.getLatestDeployment()
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
    }

    // Trigger deployment
    @PostMapping("/trigger")
    public Deployment triggerDeployment() {
        return deploymentService.triggerDeployment();
    }
}