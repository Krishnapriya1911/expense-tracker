pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
    }

    environment {
        APP_NAME = "spendwise-backend"
        IMAGE_NAME = "spendwise-backend"
        CONTAINER_NAME = "spendwise-backend"
    }

    stages {

        stage('Checkout Source') {
            steps {
                git branch: 'feature/backend',
                    url: 'https://github.com/Krishnapriya1911/expense-tracker.git'
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'chmod +x mvnw || true'
                    sh './mvnw clean package -DskipTests'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('backend') {
                    sh "docker build -t ${IMAGE_NAME}:latest ."
                }
            }
        }

        stage('Stop Old Container') {
            steps {
                sh """
                docker stop ${CONTAINER_NAME} || true
                docker rm ${CONTAINER_NAME} || true
                """
            }
        }

        stage('Run Container') {
            steps {
                sh """
                docker run -d \
                --name ${CONTAINER_NAME} \
                -p 8081:8081 \
                ${IMAGE_NAME}:latest
                """
            }
        }
    }

    post {

        success {
            echo "==============================="
            echo "BUILD SUCCESSFUL!"
            echo "Docker Container Running!"
            echo "==============================="

            archiveArtifacts artifacts: 'backend/target/*.jar', fingerprint: true
        }

        failure {
            echo "==============================="
            echo "BUILD FAILED!"
            echo "==============================="
        }
    }
}