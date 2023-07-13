import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import Auth from "../../utils/auth";

export default function Navbar({ navLinks = [], currentLink, setCurrentLink }) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleLogout = () => {
    Auth.logout();
  };

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  
  };

  const handleNavLinkClick = (navLink) => {
    setIsCollapsed(true);
    setCurrentLink(navLink);
  };

  return (
    <nav className="justify-content-center nav-background navbar navbar-expand-lg navbar-light nav-background nav-tabs nav" style={{ paddingBottom: 0 }}>
      <div className="container-fluid">
        <Link className="navbar-brand nav-text" to="/" style={{ paddingBottom: 10 }}>
          Scheduli
        </Link>
        <div style={{ paddingBottom: 7 }}>
          <button
            className="navbar-toggler"
            type="button"
            onClick={handleToggleCollapse}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div
          className={`collapse navbar-collapse${isCollapsed ? "" : " show"}`}
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto">
            {navLinks.map((navLink) => (
              <li key={navLink.name} className="nav-item nav-text">
                <Link
                  className={`nav-link nav-text ${currentLink === navLink ? "active" : ""
                    }`}
                  to={navLink.url}
                  onClick={() => handleNavLinkClick(navLink)}
                >
                  {navLink.name}
                </Link>
              </li>
            ))}
          </ul>
          <button className="logout-button nav-text custom-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

