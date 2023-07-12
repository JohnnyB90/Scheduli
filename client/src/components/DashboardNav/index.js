import React from "react";
import "./style.css";
import Auth from "../../utils/auth";

export default function Navbar({ navLinks = [], currentLink, setCurrentLink }) {
  const handleLogout = () => {
    Auth.logout();
  };

  return (
    <ul id="" className="nav nav-tabs nav-background justify-content-center">
      {navLinks.map((navLink) => (
        <li key={navLink.name} className="nav-item">
          <a
            className={`nav-link nav-text ${
              currentLink === navLink ? "active" : ""
            }`}
            href={navLink.url}
            onClick={() => {
              setCurrentLink(navLink);
            }}
          >
            {navLink.name}
          </a>
        </li>
      ))}
      <li className="nav-item">
        <button className="nav-link nav-text" onClick={handleLogout}>
          Logout
        </button>
      </li>
    </ul>
  );
}
