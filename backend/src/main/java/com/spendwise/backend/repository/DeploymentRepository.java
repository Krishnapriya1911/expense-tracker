package com.spendwise.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spendwise.backend.entity.Deployment;

@Repository
public interface DeploymentRepository extends JpaRepository<Deployment, Long> {

}