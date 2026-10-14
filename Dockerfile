# ==========================================================
# Single-service build for Railway: Spring Boot API + static frontend
# Build context = repository root (contains backend/ and frontend/)
# ==========================================================
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

# Cache dependencies
COPY backend/pom.xml ./pom.xml
RUN mvn -B -q dependency:go-offline

# Backend source + frontend (served from classpath:/static by Spring Boot)
COPY backend/src ./src
COPY frontend ./src/main/resources/static

RUN mvn -B -q clean verify

# ---------- Runtime ----------
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY --from=build /app/target/*.jar app.jar
RUN chown -R appuser:appgroup /app
USER appuser

# Container-aware memory settings; Railway provides PORT at runtime
ENV JAVA_TOOL_OPTIONS="-XX:MaxRAMPercentage=75 -XX:+UseSerialGC -Xss512k"
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
