package com.contactbook.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Enables CORS so the React frontend (running on a different port/domain,
 * e.g. localhost:5173 in dev or your Vercel URL in production) is allowed
 * to call this backend's REST APIs.
 *
 * The allowed origin is read from an environment variable so you don't
 * have to hardcode localhost or change code before deploying.
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    // Reads FRONTEND_URL env variable; falls back to Vite's default dev port.
    private final String frontendUrl = System.getenv()
            .getOrDefault("FRONTEND_URL", "http://localhost:5173");

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(frontendUrl, "http://localhost:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
