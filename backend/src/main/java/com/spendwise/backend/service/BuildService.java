package com.spendwise.backend.service;

import java.util.List;
import java.util.Optional;

import com.spendwise.backend.entity.Build;

public interface BuildService {

    Build saveBuild(Build build);

    List<Build> getAllBuilds();

    Optional<Build> getBuildById(Long id);

    long getTotalBuilds();

    Build triggerBuild();
    
    void deleteBuild(Long id);
}