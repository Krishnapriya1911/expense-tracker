FROM jenkins/jenkins:lts-jdk21

USER root

# Install required packages
RUN apt-get update && \
    apt-get install -y \
    git \
    maven \
    docker.io && \
    apt-get clean

USER jenkins