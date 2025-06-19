import React, { useEffect, useRef } from "react";

const FluidRipple = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const prevMousePos = useRef({ x: 0, y: 0 });
  const particles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas); // Particle class for fluid simulation
    class FluidParticle {
      constructor(x, y, vx, vy) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.life = 1.0;
        this.decay = Math.random() * 0.03 + 0.01; // Faster decay
        this.size = Math.random() * 15 + 8; // Smaller particles (was 30 + 15)
        this.hue = Math.random() * 60 + 180;
        this.saturation = Math.random() * 30 + 50;
        this.lightness = Math.random() * 40 + 40;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.98; // Friction
        this.vy *= 0.98;
        this.life -= this.decay;
        this.size *= 0.995;
        return this.life > 0;
      }
      draw(ctx) {
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.size
        );

        const alpha = this.life * 0.15; // Further reduced from 0.3 to 0.15 for very thin smoke
        gradient.addColorStop(
          0,
          `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${alpha})`
        );
        gradient.addColorStop(
          0.4,
          `hsla(${this.hue + 20}, ${this.saturation}%, ${
            this.lightness + 10
          }%, ${alpha * 0.3})`
        ); // Further reduced
        gradient.addColorStop(
          1,
          `hsla(${this.hue + 40}, ${this.saturation}%, ${
            this.lightness + 20
          }%, 0)`
        );

        ctx.save();
        ctx.globalCompositeOperation = "screen";
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Create particles along mouse trail
    const createParticles = (x, y, prevX, prevY) => {
      const dx = x - prevX;
      const dy = y - prevY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance > 5) {
        const steps = Math.floor(distance / 8); // Increased from 5 to 8 for fewer particles

        for (let i = 0; i < steps; i++) {
          const t = i / steps;
          const px = prevX + dx * t;
          const py = prevY + dy * t;

          // Create fewer particles at each point
          for (let j = 0; j < 2; j++) {
            // Reduced from 3 to 2 particles per step
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 2 + 0.5;
            const vx = Math.cos(angle) * speed + dx * 0.1;
            const vy = Math.sin(angle) * speed + dy * 0.1;

            particles.current.push(
              new FluidParticle(
                px + (Math.random() - 0.5) * 20,
                py + (Math.random() - 0.5) * 20,
                vx,
                vy
              )
            );
          }
        }
      }

      // Limit particles for performance with lower count
      if (particles.current.length > 400) {
        // Reduced from 800 to 400
        particles.current.splice(0, particles.current.length - 400);
      }
    };

    // Mouse move handler
    const handleMouseMove = (e) => {
      prevMousePos.current = { ...mousePos.current };
      mousePos.current = { x: e.clientX, y: e.clientY };

      createParticles(
        mousePos.current.x,
        mousePos.current.y,
        prevMousePos.current.x,
        prevMousePos.current.y
      );
    }; // Animation loop
    const animate = () => {
      // Create trailing effect instead of clearing completely
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)"; // Increased from 0.05 to 0.08 for faster fade
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.current = particles.current.filter((particle) => {
        particle.draw(ctx);
        return particle.update();
      });

      // Add subtle background interaction with less opacity
      ctx.save();
      ctx.globalCompositeOperation = "overlay";
      ctx.fillStyle = `hsla(${(Date.now() * 0.05) % 360}, 30%, 70%, 0.01)`; // Reduced from 0.02 to 0.01
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      animationRef.current = requestAnimationFrame(animate);
    };

    // Add event listeners
    document.addEventListener("mousemove", handleMouseMove);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 1000,
        mixBlendMode: "screen",
        opacity: 0.4, // Further reduced from 0.6 to 0.4 for very thin smoke
      }}
    />
  );
};

export default FluidRipple;
