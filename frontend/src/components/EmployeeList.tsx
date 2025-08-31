import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiService, { Employee } from "../api";

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = () => {
    apiService
      .getAllEmployees()
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error("Error fetching employees:", error));
  };

  const handleDelete = (id: number | undefined) => {
    if (id === undefined) return;
    apiService
      .deleteEmployee(id)
      .then(() => {
        // Refresh the list after a successful delete
        loadEmployees();
      })
      .catch((error) => console.error("Error deleting employee:", error));
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">List of Employees</h2>
      <Link to="/add" className="btn btn-primary mb-3">
        Add Employee
      </Link>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstname}</td>
              <td>{employee.lastname}</td>
              <td>{employee.email}</td>
              <td>
                <Link to={`/edit/${employee.id}`} className="btn btn-info">
                  Update
                </Link>
                <button
                  onClick={() => handleDelete(employee.id)}
                  className="btn btn-danger"
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
