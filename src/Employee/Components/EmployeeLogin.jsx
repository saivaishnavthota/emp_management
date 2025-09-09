import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope, faLock, faUserShield, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import "../Styles/EmployeeLogin.css";
import CompanyLogo from "../../assets/Nxzen-logo.jpg";
import loginImage from "../../assets/nxzen-image1.jpg"; 

const EmployeeLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "HR",
  });

  const [toast, setToast] = useState({message: null, isError: false});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.access_token);  
        localStorage.setItem("user", JSON.stringify({
        id: data.employeeId,
        name: data.name,
        role: data.role
  }));
        setToast({ message: data.message || "Login successful!", isError: false });

        setTimeout(() => {
          if (data.role === "HR") navigate("/hr-dashboard");
          else if (data.role === "Manager") navigate("/manager-dashboard");
          else navigate("/employee-dashboard");
        }, 1000);
      } else {
        setToast({ message: data.error || "Invalid credentials", isError: true });
      }
    } catch (err) {
      console.error("Login error:", err);
      setToast({ message: "Server error, please try again.", isError: true });
    }
  };

  useEffect(() => {
    if (toast.message) {
      const timer = setTimeout(() => setToast({ message: null, isError: false }), 1000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (

    <div className="login-page">
      <div className="login-left">
        <img src={loginImage} alt="Login Visual" className="login-image" />
      </div>

      <div className="login-right">
        <div className="login-container shadow-lg p-4 rounded">
          <div className="text-center mb-4">
            <img src={CompanyLogo} alt="Company Logo" className="company-logo mb-3" />
            <h2>Login</h2>
          </div>
          
           {toast.message && (
        <div className={`toast-message ${toast.isError ? "error" : "success"}`}>
          <FontAwesomeIcon icon={toast.isError ? faTimesCircle : faCheckCircle} className="me-2" />
          {toast.message}
        </div>
      )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3 input-group">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3 input-group">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faLock} />
              </span>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3 input-group">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faUserShield} />
              </span>
              <select
                name="role"
                className="form-select"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="">-- Select Role --</option>
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Employee">Employee</option>
              </select>
            </div>

            <button type="submit" className="btn-login w-100">
              <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLogin;
