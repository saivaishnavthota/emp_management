import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
 import "../Styles/ManagerDashboard.css";
// import EmployeeAttendence from "./EmployeeAttendence";
// import EmployeeUploadDocs from "./EmployeeUploadDocs";
import ManagerEmployees from "./ManagerEmployees";
import ApplyLeave from "./ManagerApplyLeave";
import LeaveManagement from "./ManagerLeaveManagement";
import Logo from "../../assets/Nxzen-logo.jpg";
import { Link, useLocation, Routes, Route } from "react-router-dom";

export default function ManagerDashboard() {
  const location = useLocation();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const menuItems = [
  { name: "Add Attendance", path: "attendance" },
  { name:  "Employee", path:"employee"},
  { name: "Apply Leave", path: "apply-leave" },
  { name: "Leave Management", path: "leave-manage" },
  { name: "Upload Documents", path: "upload-docs" },
  { name: "Change Password", path: "change-password" },
];

  return (
    <div className="dashboard">
      
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setSidebarOpen(false)} 
            className={`sidebar-btn ${
              location.pathname === item.path ? "active" : ""
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
                    <h2 className="logo-text">Manager Dashboard</h2>
                  </div>
                
                  <button className="hamburger-btn" onClick={toggleSidebar}>
                    <FontAwesomeIcon icon={sidebarOpen ? faTimes : faBars} />
                  </button>
                    
                  <div className="profile" onClick={toggleDropdown}>
                    <FontAwesomeIcon icon={faUser} className="profile-icon" />
                    {dropdownOpen && (
                      <div className="profile-menu">
                        <button className="profile-menu-item">View Profile</button>
                        <button className="profile-menu-item">Logout</button>
                      </div>
                    )}
                  </div>
                </header>

        <main className="content">
  <Routes>
    <Route index element={<h3>Welcome to Manager Dashboard</h3>} />
    {/* <Route path="attendance" element={<EmployeeAttendence />} /> */}
    {/* <Route path="upload-docs" element={<EmployeeUploadDocs />} /> */}
    <Route path="employee" element={<ManagerEmployees />} />
    <Route path="apply-leave" element={<ApplyLeave />} />
    <Route path="leave-manage" element={<LeaveManagement />} />
    {/* <Route path="change-password" element={<UpdatePassword />} /> */}
  </Routes>
</main>

      </div>
    </div>
  );
}

