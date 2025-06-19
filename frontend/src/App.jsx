import React, { useState } from "react";
import "./App.css";
import Loader from "./components/Loader";
import FluidRipple from "./components/RippleEffect";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Chart from "./components/Chart";
import BrandDeal from "./components/BrandDeal";
import Hero from "./components/Hero";
import Interactive3D from "./components/Interactive3D";
import ProductShowcase from "./components/ProductShowcase";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  };

  if (isLoading) {
    return (
      <Loader
        duration={4000} // 4 seconds
        onComplete={handleLoadingComplete}
        showPercentage={true}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <FluidRipple />
      <section id="hero-section">
        <Hero />
      </section>
      <section id="chart-section" className="py-20">
        <Chart />
      </section>
      <section id="dashboard-section" className="py-20">
        <Dashboard />
      </section>
      <section id="interactive-3d-section">
        <Interactive3D />
      </section>
      <section id="product-showcase-section">
        <ProductShowcase />
      </section>
      <section id="brandeal-section" className="py-20">
        <BrandDeal />
      </section>
      <Navbar />
    </div>
  );
}

export default App;
