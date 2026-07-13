package com.spendwise.backend.service.impl;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.spendwise.backend.entity.Build;
import com.spendwise.backend.entity.Deployment;
import com.spendwise.backend.repository.BuildRepository;
import com.spendwise.backend.repository.DeploymentRepository;
import com.spendwise.backend.service.DeploymentService;

@Service
public class DeploymentServiceImpl implements DeploymentService {

    private final DeploymentRepository deploymentRepository;
    private final BuildRepository buildRepository;

    public DeploymentServiceImpl(DeploymentRepository deploymentRepository,
                                 BuildRepository buildRepository) {
        this.deploymentRepository = deploymentRepository;
        this.buildRepository = buildRepository;
    }

    @Override
    public Deployment saveDeployment(Deployment deployment) {
        return deploymentRepository.save(deployment);
    }

    @Override
    public List<Deployment> getAllDeployments() {
        return deploymentRepository.findAll();
    }

    @Override
    public Optional<Deployment> getDeploymentById(Long id) {
        return deploymentRepository.findById(id);
    }

    @Override
    public Optional<Deployment> getLatestDeployment() {
        return deploymentRepository.findAll()
                .stream()
                .max(Comparator.comparing(Deployment::getDeployedAt));
    }

    @Override
    public void deleteDeployment(Long id) {
        deploymentRepository.deleteById(id);
    }

    @Override
    public Deployment triggerDeployment() {

        Optional<Build> latestBuild = buildRepository.findAll()
                .stream()
                .max(Comparator.comparing(Build::getStartedAt));

        if (latestBuild.isEmpty()) {
            throw new RuntimeException("No build available for deployment.");
        }

        Deployment deployment = Deployment.builder()
                .version("v1.0." + UUID.randomUUID().toString().substring(0, 4))
                .environment("DEV")
                .status("SUCCESS")
                .deployedAt(LocalDateTime.now())
                .build(latestBuild.get())
                .build();

        return deploymentRepository.save(deployment);
    }
}