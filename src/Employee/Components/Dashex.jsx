import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faArrowLeft,
  faArrowRight,
  faCalendarCheck,
  faPaperPlane,
  faUpload,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import "../Styles/Dash.css";

export default function Dashex() {
  const [isOpen, setIsOpen] = useState(true); 
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { name: "Add Attendance", icon: faCalendarCheck},
    { name: "Apply Leave", icon: faPaperPlane },
    { name: "Upload Documents", icon: faUpload },
    { name: "Set Password", icon: faKey },
  ];

  return (
    <div className="dashboard">
      
      <header className="header">
        <h1>Employee Dashboard</h1>
      </header>

      <div className="main">
       
        <aside className={`sidebar desktop-only ${isOpen ? "open" : "collapsed"}`}>
          <button
            className="toggle-btn desktop-only"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FontAwesomeIcon icon={isOpen ? faArrowLeft : faArrowRight} />
          </button>
          <nav>
            {menuItems.map((item, idx) => (
              <div key={idx} className="menu-item">
                <a href="#">
                  <FontAwesomeIcon icon={item.icon} className="menu-icon" />
                  {isOpen && <span className="menu-text">{item.name}</span>}
                </a>
                {!isOpen && <span className="tooltip">{item.name}</span>}
              </div>
            ))}
          </nav>
        </aside>

       
        <aside
          className={`sidebar.mobile-only ${
            isMobileOpen ? "mobile-open" : "mobile-collapsed"
          }`}
        >
          
          <button
            className="toggle-btn"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            <FontAwesomeIcon icon={isMobileOpen ? faArrowLeft : faBars} />
          </button>

         
          {isMobileOpen && (
            <nav>
              {menuItems.map((item, idx) => (
                <a key={idx} href="#" className="menu-item">
                  <FontAwesomeIcon icon={item.icon} className="menu-icon" />
                  <span className="menu-text">{item.name}</span>
                </a>
              ))}
            </nav>
          )}
        </aside>

      
        <main className="content">
          <h2>Welcome to Dashboard</h2>
        </main>
      </div>
    </div>
  );
}