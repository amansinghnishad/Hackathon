import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import './FluidRipples.css';

const FluidRipples = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mouse = new THREE.Vector2(0.5, 0.5);

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      varying vec2 vUv;
      uniform vec2 u_mouse;
      uniform float u_time;

      // Noise function from https://www.shadertoy.com/view/lsf3WH
      float noise(vec2 p) {
        return fract(sin(dot(p.xy, vec2(12.9898, 78.233))) * 43758.5453);
      }

      void main() {
        vec2 uv = vUv;
        float dist = distance(uv, u_mouse);

        float strength = smoothstep(0.5, 0.0, dist);

        vec2 displacedUv = uv + vec2(
          sin((uv.x - u_mouse.x) * 25.0 + u_time * 5.0) * 0.02,
          sin((uv.y - u_mouse.y) * 25.0 + u_time * 5.0) * 0.02
        ) * strength;

        float noiseFactor = noise(displacedUv * 50.0 + u_time * 2.0) * 0.1;
        displacedUv += noiseFactor * strength;

        float r = texture2D(vec4(1.0,0.0,0.0,1.0), displacedUv + vec2(0.01, 0.01) * strength).r;
        float g = texture2D(vec4(0.0,1.0,0.0,1.0), displacedUv).g;
        float b = texture2D(vec4(0.0,0.0,1.0,1.0), displacedUv - vec2(0.01, 0.01) * strength).b;

        float colorStrength = pow(strength, 2.0);
        vec3 color = vec3(r, g, b) * colorStrength;

        // Make it transparent
        float alpha = smoothstep(0.4, 0.0, dist);


        gl_FragColor = vec4(color, alpha * 0.5);
      }
    `;

    const material = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0.0 },
        u_mouse: { value: mouse },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const handleMouseMove = (event) => {
      mouse.x = event.clientX / window.innerWidth;
      mouse.y = 1.0 - (event.clientY / window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      material.uniforms.u_time.value += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);


    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="fluid-ripples-container" />;
};

export default FluidRipples;
