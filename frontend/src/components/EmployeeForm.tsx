import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiService from "../api";

const EmployeeForm = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      apiService
        .getEmployeeById(Number(id))
        .then((response) => {
          const { firstname, lastname, email } = response.data;
          setFirstName(firstname);
          setLastName(lastname);
          setEmail(email);
        })
        .catch((error) =>
          console.error("Error fetching employee data:", error)
        );
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    console.log("Submit button clicked!");
    e.preventDefault();
    const employee = { firstname, lastname, email };

    if (id) {
      apiService
        .updateEmployee(Number(id), employee)
        .then(() => navigate("/"))
        .catch((error) => console.error("Error updating employee:", error));
    } else {
      apiService
        .createEmployee(employee)
        .then(() => navigate("/"))
        .catch((error) => console.error("Error creating employee:", error));
    }
  };

  return (
    <div className="container mt-5">
      <div className="card col-md-6 offset-md-3">
        <h2 className="text-center mt-3">
          {id ? "Update Employee" : "Add Employee"}
        </h2>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-2">
              <label className="form-label">First Name:</label>
              <input
                type="text"
                className="form-control"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-2">
              <label className="form-label">Last Name:</label>
              <input
                type="text"
                className="form-control"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-2">
              <label className="form-label">Email:</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-success">
              Submit
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => navigate("/")}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
