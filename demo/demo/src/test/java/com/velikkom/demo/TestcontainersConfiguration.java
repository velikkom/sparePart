package com.velikkom.demo;

import org.springframework.boot.test.context.TestConfiguration;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.utility.DockerImageName;

@TestConfiguration(proxyBeanMethods = false)
class TestcontainersConfiguration {

    private static final PostgreSQLContainer<?> POSTGRESQL_CONTAINER;

    static {
        POSTGRESQL_CONTAINER = new PostgreSQLContainer<>(DockerImageName.parse("postgres:16.0"))
                .withDatabaseName("testdb")
                .withUsername("testuser")
                .withPassword("testpassword");

        POSTGRESQL_CONTAINER.start();
    }

    public static PostgreSQLContainer<?> getPostgreSQLContainer() {
        return POSTGRESQL_CONTAINER;
    }
}
