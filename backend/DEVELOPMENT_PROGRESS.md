# SpendWise DevOps Automation Platform

## Backend Development Progress

**Developer:** Venkatesh

---

# Project Overview

SpendWise is a DevOps Automation Platform that simulates a complete CI/CD workflow using Spring Boot, MySQL, Docker, Jenkins, and GitHub.

---

# Completed Features

## Project Setup

- Spring Boot Project
- Maven Configuration
- MySQL Integration
- Swagger/OpenAPI
- Global Exception Handling

Status: ✅ Completed

---

## Database

Tables

- users
- builds
- deployments

Relationships

Deployment
↓

Build (One-to-One)

Status: ✅ Completed

---

## Entity Layer

- User
- Build
- Deployment

Status: ✅ Completed

---

## Repository Layer

- UserRepository
- BuildRepository
- DeploymentRepository

Status: ✅ Completed

---

## Service Layer

- UserService
- BuildService
- DeploymentService

Status: ✅ Completed

---

## Controllers

- AuthController
- HealthController
- DashboardController
- BuildController
- DeploymentController

Status: ✅ Completed

---

# APIs

## Authentication

POST /api/auth/login

Status: ✅

---

## Health

GET /api/health

Status: ✅

---

## Dashboard

GET /api/dashboard

Status: ✅

---

## Build APIs

GET /api/builds

POST /api/builds/trigger

Status: ✅

---

## Deployment APIs

GET /api/deployments/latest

POST /api/deployments/trigger

Status: ✅

---

# Exception Handling

GlobalExceptionHandler

Status: ✅

---

# Swagger

URL

http://localhost:8081/swagger-ui/index.html

Status: ✅

---

# Current Architecture

Frontend

↓

Controllers

↓

Services

↓

Repositories

↓

MySQL

---

# Pending Work

## Validation

- Login Validation
- DTO Validation
- Custom Error Messages

Status: ⏳

---

## Docker

- Dockerfile
- Docker Compose
- MySQL Container

Status: ⏳

---

## Jenkins

- Jenkins Installation
- Jenkinsfile
- Build Pipeline

Status: ⏳

---

## GitHub Webhooks

Status: ⏳

---

## CI/CD

GitHub

↓

Webhook

↓

Jenkins

↓

Docker Build

↓

Deployment

Status: ⏳

---

## Documentation

- README
- Screenshots
- Architecture Diagram
- API Documentation
- Setup Guide

Status: ⏳

---

# Current Progress

Backend Development

95%

Overall Project

75%

---

# Next Milestone

1. Validation
2. Docker
3. Docker Compose
4. Jenkins
5. GitHub Webhooks
6. CI/CD Pipeline
7. Documentation
8. Final Testing