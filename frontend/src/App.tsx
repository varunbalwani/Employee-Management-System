import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import Login from "./components/Login";
import Register from "./components/Register";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/add" element={<EmployeeForm />} />
          <Route path="/edit/:id" element={<EmployeeForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
