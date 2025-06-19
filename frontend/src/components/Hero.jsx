import React, { useEffect, useState, useRef } from "react";
import "./Hero.css";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [time, setTime] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);

    // Time-based animation loop
    const animationLoop = () => {
      setTime(Date.now() * 0.001);
      requestAnimationFrame(animationLoop);
    };
    const animationId = requestAnimationFrame(animationLoop);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);
  const parallaxOffset = scrollY * 0.5;
  const textParallaxOffset = scrollY * 0.3;
  const overlayParallaxOffset = scrollY * 0.1;
  const particlesOffset = scrollY * 0.2;

  // Enhanced animation calculations
  const waveOffset = Math.sin(time) * 10;
  const pulseScale = 1 + Math.sin(time * 2) * 0.05;
  return (
    <div className="hero-container" ref={heroRef}>
      {" "}
      {/* Enhanced Animated Particles */}
      <div className="particles-container">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className={`particle particle-${(i % 4) + 1}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
              transform: `translateY(${particlesOffset}px) scale(${
                0.5 + Math.random() * 0.5
              })`,
              opacity: 0.3 + Math.random() * 0.7,
            }}
          />
        ))}

        {/* Floating connection nodes */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`node-${i}`}
            className="connection-node"
            style={{
              left: `${10 + i * 7}%`,
              top: `${20 + Math.sin(i) * 30}%`,
              animationDelay: `${i * 0.5}s`,
              transform: `scale(${pulseScale}) translateY(${
                Math.sin(time + i) * 20
              }px)`,
            }}
          />
        ))}
      </div>
      {/* Background Image with Parallax */}
      <div
        className="hero-background"
        style={{
          transform: `translateY(${parallaxOffset}px) scale(${
            1 + scrollY * 0.0005
          })`,
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&h=1380&q=80"
          alt="Connected Universe"
          className="hero-image"
        />
        <div
          className="hero-overlay"
          style={{
            transform: `translateY(${overlayParallaxOffset}px)`,
          }}
        ></div>
      </div>{" "}
      {/* Enhanced Connection Lines Animation */}
      <div className="connection-lines">
        <svg className="connection-svg" viewBox="0 0 100 100">
          {/* Animated connection paths */}
          <path
            className="connection-path path-1"
            d="M10,50 Q30,20 50,50 T90,50"
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="0.5"
            strokeDasharray="5,5"
            strokeDashoffset={time * -10}
          />
          <path
            className="connection-path path-2"
            d="M20,80 Q40,60 60,80 T100,80"
            fill="none"
            stroke="rgba(79,70,229,0.5)"
            strokeWidth="0.5"
            strokeDasharray="3,7"
            strokeDashoffset={time * 8}
          />
          <path
            className="connection-path path-3"
            d="M0,20 Q25,40 50,20 T80,20"
            fill="none"
            stroke="rgba(124,58,237,0.4)"
            strokeWidth="0.5"
            strokeDasharray="2,4"
            strokeDashoffset={time * -15}
          />
          <path
            className="connection-path path-4"
            d="M5,35 Q35,5 65,35 T95,35"
            fill="none"
            stroke="rgba(236,72,153,0.3)"
            strokeWidth="0.3"
            strokeDasharray="1,3"
            strokeDashoffset={time * 12}
          />
          <path
            className="connection-path path-5"
            d="M15,65 Q45,95 75,65 T105,65"
            fill="none"
            stroke="rgba(34,197,94,0.4)"
            strokeWidth="0.4"
            strokeDasharray="4,2"
            strokeDashoffset={time * -6}
          />

          {/* Connection nodes */}
          <circle
            cx="30"
            cy="30"
            r="1"
            fill="rgba(255,255,255,0.6)"
            className="connection-dot"
          >
            <animate
              attributeName="r"
              values="1;2;1"
              dur="3s"
              repeatCount="indefinite"
              begin="0s"
            />
          </circle>
          <circle
            cx="70"
            cy="70"
            r="1"
            fill="rgba(79,70,229,0.7)"
            className="connection-dot"
          >
            <animate
              attributeName="r"
              values="1;2.5;1"
              dur="2.5s"
              repeatCount="indefinite"
              begin="0.5s"
            />
          </circle>
          <circle
            cx="50"
            cy="15"
            r="1"
            fill="rgba(124,58,237,0.6)"
            className="connection-dot"
          >
            <animate
              attributeName="r"
              values="1;2;1"
              dur="3.5s"
              repeatCount="indefinite"
              begin="1s"
            />
          </circle>
          <circle
            cx="85"
            cy="50"
            r="1"
            fill="rgba(236,72,153,0.5)"
            className="connection-dot"
          >
            <animate
              attributeName="r"
              values="1;3;1"
              dur="4s"
              repeatCount="indefinite"
              begin="1.5s"
            />
          </circle>
        </svg>
      </div>
      {/* Enhanced 3D Floating Elements */}
      <div className="floating-elements">
        <div
          className="floating-element element-1 pulsing"
          style={{
            transform: `
              translateX(${mousePosition.x * 30 + waveOffset}px) 
              translateY(${mousePosition.y * 30 + Math.sin(time * 0.5) * 15}px) 
              translateZ(${scrollY * 0.1}px)
              rotateY(${mousePosition.x * 10 + Math.sin(time) * 20}deg)
              scale(${pulseScale})
            `,
          }}
        >
          <div className="element-core">
            <div className="core-glow"></div>
            <div className="core-pulse"></div>
          </div>
        </div>

        <div
          className="floating-element element-2 spinning"
          style={{
            transform: `
              translateX(${
                mousePosition.x * -20 + Math.cos(time * 0.3) * 25
              }px) 
              translateY(${
                mousePosition.y * -20 + Math.sin(time * 0.7) * 20
              }px) 
              translateZ(${scrollY * 0.2}px)
              rotateX(${mousePosition.y * 15 + time * 20}deg)
              rotateZ(${time * 30}deg)
            `,
          }}
        >
          <div className="element-rings">
            <div className="ring-1"></div>
            <div className="ring-2"></div>
            <div className="ring-3"></div>
          </div>
        </div>

        <div
          className="floating-element element-3 morphing"
          style={{
            transform: `
              translateX(${mousePosition.x * 35 + Math.sin(time * 0.4) * 30}px) 
              translateY(${mousePosition.y * 35 + Math.cos(time * 0.6) * 25}px) 
              translateZ(${scrollY * 0.15}px)
              rotateZ(${mousePosition.x * 5 + time * 10}deg)
              scale(${0.8 + Math.sin(time * 1.5) * 0.3})
            `,
          }}
        >
          <div className="element-glow">
            <div className="glow-inner"></div>
            <div className="glow-outer"></div>
          </div>
        </div>

        {/* New advanced elements */}
        <div
          className="floating-element element-4 quantum"
          style={{
            transform: `
              translateX(${
                mousePosition.x * -15 + Math.sin(time * 0.8) * 40
              }px) 
              translateY(${
                mousePosition.y * -15 + Math.cos(time * 0.9) * 35
              }px) 
              rotateX(${time * 45}deg)
              rotateY(${time * 60}deg)
            `,
          }}
        >
          <div className="quantum-core">
            <div className="quantum-orbit"></div>
            <div className="quantum-orbit orbit-2"></div>
            <div className="quantum-orbit orbit-3"></div>
          </div>
        </div>

        <div
          className="floating-element element-5 holographic"
          style={{
            transform: `
              translateX(${mousePosition.x * 25 + Math.cos(time * 1.2) * 20}px) 
              translateY(${mousePosition.y * 25 + Math.sin(time * 1.1) * 30}px) 
              rotateZ(${time * 15}deg)
              scale(${1 + Math.sin(time * 2) * 0.2})
            `,
          }}
        >
          <div className="hologram-layers">
            <div className="layer layer-1"></div>
            <div className="layer layer-2"></div>
            <div className="layer layer-3"></div>
          </div>
        </div>
      </div>
      {/* Hero Content */}
      <div
        className={`hero-content ${isVisible ? "visible" : ""}`}
        style={{
          transform: `translateY(${textParallaxOffset}px) translateZ(0)`,
        }}
      >
        <div className="hero-text-container">
          <h1 className="hero-title">
            <span className="title-line glow-text">Connect</span>
            <span className="title-line accent gradient-text">
              Share Quality Time
            </span>
            <span className="title-line space-text">Across Any Space</span>
          </h1>
          <p className="hero-description typewriter">
            Bridge distances and create meaningful connections. Experience
            immersive collaboration that brings people together, no matter where
            they are in the world.
          </p>
          <div className="hero-buttons">
            <button className="hero-btn primary ripple-effect">
              <span>Start Connecting</span>
              <div className="btn-glow"></div>
              <div className="btn-particles"></div>
            </button>
            <button className="hero-btn secondary glass-effect">
              <span>Explore Spaces</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Enhanced Scroll Indicator */}
      <div className="scroll-indicator floating-animation">
        <div className="scroll-mouse glowing">
          <div className="scroll-wheel pulsing"></div>
        </div>
        <span className="scroll-text breathing">Discover the experience</span>
      </div>
      {/* Dynamic 3D Grid Background */}
      <div
        className="grid-background"
        style={{
          transform: `
          translateY(${scrollY * 0.2}px) 
          rotateX(${mousePosition.y * 3}deg) 
          rotateY(${mousePosition.x * 3}deg)
          scale(${1 + Math.abs(mousePosition.x) * 0.1})
        `,
        }}
      >
        <div className="grid-lines morphing-grid"></div>
        <div className="grid-dots"></div>
      </div>
    </div>
  );
};

export default Hero;
