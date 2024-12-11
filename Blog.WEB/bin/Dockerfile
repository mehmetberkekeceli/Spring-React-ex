#FROM openjdk:8-jdk-alpine
FROM openjdk:8-jre
ADD target/blog-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]