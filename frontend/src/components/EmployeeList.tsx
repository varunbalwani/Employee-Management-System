import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiService, { Employee } from "../api";
import { useAuth } from "../context/AuthContext";

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

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

    if (!isAuthenticated) {
      alert("Please login to perform this action");
      return;
    }

    if (user?.role !== "ROLE_ADMIN") {
      alert("Only Admin can delete the employee");
      return;
    }

    if (window.confirm("Are you sure you want to delete this employee?")) {
      apiService
        .deleteEmployee(id)
        .then(() => {
          loadEmployees();
        })
        .catch((error) => console.error("Error deleting employee:", error));
    }
  };

  const handleUpdate = (employee: Employee) => {
    if (!isAuthenticated) {
      alert("Please login to perform this action");
      return;
    }
    if (user?.role === "ROLE_ADMIN" || user?.username === employee.createdBy) {
      navigate(`/edit/${employee.id}`);
    } else {
      alert("You are not authorized to update this employee");
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div></div>
        <h2 className="text-center">List of Employees</h2>
        <div className="d-flex align-items-center gap-2">
          {isAuthenticated ? (
            <>
              <span className="badge bg-info text-dark fs-6">
                {user?.username} ({user?.role === "ROLE_ADMIN" ? "Admin" : "User"})
              </span>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="btn btn-outline-danger"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary">Login</Link>
              <Link to="/register" className="btn btn-secondary">Register</Link>
            </>
          )}
        </div>
      </div>
      {isAuthenticated && (
        <Link to="/add" className="btn btn-primary mb-3">
          Add Employee
        </Link>
      )}
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Added By</th>
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
              <td>{employee.createdBy || "N/A"}</td>
              <td>
                <button
                  onClick={() => handleUpdate(employee)}
                  className="btn btn-info"
                >
                  Update
                </button>
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
