import React, { useState } from "react";
import "./BrandDeal.css";

const BrandDeal = () => {
  const [isHovered, setIsHovered] = useState(false);

  const brands = [
    { name: "CURSOR" },
    { name: "Brex" },
    { name: "remote" },
    { name: "ARC" },
    { name: "runway" },
    { name: "descript" },
  ];

  return (
    <div
      className="brand-deal-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`brands-list ${isHovered ? "blurred" : ""}`}>
        {brands.map((brand, index) => (
          <div key={index} className="brand-item">
            <span className="brand-name">{brand.name}</span>
          </div>
        ))}
      </div>

      {isHovered && (
        <div className="hover-overlay">
          <button className="meet-customers-btn">
            <span>Meet our customers</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default BrandDeal;
