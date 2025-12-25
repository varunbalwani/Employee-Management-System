package com.example.EmployeeManagementSystem.scheduler;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class KeepAliveScheduler {

    @Value("${RENDER_EXTERNAL_URL:http://localhost:8080}")
    private String appUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    @Scheduled(fixedRate = 600000) // 10 minutes in milliseconds
    public void pingSelf() {
        try {
            String healthUrl = appUrl + "/health";
            restTemplate.getForObject(healthUrl, String.class);
            System.out.println("Self-ping successful: " + healthUrl);
        } catch (Exception e) {
            System.err.println("Self-ping failed: " + e.getMessage());
        }
    }
}
