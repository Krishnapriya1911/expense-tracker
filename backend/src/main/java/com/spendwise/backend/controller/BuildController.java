package com.spendwise.backend.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spendwise.backend.dto.BuildResponse;
import com.spendwise.backend.entity.Build;
import com.spendwise.backend.service.BuildService;

@RestController
@RequestMapping("/api/builds")
public class BuildController {

    private final BuildService buildService;

    public BuildController(BuildService buildService) {
        this.buildService = buildService;
    }

    // Get all builds
    @GetMapping
    public List<BuildResponse> getAllBuilds() {

        return buildService.getAllBuilds()
                .stream()
                .map(build -> new BuildResponse(
                        build.getBuildNumber(),
                        build.getStatus(),
                        build.getDuration(),
                        build.getTriggeredBy()
                ))
                .collect(Collectors.toList());
    }

    // Trigger a new build
    @PostMapping("/trigger")
    public Build triggerBuild() {
        return buildService.triggerBuild();
    }
}