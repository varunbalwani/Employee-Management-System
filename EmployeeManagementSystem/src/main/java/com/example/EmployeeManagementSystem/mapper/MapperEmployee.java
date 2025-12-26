package com.example.EmployeeManagementSystem.mapper;

import com.example.EmployeeManagementSystem.dto.DtoEmployee;
import com.example.EmployeeManagementSystem.model.Employee;

public class MapperEmployee {

    // DTO → Entity
    public static Employee mapTOEmployee(DtoEmployee dto) {
        Employee employee = new Employee();

        // Only set ID if present (useful for update, ignore for create)
        if (dto.getId() != null) {
            employee.setId(dto.getId());
        }

        employee.setFirstname(dto.getFirstname());
        employee.setLastname(dto.getLastname());
        employee.setEmail(dto.getEmail());

        return employee;
    }

    // Entity → DTO
    public static DtoEmployee mapToDtoEmployee(Employee employee) {
        DtoEmployee dto = new DtoEmployee();

        dto.setId(employee.getId());
        dto.setFirstname(employee.getFirstname());
        dto.setLastname(employee.getLastname());
        dto.setEmail(employee.getEmail());
        if (employee.getCreatedBy() != null) {
            dto.setCreatedBy(employee.getCreatedBy().getUsername());
        }

        return dto;
    }
}
