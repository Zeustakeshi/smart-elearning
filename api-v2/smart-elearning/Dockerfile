FROM openjdk:17-jdk-slim
LABEL authors="Minhhieuano"
LABEL description="Smart-elearning"
COPY target/*.jar app.jar
ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-jar", "/app.jar"]