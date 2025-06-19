import React, { useRef, useEffect, useState, useCallback } from "react";
import "./Interactive3D.css";

const Interactive3D = () => {
  const containerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [smoothMousePosition, setSmoothMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [isHovering, setIsHovering] = useState(false);
  const [activeElement, setActiveElement] = useState(null);
  const [elements, setElements] = useState([]);

  // Enhanced 3D elements data with physics properties
  const initialElements = [
    {
      id: 1,
      type: "cube",
      color: "#ff6b6b",
      size: "large",
      position: { x: -200, y: -100 },
      velocity: { x: 0, y: 0 },
      basePosition: { x: -200, y: -100 },
    },
    {
      id: 2,
      type: "sphere",
      color: "#4ecdc4",
      size: "medium",
      position: { x: 100, y: -150 },
      velocity: { x: 0, y: 0 },
      basePosition: { x: 100, y: -150 },
    },
    {
      id: 3,
      type: "pyramid",
      color: "#45b7d1",
      size: "small",
      position: { x: -50, y: 50 },
      velocity: { x: 0, y: 0 },
      basePosition: { x: -50, y: 50 },
    },
    {
      id: 4,
      type: "cylinder",
      color: "#f9ca24",
      size: "medium",
      position: { x: 200, y: 100 },
      velocity: { x: 0, y: 0 },
      basePosition: { x: 200, y: 100 },
    },
    {
      id: 5,
      type: "octahedron",
      color: "#6c5ce7",
      size: "large",
      position: { x: -100, y: 150 },
      velocity: { x: 0, y: 0 },
      basePosition: { x: -100, y: 150 },
    },
    {
      id: 6,
      type: "torus",
      color: "#fd79a8",
      size: "small",
      position: { x: 50, y: -50 },
      velocity: { x: 0, y: 0 },
      basePosition: { x: 50, y: -50 },
    },
    {
      id: 7,
      type: "cube",
      color: "#00b894",
      size: "medium",
      position: { x: 150, y: -25 },
      velocity: { x: 0, y: 0 },
      basePosition: { x: 150, y: -25 },
    },
    {
      id: 8,
      type: "sphere",
      color: "#e17055",
      size: "small",
      position: { x: -150, y: 0 },
      velocity: { x: 0, y: 0 },
      basePosition: { x: -150, y: 0 },
    },
    {
      id: 9,
      type: "diamond",
      color: "#a29bfe",
      size: "large",
      position: { x: 0, y: 100 },
      velocity: { x: 0, y: 0 },
      basePosition: { x: 0, y: 100 },
    },
    {
      id: 10,
      type: "hexagon",
      color: "#fd63a1",
      size: "medium",
      position: { x: 75, y: 75 },
      velocity: { x: 0, y: 0 },
      basePosition: { x: 75, y: 75 },
    },
  ];

  // Initialize elements
  useEffect(() => {
    setElements(initialElements);
  }, []);

  // Smooth mouse movement interpolation
  useEffect(() => {
    const smoothingFactor = 0.1;
    const updateSmoothPosition = () => {
      setSmoothMousePosition((prev) => ({
        x: prev.x + (mousePosition.x - prev.x) * smoothingFactor,
        y: prev.y + (mousePosition.y - prev.y) * smoothingFactor,
      }));
    };

    const interval = setInterval(updateSmoothPosition, 16); // ~60fps
    return () => clearInterval(interval);
  }, [mousePosition]);

  // Physics animation loop
  const updatePhysics = useCallback(() => {
    if (!isHovering) {
      animationFrameRef.current = requestAnimationFrame(updatePhysics);
      return;
    }

    setElements((prevElements) =>
      prevElements.map((element) => {
        const mouseX = smoothMousePosition.x * 300;
        const mouseY = smoothMousePosition.y * 300;

        // Calculate distance from mouse to element
        const distanceX = mouseX - element.position.x;
        const distanceY = mouseY - element.position.y;
        const distance = Math.sqrt(
          distanceX * distanceX + distanceY * distanceY
        );

        // Physics constants
        const interactionRadius = 180;
        const repulsionForce = 0.8;
        const attractionForce = 0.3;
        const friction = 0.85;
        const springForce = 0.05;

        let newVelocity = { ...element.velocity };

        if (distance < interactionRadius && distance > 0) {
          // Repulsion from mouse
          const influence = (interactionRadius - distance) / interactionRadius;
          const forceX = -(distanceX / distance) * influence * repulsionForce;
          const forceY = -(distanceY / distance) * influence * repulsionForce;

          newVelocity.x += forceX;
          newVelocity.y += forceY;
        }

        // Spring force back to base position
        const springX =
          (element.basePosition.x - element.position.x) * springForce;
        const springY =
          (element.basePosition.y - element.position.y) * springForce;
        newVelocity.x += springX;
        newVelocity.y += springY;

        // Apply friction
        newVelocity.x *= friction;
        newVelocity.y *= friction;

        // Update position
        const newPosition = {
          x: element.position.x + newVelocity.x,
          y: element.position.y + newVelocity.y,
        };

        // Boundary constraints
        const maxDistance = 250;
        const distanceFromCenter = Math.sqrt(
          newPosition.x * newPosition.x + newPosition.y * newPosition.y
        );
        if (distanceFromCenter > maxDistance) {
          const scale = maxDistance / distanceFromCenter;
          newPosition.x *= scale;
          newPosition.y *= scale;
          newVelocity.x *= 0.5;
          newVelocity.y *= 0.5;
        }

        return {
          ...element,
          position: newPosition,
          velocity: newVelocity,
        };
      })
    );

    animationFrameRef.current = requestAnimationFrame(updatePhysics);
  }, [smoothMousePosition, isHovering]);

  // Start physics loop
  useEffect(() => {
    if (isHovering) {
      animationFrameRef.current = requestAnimationFrame(updatePhysics);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isHovering, updatePhysics]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        setMousePosition({
          x: (e.clientX - rect.left - centerX) / centerX,
          y: (e.clientY - rect.top - centerY) / centerY,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseenter", () => setIsHovering(true));
      container.addEventListener("mouseleave", () => {
        setIsHovering(false);
        setActiveElement(null);
      });
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseenter", () => setIsHovering(true));
        container.removeEventListener("mouseleave", () => {
          setIsHovering(false);
          setActiveElement(null);
        });
      }
    };
  }, []);
  const handleElementHover = (elementId) => {
    setActiveElement(elementId);
  };

  const handleElementLeave = () => {
    setActiveElement(null);
  };

  const getTransform = (element) => {
    const baseTransform = `translate(${element.position.x}px, ${element.position.y}px)`;

    if (!isHovering) return baseTransform;

    // Calculate distance from smooth mouse position to element
    const mouseX = smoothMousePosition.x * 300;
    const mouseY = smoothMousePosition.y * 300;
    const distanceX = mouseX - element.position.x;
    const distanceY = mouseY - element.position.y;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    // Interaction radius for visual effects
    const visualRadius = 120;

    if (distance < visualRadius && distance > 0) {
      const influence = (visualRadius - distance) / visualRadius;

      // Smooth rotation based on position relative to mouse
      const rotationX = (distanceY / visualRadius) * influence * 30;
      const rotationY = (distanceX / visualRadius) * influence * 30;
      const rotationZ =
        Math.sin(Date.now() * 0.005 + element.id) * influence * 15;

      // Dynamic scaling
      const scale = 1 + influence * 0.4;

      return `translate(${element.position.x}px, ${element.position.y}px) 
              rotateX(${rotationX}deg) rotateY(${rotationY}deg) rotateZ(${rotationZ}deg) 
              scale(${scale})`;
    }

    // Idle animation when not being interacted with
    const idleRotation = Math.sin(Date.now() * 0.002 + element.id) * 5;
    const idleY = Math.cos(Date.now() * 0.001 + element.id) * 2;

    return `translate(${element.position.x}px, ${element.position.y + idleY}px) 
            rotateY(${idleRotation}deg)`;
  };

  const getElementStyle = (element) => {
    const isActive = activeElement === element.id;
    const mouseX = smoothMousePosition.x * 300;
    const mouseY = smoothMousePosition.y * 300;
    const distanceX = mouseX - element.position.x;
    const distanceY = mouseY - element.position.y;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    // Dynamic shadow based on distance and activity
    const shadowIntensity = distance < 120 ? (120 - distance) / 120 : 0;
    const shadowBlur = 10 + shadowIntensity * 30;
    const shadowSpread = shadowIntensity * 10;

    return {
      transform: getTransform(element),
      background: element.color,
      boxShadow: isActive
        ? `0 ${shadowBlur + 10}px ${shadowSpread + 20}px ${
            element.color
          }40, 0 0 ${shadowSpread + 20}px ${element.color}60`
        : `0 ${shadowBlur}px ${shadowSpread + 10}px ${
            element.color
          }20, 0 0 ${shadowSpread}px ${element.color}30`,
      zIndex: isActive ? 100 : Math.floor(shadowIntensity * 50) + 1,
      filter: `brightness(${1 + shadowIntensity * 0.3}) saturate(${
        1 + shadowIntensity * 0.2
      })`,
    };
  };

  return (
    <div className="interactive-3d-section">
      <div className="section-header">
        <h2 className="section-title">Interactive 3D Playground</h2>
        <p className="section-description">
          Move your mouse around to interact with the 3D elements below
        </p>
      </div>

      <div
        ref={containerRef}
        className={`interactive-3d-container ${isHovering ? "hovering" : ""}`}
      >
        {" "}
        <div className="elements-wrapper">
          {elements.map((element) => (
            <div
              key={element.id}
              className={`element-3d ${element.type} ${element.size} ${
                activeElement === element.id ? "active" : ""
              }`}
              style={getElementStyle(element)}
              onMouseEnter={() => handleElementHover(element.id)}
              onMouseLeave={handleElementLeave}
            >
              <div className="element-face front"></div>
              <div className="element-face back"></div>
              <div className="element-face left"></div>
              <div className="element-face right"></div>
              <div className="element-face top"></div>
              <div className="element-face bottom"></div>

              {/* Element info overlay */}
              <div className="element-info">
                <span className="element-type">{element.type}</span>
                <span className="element-id">#{element.id}</span>
              </div>
            </div>
          ))}
        </div>
        {/* Enhanced Mouse follower */}
        <div
          className="mouse-follower"
          style={{
            transform: `translate(${smoothMousePosition.x * 300}px, ${
              smoothMousePosition.y * 300
            }px)`,
            opacity: isHovering ? 1 : 0,
          }}
        >
          <div className="follower-ring"></div>
          <div className="follower-dot"></div>
        </div>
        {/* Interactive guide */}
        <div className="interaction-guide">
          <div className="guide-text">
            {activeElement
              ? `Interacting with ${
                  elements.find((el) => el.id === activeElement)?.type
                } #${activeElement}`
              : isHovering
              ? "Physics simulation active - Objects react to your cursor"
              : "Move your cursor inside to activate physics simulation"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interactive3D;
