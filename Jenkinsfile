pipeline {
    agent any

    environment {
        APP_NAME = "spendwise-backend"
        IMAGE_NAME = "spendwise-backend"
        CONTAINER_NAME = "spendwise-backend"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
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
                    sh 'docker build -t ${IMAGE_NAME}:latest .'
                }
            }
        }

        stage('Stop Old Container') {
            steps {
                sh '''
                docker stop ${CONTAINER_NAME} || true
                docker rm ${CONTAINER_NAME} || true
                '''
            }
        }

        stage('Run Container') {
            steps {
                sh '''
                docker run -d \
                --name ${CONTAINER_NAME} \
                -p 8081:8081 \
                ${IMAGE_NAME}:latest
                '''
            }
        }
    }

    post {

        success {
            echo '==============================='
            echo ' Build Successful!'
            echo ' Docker Container Running!'
            echo '==============================='
        }

        failure {
            echo '==============================='
            echo ' Build Failed!'
            echo '==============================='
        }

        always {
            archiveArtifacts artifacts: 'backend/target/*.jar', fingerprint: true
        }
    }
}