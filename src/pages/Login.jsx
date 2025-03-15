import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import './Login.css'


const Login = () => {
    const navigate = useNavigate() ;

    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.username || !formData.password) {
            setError("Username and password are required!");
            return;
        }
        setError("");
        console.log("Logging in with:", formData);
        // Perform login logic here
    };


    return (
        <div>
            <Header />

            <div className="login-container">
                <div className="login-box">
                    <h2>Login</h2>
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                            />
                        </div>
                        <button type="submit" className="login-button">Login</button>
                    </form>
                    <p className="register-text">
                        New here?{" "}
                        <span className="register-link" onClick={() => navigate("/register")}>
                            Register
                        </span>
                    </p>
                </div>
            </div>

            <Footer />

        </div>
    )
}



export default Login