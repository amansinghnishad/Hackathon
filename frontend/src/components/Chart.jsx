import React, { useState, useEffect } from "react";
import "./Chart.css";

const Chart = () => {
  const [activeTypeFilter, setActiveTypeFilter] = useState("All");
  const [activeStatusFilter, setActiveStatusFilter] = useState("Complete");
  const [hoveredBar, setHoveredBar] = useState(null);

  // Sample data for the chart
  const chartData = [
    { month: "Jan", value: 549, type: "Refurbishment" },
    { month: "Feb", value: 278, type: "New build" },
    { month: "Mar", value: 875, type: "Refurbishment" },
    { month: "Apr", value: 617, type: "New build" },
    { month: "May", value: 506, type: "Refurbishment" },
    { month: "Jun", value: 36, type: "New build" },
    { month: "Jul", value: 185, type: "Refurbishment" },
    { month: "Aug", value: 191, type: "New build" },
    { month: "Sep", value: 122, type: "Refurbishment" },
    { month: "Oct", value: 550, type: "New build" },
    { month: "Nov", value: 881, type: "Refurbishment" },
    { month: "Dec", value: 539, type: "New build" },
    { month: "Jan", value: 269, type: "Refurbishment" },
    { month: "Feb", value: 29, type: "New build" },
    { month: "Mar", value: 82, type: "Refurbishment" },
    { month: "Apr", value: 44, type: "New build" },
    { month: "May", value: 109, type: "Refurbishment" },
    { month: "Jun", value: 106, type: "New build" },
    { month: "Jul", value: 607, type: "Refurbishment" },
    { month: "Aug", value: 528, type: "New build" },
  ];

  const typeFilters = ["Refurbishment", "New build", "All"];
  const statusFilters = ["Complete", "Estimate"];

  const maxValue = Math.max(...chartData.map((item) => item.value));

  const getBarColor = (type, isHovered) => {
    if (type === "Refurbishment") {
      return isHovered ? "#8B4B47" : "#A86B66";
    } else {
      return isHovered ? "#9B7B6B" : "#C4A69A";
    }
  };

  const filteredData =
    activeTypeFilter === "All"
      ? chartData
      : chartData.filter((item) => item.type === activeTypeFilter);

  return (
    <div className="carbon-emissions-container">
      {/* Header */}
      <div className="chart-header">
        <div className="chart-title-section">
          <h1 className="chart-main-title">EMBODIED</h1>
          <h1 className="chart-main-title carbon-text">CARBON</h1>
          <h1 className="chart-main-title">EMISSIONS</h1>
          <p className="chart-subtitle">
            Intensity measured by kgCO<sub>2</sub>e/m<sup>2</sup>
          </p>
        </div>
        <button className="download-btn">
          <span>Download the data</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7,10 12,15 17,10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </button>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filter-group">
          <label className="filter-label">Filter by</label>
          <div className="filter-row">
            <span className="filter-category">Type</span>
            <div className="filter-buttons">
              {typeFilters.map((filter) => (
                <button
                  key={filter}
                  className={`filter-btn ${
                    activeTypeFilter === filter ? "active" : ""
                  }`}
                  onClick={() => setActiveTypeFilter(filter)}
                >
                  <span
                    className={`filter-indicator ${filter
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  ></span>
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <div className="filter-row">
            <span className="filter-category">Status</span>
            <div className="filter-buttons">
              {statusFilters.map((filter) => (
                <button
                  key={filter}
                  className={`filter-btn ${
                    activeStatusFilter === filter ? "active" : ""
                  }`}
                  onClick={() => setActiveStatusFilter(filter)}
                >
                  <span
                    className={`filter-indicator ${filter.toLowerCase()}`}
                  ></span>
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="chart-legend">
        <div className="legend-title">Key</div>
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-line dashed"></div>
            <span>
              500 kgCO<sub>2</sub>e/m<sup>2</sup> - Embodied Carbon Target 2030
            </span>
          </div>
          <div className="legend-item">
            <div className="legend-line solid"></div>
            <span>
              600 kgCO<sub>2</sub>e/m<sup>2</sup> - Embodied Carbon Target 2025
            </span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="chart-container">
        <div className="chart-y-axis">
          <div className="y-axis-label">
            Embodied carbon intensity (kgCO<sub>2</sub>e/m<sup>2</sup>)
          </div>
          <div className="y-axis-ticks">
            {[1200, 1000, 800, 600, 400, 200, 0].map((tick) => (
              <div key={tick} className="y-tick">
                <span>{tick}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-area">
          {/* Target lines */}
          <div
            className="target-line target-2030"
            style={{ bottom: `${(500 / 1200) * 100}%` }}
          ></div>
          <div
            className="target-line target-2025"
            style={{ bottom: `${(600 / 1200) * 100}%` }}
          ></div>

          {/* Bars */}
          <div className="bars-container">
            {filteredData.map((item, index) => (
              <div
                key={index}
                className="bar-wrapper"
                onMouseEnter={() => setHoveredBar(index)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                <div
                  className="bar"
                  style={{
                    height: `${(item.value / maxValue) * 100}%`,
                    backgroundColor: getBarColor(
                      item.type,
                      hoveredBar === index
                    ),
                  }}
                >
                  {hoveredBar === index && (
                    <div className="bar-tooltip">
                      <div className="tooltip-value">{item.value}</div>
                      <div className="tooltip-type">{item.type}</div>
                    </div>
                  )}
                </div>
                <div className="bar-label">{item.month}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
