package com.contactbook;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main entry point of the Contact Book Spring Boot application.
 * Running this class starts an embedded Tomcat server (default port 8080)
 * and boots up the whole backend.
 */
@SpringBootApplication
public class ContactBookApplication {

    public static void main(String[] args) {
        SpringApplication.run(ContactBookApplication.class, args);
    }

}
