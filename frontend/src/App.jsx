import React, { useState } from "react";
import "./App.css";
import Loader from "./components/Loader";
import FluidRipple from "./components/RippleEffect";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

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
      <header className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Welcome
          </h1>
          <p className="text-xl opacity-80 text-gray-700">
            Your application has loaded successfully!
          </p>
        </div>
      </header>
      <section className="py-20">
        <Dashboard />
      </section>
      <Navbar />
    </div>
  );
}

export default App;
