pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
    }

    environment {
        IMAGE_NAME = "spendwise-backend"
        CONTAINER_NAME = "spendwise-backend"
        NETWORK_NAME = "spendwisebackend_default"
    }

    stages {

        stage('Checkout Source') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Krishnapriya1911/mini-devops-automation-platform.git'
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh './mvnw clean package -DskipTests'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('backend') {
                    sh "docker build -t ${IMAGE_NAME} ."
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
                --network ${NETWORK_NAME} \
                -p 8081:8081 \
                ${IMAGE_NAME}
                """
            }
        }
    }

    post {
        success {
            echo 'BUILD SUCCESSFUL!'
            archiveArtifacts artifacts: 'backend/target/*.jar', fingerprint: true
        }

        failure {
            echo 'BUILD FAILED!'
        }
    }
}
