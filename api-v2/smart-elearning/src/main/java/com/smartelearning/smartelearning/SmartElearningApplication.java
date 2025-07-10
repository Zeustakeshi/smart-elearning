package com.smartelearning.smartelearning;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class SmartElearningApplication {

	public static void main(String[] args) {
		SpringApplication.run(SmartElearningApplication.class, args);
	}
}
