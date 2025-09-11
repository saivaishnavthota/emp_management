import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import "../Styles/Dashboard.css";
import Logo from "../../assets/Nxzen-logo.jpg";
import Employees from "./Employees";
import OnboardingDocs from "./OnboardingDocs";
import LeaveManagement from "./LeaveManagement";
import EmployeeForm from "./EmployeeForm";
import CreateEmployee from "./CreateEmployee";
import { Link, useLocation, Routes, Route, useNavigate } from "react-router-dom";


export default function EmployeeDashboard() {

  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    sessionStorage.removeItem("accessToken");
    navigate("/");
  };

  const location = useLocation();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const menuItems = [
    { name: "CreateEmployee", path: "createemp" },
    { name: "Employees", path: "employees" },
    { name: "EmployeesForm", path: "employeesform" },
    { name: "Onboarding Documents", path: "onboard-docs" },
    { name: "LeaveManagement", path: "leave-manage" },
    { name: "Change Password", path: "change-password" },
  ];

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setSidebarOpen(false)}
            className={`sidebar-btn ${location.pathname === item.path ? "active" : ""
              }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div
        className={`overlay ${sidebarOpen ? "" : "hidden"}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <div className="main-section">
        <header className="header">

          <div className="logo">
            <img src={Logo} alt="Company Logo" className="logo-img" />
          </div>

          <button className="hamburger-btn" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={sidebarOpen ? faTimes : faBars} />
          </button>


          <div className="profile" onClick={toggleDropdown}>
            <FontAwesomeIcon icon={faUser} className="profile-icon" />
            {dropdownOpen && (
              <div className="profile-menu">
                <button className="profile-menu-item">View Profile</button>
                <button className="profile-menu-item" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </header>


        <main className="content">
          <Routes>
            <Route index element={<h3>Welcome to HR Dashboard</h3>} />
            <Route path="createemp" element={<CreateEmployee />} />
            <Route path="employees" element={<Employees />} />
            <Route path="employeesform" element={<EmployeeForm />} />
            <Route path="onboard-docs" element={<OnboardingDocs />} />
            <Route path="leave-manage" element={<LeaveManagement />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

