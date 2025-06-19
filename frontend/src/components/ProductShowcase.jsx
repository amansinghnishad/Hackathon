import React, { useState, useEffect } from "react";
import "./ProductShowcase.css";

const ProductShowcase = () => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [loadedImages, setLoadedImages] = useState(new Set());

  // Pre-load images for better performance
  useEffect(() => {
    const preloadImages = async () => {
      const imageUrls = [
        "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      ];

      const loadPromises = imageUrls.map((url) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            setLoadedImages((prev) => new Set([...prev, url]));
            resolve();
          };
          img.onerror = () => resolve(); // Don't fail if image doesn't load
          img.src = url;
        });
      });

      await Promise.all(loadPromises);
    };

    preloadImages();
  }, []);
  const products = [
    {
      id: 1,
      title: "Signature Collection",
      subtitle: "Limited Edition Set",
      badge: "NEW",
      defaultImage:
        "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      hoverImage:
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 2,
      title: "Luxury Essentials",
      subtitle: "Premium Care Range",
      badge: "NEW",
      defaultImage:
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      hoverImage:
        "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
  ];

  return (
    <div className="product-showcase-section">
      <div className="showcase-header">
        <h2 className="showcase-title">Product Collections</h2>
        <p className="showcase-description">
          Discover our premium skincare collections
        </p>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className={`product-card ${
              hoveredProduct === product.id ? "hovered" : ""
            }`}
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            {/* Badge */}
            <div className="product-badge">{product.badge}</div>{" "}
            {/* Background Images */}
            <div className="product-background">
              <div
                className="bg-image default-bg"
                style={{
                  backgroundImage: `url(${product.defaultImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
              <div
                className={`bg-image hover-bg ${
                  hoveredProduct === product.id ? "active" : ""
                }`}
                style={{
                  backgroundImage: `url(${product.hoverImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
            </div>
            {/* Content Overlay */}
            <div className="product-content">
              <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-subtitle">{product.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductShowcase;
