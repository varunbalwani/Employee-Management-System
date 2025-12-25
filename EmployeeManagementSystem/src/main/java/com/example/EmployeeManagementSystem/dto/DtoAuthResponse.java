package com.example.EmployeeManagementSystem.dto;

public class DtoAuthResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private String username;
    private String role;
    private Long id;

    public DtoAuthResponse(String accessToken, String username, String role, Long id) {
        this.accessToken = accessToken;
        this.username = username;
        this.role = role;
        this.id = id;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
