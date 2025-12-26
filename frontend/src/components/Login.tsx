import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiService from "../api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await apiService.login({ username, password });
            login(response.data);
            navigate("/");
        } catch (err) {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="container mt-5">
            <div className="card col-md-6 offset-md-3">
                <h2 className="text-center mt-3">Login</h2>
                <div className="card-body">
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-2">
                            <label className="form-label">Username:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-label">Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                        <div className="mt-2">
                            Don't have an account? <Link to="/register">Register</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
