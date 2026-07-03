package com.spendwise.backend.service.impl;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.spendwise.backend.entity.Deployment;
import com.spendwise.backend.repository.DeploymentRepository;
import com.spendwise.backend.service.DeploymentService;

@Service
public class DeploymentServiceImpl implements DeploymentService {

    private final DeploymentRepository deploymentRepository;

    public DeploymentServiceImpl(DeploymentRepository deploymentRepository) {
        this.deploymentRepository = deploymentRepository;
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
}