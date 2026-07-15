pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
    }

    environment {
        IMAGE_NAME = "spendwise-backend"
        CONTAINER_NAME = "spendwise-backend"
    }

    stages {

        stage('Checkout Source') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Krishnapriya1911/expense-tracker.git'
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    bat 'mvnw.cmd clean package -DskipTests'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('backend') {
                    bat "docker build -t %IMAGE_NAME% ."
                }
            }
        }

        stage('Stop Old Container') {
            steps {
                bat """
                docker stop %CONTAINER_NAME%
                docker rm %CONTAINER_NAME%
                """
            }
        }

        stage('Run Container') {
            steps {
                bat """
                docker run -d ^
                --name %CONTAINER_NAME% ^
                -p 8081:8081 ^
                %IMAGE_NAME%
                """
            }
        }
    }

    post {
        success {
            echo "BUILD SUCCESSFUL!"
            archiveArtifacts artifacts: 'backend/target/*.jar', fingerprint: true
        }

        failure {
            echo "BUILD FAILED!"
        }
    }
}