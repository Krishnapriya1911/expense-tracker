# 💰 SpendWise – Smart Expense Tracker

SpendWise is a full-stack expense tracking application designed to help users efficiently manage their daily expenses. The project demonstrates modern software development and DevOps practices by integrating a Spring Boot backend, MySQL database, Docker containerization, Docker Compose orchestration, and Jenkins CI/CD automation.

---

## 📌 Project Overview

SpendWise enables users to manage expense-related information while showcasing an end-to-end DevOps workflow.

The project includes:

- RESTful Backend APIs
- MySQL Database Integration
- Dockerized Deployment
- Docker Compose Multi-Container Setup
- Jenkins Continuous Integration & Deployment Pipeline
- GitHub Version Control

---

## 🚀 Features

### Backend

- User Authentication
- Build Management APIs
- Deployment Management APIs
- Dashboard Analytics
- Health Monitoring API
- Global Exception Handling
- Request Validation
- Logging Support

### DevOps

- Dockerized Spring Boot Application
- Docker Compose Configuration
- Jenkins CI/CD Pipeline
- Automated Build Process
- Automated Container Deployment
- GitHub Integration

---

## 🛠️ Tech Stack

### Backend
- Java 21
- Spring Boot 3
- Spring Data JPA
- Hibernate
- Maven

### Database
- MySQL 8

### DevOps
- Docker
- Docker Compose
- Jenkins

### Tools
- Git
- GitHub
- VS Code
- Postman

---

## 📂 Project Structure

```
expense-tracker/
│
├── backend/
│   ├── controller/
│   ├── dto/
│   ├── entity/
│   ├── repository/
│   ├── service/
│   ├── exception/
│   └── BackendApplication.java
│
├── frontend/
│
├── devops/
│
├── jenkins/
│   └── Dockerfile
│
├── docker-compose.yml
├── Jenkinsfile
└── README.md
```

---

## ⚙️ Setup Instructions

### Clone Repository

```bash
git clone https://github.com/Krishnapriya1911/expense-tracker.git
cd expense-tracker
```

---

### Start Services

```bash
docker compose up -d --build
```

---

### Verify Running Containers

```bash
docker ps
```

Expected containers:

- spendwise-backend
- spendwise-mysql
- jenkins

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/health | Health Check |
| POST | /api/auth/login | User Login |
| GET | /api/builds | Get Build History |
| POST | /api/builds/trigger | Trigger Build |
| GET | /api/deployments/latest | Latest Deployment |
| POST | /api/deployments/trigger | Trigger Deployment |
| GET | /api/dashboard | Dashboard Summary |

---

## 🧪 API Testing

The backend APIs were tested successfully using:

- Postman
- PowerShell Invoke-RestMethod

Verified APIs:

- Health API
- Authentication API
- Build API
- Deployment API
- Dashboard API

---

## 🐳 Docker Deployment

Build Docker Image

```bash
docker build -t spendwise-backend .
```

Run Container

```bash
docker compose up -d
```

---

## 🔄 Jenkins CI/CD Pipeline

Pipeline Workflow:

```
GitHub
   │
   ▼
Jenkins
   │
   ▼
Maven Build
   │
   ▼
Docker Image Build
   │
   ▼
Container Deployment
```

Pipeline Stages:

- Checkout Source Code
- Build Spring Boot Application
- Package JAR
- Build Docker Image
- Stop Existing Container
- Deploy Latest Container

---

## 📊 Project Workflow

```
Client
   │
   ▼
Spring Boot REST API
   │
   ▼
Service Layer
   │
   ▼
Repository Layer
   │
   ▼
MySQL Database
```

---

## 📷 Screenshots

Add screenshots of:

- Jenkins Dashboard
- Successful Pipeline
- Docker Containers
- Health API
- Login API
- Dashboard API
- Build API
- Deployment API

---

## 👥 Team

Project: SpendWise – Smart Expense Tracker

Backend & Deployment Engineer

- Spring Boot Backend Development
- MySQL Database Integration
- REST API Development
- Docker Containerization
- Docker Compose
- Jenkins CI/CD Pipeline
- Container Deployment

---

## 🎯 Future Enhancements

- JWT Authentication
- Role-Based Authorization
- Email Notifications
- Prometheus Monitoring
- Grafana Dashboard
- Kubernetes Deployment
- Cloud Deployment (AWS/Azure)

---

## 📄 License

This project was developed for educational and learning purposes.