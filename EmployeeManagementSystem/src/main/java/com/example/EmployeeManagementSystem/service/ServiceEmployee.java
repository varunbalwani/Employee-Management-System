package com.example.EmployeeManagementSystem.service;

import com.example.EmployeeManagementSystem.dto.DtoEmployee;
import com.example.EmployeeManagementSystem.exception.ExceptionEmployee;
import com.example.EmployeeManagementSystem.mapper.MapperEmployee;
import com.example.EmployeeManagementSystem.model.Employee;
import com.example.EmployeeManagementSystem.repository.RepositoryEmployee;
import org.hibernate.mapping.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceEmployee implements ServiceEmployeeIn {
    @Autowired
    private RepositoryEmployee repositoryEmployee;

    @Autowired
    private com.example.EmployeeManagementSystem.repository.UserRepository userRepository;

    @Override
    public DtoEmployee createEmployee(DtoEmployee dtoEmployee) {
        Employee employee = MapperEmployee.mapTOEmployee(dtoEmployee);

        // Set Created By
        String username = org.springframework.security.core.context.SecurityContextHolder.getContext()
                .getAuthentication().getName();
        com.example.EmployeeManagementSystem.model.User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        employee.setCreatedBy(user);

        Employee savedEmployee = repositoryEmployee.save(employee);
        return MapperEmployee.mapToDtoEmployee(savedEmployee);
    }

    @Override
    public DtoEmployee findById(int id) {
        Employee employee = repositoryEmployee.findById(id).orElseThrow(
                () -> new ExceptionEmployee("The Employee is not founded by this give Id" + id));
        return MapperEmployee.mapToDtoEmployee(employee);
    }

    @Override
    public List<DtoEmployee> findAllEmployee() {
        List<Employee> employees = repositoryEmployee.findAll();
        return employees.stream().map(
                (employee) -> MapperEmployee.mapToDtoEmployee(employee)).collect(Collectors.toList());

    }

    @Override
    public DtoEmployee updateEmployee(int id, DtoEmployee updatedemployee) {
        Employee employee = repositoryEmployee.findById(id).orElseThrow(
                () -> new ExceptionEmployee("The Employee is not exist or found by given id" + id));

        // RBAC Check
        org.springframework.security.core.Authentication authentication = org.springframework.security.core.context.SecurityContextHolder
                .getContext().getAuthentication();
        String currentUsername = authentication.getName();
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        if (!isAdmin && (employee.getCreatedBy() == null
                || !employee.getCreatedBy().getUsername().equals(currentUsername))) {
            throw new RuntimeException("You are not authorized to update this employee");
        }

        employee.setFirstname(updatedemployee.getFirstname());
        employee.setLastname(updatedemployee.getLastname());
        employee.setEmail(updatedemployee.getEmail());
        return MapperEmployee.mapToDtoEmployee(repositoryEmployee.save(employee));
    }

    @Override
    public void deleteEmployee(int id) {
        Employee employee = repositoryEmployee.findById(id)
                .orElseThrow(() -> new ExceptionEmployee("The Employee is not exist or found by given id" + id));
        repositoryEmployee.delete(employee);
    }

}
