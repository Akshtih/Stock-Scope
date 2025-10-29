package com.stockscope.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(basePackages = "com.stockscope.repository")
@EnableMongoAuditing
public class MongoConfig {
    // MongoDB configuration will be loaded from application.properties
    // This class enables MongoDB repositories and auditing features
}
