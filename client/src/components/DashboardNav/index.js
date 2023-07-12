import React from "react";
import './style.css';

export default function Navbar({ navLinks = [], currentLink, setCurrentLink }) {
    return (
        <ul id="" className="nav nav-tabs nav-background justify-content-center">
            {navLinks.map((navLink) => (
                <li key={navLink.name} className="nav-item">
                    <a
                        className={`nav-link  nav-text${currentLink === navLink ? 'active' : ''}`}
                        href={navLink.url}
                        onClick={() => {
                            setCurrentLink(navLink);
                        }}
                    >
                        {navLink.name}
                    </a>
                </li>
            ))}
        </ul>
    );
};