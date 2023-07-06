import React from "react";
import "./index.css"

export default function Navbar({ navLinks = [], currentLink, setCurrentLink }) {
    return (
        <ul id="" className="">
            {navLinks.map((navLink) => (
                <li key={navLink.name} className="nav-item">
                    <a
                        className={` ${currentLink === navLink ? 'active' : ''}`}
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