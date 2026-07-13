package com.spendwise.backend.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spendwise.backend.dto.BuildResponse;
import com.spendwise.backend.entity.Build;
import com.spendwise.backend.service.BuildService;
import com.spendwise.backend.util.ApiResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/builds")
@Tag(
    name = "Build Management",
    description = "APIs for managing build operations"
)
public class BuildController {

    private static final Logger logger =
            LoggerFactory.getLogger(BuildController.class);

    private final BuildService buildService;

    public BuildController(BuildService buildService) {
        this.buildService = buildService;
    }

    @Operation(
            summary = "Get Build History",
            description = "Retrieve all builds"
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Build history retrieved successfully"
            )
    })
    @GetMapping
    public ApiResponse<List<BuildResponse>> getAllBuilds() {

        logger.info("Fetching build history");

        List<BuildResponse> builds = buildService.getAllBuilds()
                .stream()
                .map(build -> new BuildResponse(
                        build.getBuildNumber(),
                        build.getStatus(),
                        build.getDuration(),
                        build.getTriggeredBy()
                ))
                .collect(Collectors.toList());

        logger.info("Returned {} build(s)", builds.size());

        return new ApiResponse<>(
                true,
                "Build history retrieved successfully",
                builds
        );
    }

    @Operation(
            summary = "Trigger Build",
            description = "Trigger a new build"
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Build triggered successfully"
            )
    })
    @PostMapping("/trigger")
    public ApiResponse<Build> triggerBuild() {

        logger.info("Build trigger requested");

        Build build = buildService.triggerBuild();

        logger.info("Build '{}' triggered successfully", build.getBuildNumber());

        return new ApiResponse<>(
                true,
                "Build triggered successfully",
                build
        );
    }
}