import React, { useState, useEffect, useRef } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("BILLING");
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [animateElements, setAnimateElements] = useState({
    header: false,
    tabs: false,
    content: false,
  });
  const dashboardRef = useRef(null);
  const tabs = [
    { id: "BILLING", label: "BILLING", color: "pink" },
    { id: "CHARGING", label: "CHARGING", color: "yellow" },
    { id: "CATALOG", label: "CATALOG", color: "green" },
    { id: "EVENTS", label: "EVENTS", color: "blue" },
  ];
  // Progress bar animation
  useEffect(() => {
    if (!isAutoRotating) {
      setProgress(0);
      return;
    }

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 100 / 30; // 3000ms / 100ms intervals
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [isAutoRotating, activeTab]);

  // Auto-rotation effect
  useEffect(() => {
    if (!isAutoRotating) return;

    const interval = setInterval(() => {
      setActiveTab((prevTab) => {
        const currentIndex = tabs.findIndex((tab) => tab.id === prevTab);
        const nextIndex = (currentIndex + 1) % tabs.length;
        return tabs[nextIndex].id;
      });
      setProgress(0); // Reset progress when tab changes
    }, 3000); // Change tab every 3 seconds

    return () => clearInterval(interval);
  }, [isAutoRotating, tabs]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setProgress(0);
    // Pause auto-rotation for 10 seconds when user clicks a tab
    setIsAutoRotating(false);
    setTimeout(() => {
      setIsAutoRotating(true);
    }, 10000);
  };

  const tabContent = {
    BILLING: {
      title: "Real-Time Convergent Billing",
      description:
        "Instantaneous, accurate billing across all services and payment methods.",
      stats: [
        { value: "112,365", label: "Estimated invoices", icon: "💰" },
        { value: "45 MIN", label: "Estimated duration", icon: "⏱️" },
        { value: "17 DAYS", label: "Current period end", icon: "📅" },
      ],
    },
    CHARGING: {
      title: "Dynamic Charging Solutions",
      description:
        "Flexible charging mechanisms for all service types and customer segments.",
      stats: [
        { value: "98.7%", label: "Charging accuracy", icon: "⚡" },
        { value: "2.3 SEC", label: "Average response time", icon: "⏱️" },
        { value: "24/7", label: "Service availability", icon: "🔄" },
      ],
    },
    CATALOG: {
      title: "Comprehensive Service Catalog",
      description:
        "Centralized catalog management for all products and services.",
      stats: [
        { value: "1,247", label: "Active services", icon: "📦" },
        { value: "156", label: "Service bundles", icon: "📋" },
        { value: "89%", label: "Catalog utilization", icon: "📊" },
      ],
    },
    EVENTS: {
      title: "Event Management System",
      description:
        "Real-time event processing and correlation across all network elements.",
      stats: [
        { value: "2.4M", label: "Events/hour", icon: "🔔" },
        { value: "99.9%", label: "Processing uptime", icon: "✅" },
        { value: "15 MS", label: "Average latency", icon: "⚡" },
      ],
    },
  };

  // Intersection Observer for entrance animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Staggered animations
            setTimeout(
              () => setAnimateElements((prev) => ({ ...prev, header: true })),
              100
            );
            setTimeout(
              () => setAnimateElements((prev) => ({ ...prev, tabs: true })),
              300
            );
            setTimeout(
              () => setAnimateElements((prev) => ({ ...prev, content: true })),
              500
            );
          }
        });
      },
      { threshold: 0.2 }
    );

    if (dashboardRef.current) {
      observer.observe(dashboardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="dashboard-container" ref={dashboardRef}>
      {" "}
      <div
        className={`dashboard-header ${
          animateElements.header ? "animate-header" : ""
        }`}
      >
        <h1 className="dashboard-title">
          <span className="title-main">Unparalleled</span>
          <span className="title-sub">BSS/OSS Capabilities</span>
        </h1>
      </div>
      <div
        className={`tabs-container ${
          animateElements.tabs ? "animate-tabs" : ""
        }`}
      >
        <div className="dashboard-tabs">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              className={`tab-button ${tab.color} ${
                activeTab === tab.id ? "active" : ""
              } ${animateElements.tabs ? "animate-tab" : ""}`}
              onClick={() => handleTabClick(tab.id)}
              style={{
                animationDelay: animateElements.tabs ? `${index * 0.1}s` : "0s",
              }}
            >
              <div className="tab-icon"></div>
              <span className="tab-label">{tab.label}</span>
              {activeTab === tab.id && isAutoRotating && (
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
      <div
        className={`dashboard-content-wrapper ${
          animateElements.content ? "animate-content" : ""
        }`}
      >
        <div key={activeTab} className="dashboard-content">
          <div className="content-main">
            <h2 className="content-title">{tabContent[activeTab].title}</h2>
            <p className="content-description">
              {tabContent[activeTab].description}
            </p>
          </div>
          <div className="dashboard-widget">
            <div className="widget-image">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600&q=80"
                alt="Dashboard Analytics"
                className="dashboard-image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
