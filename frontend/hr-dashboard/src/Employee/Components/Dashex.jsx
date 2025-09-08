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
import "../Styles/Dash.css"; // import CSS file

export default function Dashex() {
  const [isOpen, setIsOpen] = useState(true); // desktop toggle
  const [isMobileOpen, setIsMobileOpen] = useState(false); // mobile toggle

  const menuItems = [
    { name: "Add Attendance", icon: faCalendarCheck },
    { name: "Apply Leave", icon: faPaperPlane },
    { name: "Upload Documents", icon: faUpload },
    { name: "Set Password", icon: faKey },
  ];

  return (
    <div className="dashboard">
      {/* HEADER */}
      <header className="header">
        <h1>Employee Dashboard</h1>


        {/* Mobile hamburger */}
        <button className="toggle-btn mobile-only" onClick={() => setIsMobileOpen(!isMobileOpen)}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </header>

      <div className="main">
        {/* Desktop Sidebar */}
        {true && (
        <aside className={`sidebar desktop-only ${isOpen ? "open" : "collapsed"}`}>
          <nav>
             <button className="toggle-btn desktop-only" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <FontAwesomeIcon icon={faArrowRight} />
          ) : (
            <FontAwesomeIcon icon={faArrowLeft} />
          )}
        </button>

            {menuItems.map((item, idx) => (
              <div key={idx} className="menu-item">
                <a href="#">
                  <FontAwesomeIcon icon={item.icon} className="menu-icon" />
                  {isOpen && <span className="menu-text">{item.name}</span>}
                </a>

                {/* Tooltip when collapsed */}
                {!isOpen && <span className="tooltip">{item.name}</span>}
              </div>
            ))}
          </nav>
        </aside>
        )}


        {isMobileOpen && (
          <div className="mobile-overlay mobile-only">
            <aside className="sidebar open">
              <button className="close-btn" onClick={() => setIsMobileOpen(false)}>
                ✕
              </button>
              <nav>
                {menuItems.map((item, idx) => (
                  <a key={idx} href="#" className="menu-item">
                    <FontAwesomeIcon icon={item.icon} className="menu-icon" />
                    <span className="menu-text">{item.name}</span>
                  </a>
                ))}
              </nav>
            </aside>
          </div>
        )}

        {/* Main content */}
        <main className="content">
          <h2>Welcome to Dashboard</h2>
        </main>
      </div>
    </div>
  );
}