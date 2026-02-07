# Stage 1: Build with Maven (only use source code)
FROM maven:3.9.4-eclipse-temurin-17 AS build
WORKDIR /app

# Copy ONLY pom.xml first for dependency caching
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code
COPY src ./src

# Build Spring Boot JAR
RUN mvn clean package -DskipTests


# Stage 2: Run minimal JRE image (supports ARM64 and AMD64)
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copy the jar from the build stage
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
