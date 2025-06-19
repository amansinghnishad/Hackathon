import React from 'react';
import './Navbar.css';

const Navbar = () => {
  const navItems = [
    { label: 'PRODUCTS', hasDropdown: true },
    { label: 'SOLUTIONS', hasDropdown: true },
    { label: 'RESOURCES', hasDropdown: true },
    { label: 'SERVICES', hasDropdown: false },
    { label: 'BOOK A MEETING', isButton: true }
  ];

  return (
    <nav className="bottom-navbar">
      <div className="navbar-container">
        {navItems.map((item, index) => (
          <div key={index} className={`nav-item ${item.isButton ? 'nav-button' : ''}`}>
            <span className="nav-label">{item.label}</span>
            {item.hasDropdown && <span className="dropdown-icon">+</span>}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
