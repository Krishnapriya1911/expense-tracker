package com.spendwise.backend.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.spendwise.backend.entity.Build;
import com.spendwise.backend.repository.BuildRepository;
import com.spendwise.backend.service.BuildService;

@Service
public class BuildServiceImpl implements BuildService {

    private final BuildRepository buildRepository;

    public BuildServiceImpl(BuildRepository buildRepository) {
        this.buildRepository = buildRepository;
    }

    @Override
    public Build saveBuild(Build build) {
        return buildRepository.save(build);
    }

    @Override
    public List<Build> getAllBuilds() {
        return buildRepository.findAll();
    }

    @Override
    public Optional<Build> getBuildById(Long id) {
        return buildRepository.findById(id);
    }

    @Override
    public long getTotalBuilds() {
        return buildRepository.count();
    }

    @Override
    public void deleteBuild(Long id) {
        buildRepository.deleteById(id);
    }

    @Override
    public Build triggerBuild() {

        Build build = Build.builder()
                .buildNumber("BUILD-" + UUID.randomUUID().toString().substring(0, 8))
                .status("SUCCESS")
                .duration("20s")
                .startedAt(LocalDateTime.now())
                .finishedAt(LocalDateTime.now().plusSeconds(20))
                .triggeredBy("admin")
                .build();

        return buildRepository.save(build);
    }
}