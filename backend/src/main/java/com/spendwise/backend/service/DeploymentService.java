package com.spendwise.backend.service;

import java.util.List;
import java.util.Optional;

import com.spendwise.backend.entity.Deployment;

public interface DeploymentService {

    Deployment saveDeployment(Deployment deployment);

    List<Deployment> getAllDeployments();

    Optional<Deployment> getDeploymentById(Long id);

    Optional<Deployment> getLatestDeployment();

    void deleteDeployment(Long id);

    Deployment triggerDeployment();
}