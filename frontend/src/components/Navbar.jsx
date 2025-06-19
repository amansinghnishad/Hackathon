import React, { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("hero-section");
  const navItems = [
    { label: "HOME", targetId: "hero-section" },
    { label: "ANALYTICS", targetId: "chart-section" },
    { label: "DASHBOARD", targetId: "dashboard-section" },
    { label: "3D PLAYGROUND", targetId: "interactive-3d-section" },
    { label: "PRODUCTS", targetId: "product-showcase-section" },
    { label: "PARTNERS", targetId: "brandeal-section" },
    { label: "CONTACT", isButton: true, targetId: "hero-section" },
  ];

  const scrollToSection = (targetId) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Track which section is currently visible
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.targetId);

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="bottom-navbar">
      <div className="navbar-container">
        {navItems.map((item, index) => (
          <div
            key={index}
            className={`nav-item ${item.isButton ? "nav-button" : ""} ${
              activeSection === item.targetId && !item.isButton
                ? "nav-active"
                : ""
            }`}
            onClick={() => scrollToSection(item.targetId)}
          >
            <span className="nav-label">{item.label}</span>
          </div>
        ))}{" "}
      </div>
    </nav>
  );
};

export default Navbar;
