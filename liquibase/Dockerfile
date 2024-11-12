FROM liquibase/liquibase:alpine

COPY /db/changelog /liquibase/changelog

WORKDIR /liquibase

ENV LIQUIBASE_COMMAND_URL=jdbc:postgresql://postgres:5432/postgres
ENV LIQUIBASE_COMMAND_USERNAME=postgres
ENV LIQUIBASE_COMMAND_PASSWORD=postgres
ENV LIQUIBASE_COMMAND_CHANGELOG_FILE=changelog/changelog.sql
