import { useState, useEffect } from "react"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../../assets/Nxzen-logo.jpg";
import CreateEmployee from "./CreateEmployee";
import Employees from "./Employees";
import EmployeeForm from "./EmployeeForm";
import OnboardingDocs from "./OnboardingDocs";
import LeaveManagement from "./LeaveManagement";
import UpdatePassword from "../../Employee/Components/UpdatePassword";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import {
  faArrowLeft,
  faArrowRight,
  faCalendarCheck,
  faPaperPlane,
  faUpload,
  faKey,
  faUser,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";

import "../Styles/Dashboard.css"

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setIsOpen(false);
      else setIsOpen(true);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

 const menuItems = [
  { name: "Create Employee", icon: faUser, path: "createemp" },
  { name: "Employees", icon: faUserFriends, path: "employees" },
  { name: "EmployeesForm", icon: faCalendarCheck, path: "employeesform" },
  { name: "Onboarding Documents", icon: faUpload, path: "onboard-docs" },
  { name: "LeaveManagement", icon: faPaperPlane, path: "leave-manage" },
  { name: "Change Password", icon: faKey, path: "change-password" },
];


  return (
    <div className="dashboard">
      {/* Header */}
      <header className="header">
        <div className="logo" onClick={() => navigate("/")}>
          <img src={Logo} alt="Company Logo" className="logo-img" />
          <h2 className="logo-text">HR Dashboard</h2>
        </div>
      </header>

      <div className="main">
        {/* Toggle Sidebar */}
        <button
          className="toggle-btn"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FontAwesomeIcon icon={isOpen ? faArrowLeft : faArrowRight} />
        </button>

        {/* Sidebar */}
        <aside className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
          <nav>
            {menuItems.map((item, idx) => (
              <div key={idx} className="menu-item">
                <Link
                  to={`/${item.path}`}
                  className="menu-link"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <FontAwesomeIcon icon={item.icon} className="menu-icon" />
                  {isOpen && <span className="menu-text">{item.name}</span>}
                </Link>
                {!isOpen && <span className="tooltip">{item.name}</span>}
              </div>
            ))}
          </nav>
        </aside>

        {/* Content Area */}
        <main className="content">
          <Routes>
    <Route index element={<h3>Welcome to HR Dashboard</h3>} />
    <Route path="createemp" element={<CreateEmployee />} />
    {/* <Route path="employees" element={<Employees />} /> */}
    <Route path="employeesform" element={<EmployeeForm />} />
    <Route path="onboard-docs" element={<OnboardingDocs />} />
    <Route path="leave-manage" element={<LeaveManagement />} />
    <Route path="change-password" element={<UpdatePassword/>}/>
  </Routes>
        </main>
      </div>
    </div>
  );
}
