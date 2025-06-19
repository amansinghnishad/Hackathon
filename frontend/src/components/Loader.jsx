import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

const Loader = ({
  duration = 3000,
  onComplete = () => {},
  showPercentage = true,
  className = "",
}) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showLShape, setShowLShape] = useState(false);
  const counterRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    // GSAP animation for smooth progress
    gsap.to(
      { value: 0 },
      {
        value: 100,
        duration: duration / 1000,
        ease: "power2.out",
        onUpdate: function () {
          const currentProgress = Math.round(this.targets()[0].value);
          setProgress(currentProgress);

          // Animate counter with GSAP
          if (counterRef.current) {
            gsap.to(counterRef.current, {
              innerHTML: currentProgress,
              duration: 0.1,
              snap: { innerHTML: 1 },
              ease: "none",
            });
          }
        },
        onComplete: () => {
          setShowLShape(true);
          setTimeout(() => {
            setIsComplete(true);
            onComplete();
          }, 2500); // 800ms for L-animation + 1s delay + 700ms for zoom
        },
      }
    );
  }, [duration, onComplete]);

  return (
    <div
      className={`fixed inset-0 bg-black flex items-center justify-center z-50 ${className}`}
    >
      <div className="w-full max-w-md px-8">
        <div className="relative">
          <motion.div
            className="w-full h-12 bg-gray-800 overflow-visible shadow-lg"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{
              opacity: progress >= 100 ? 0 : 1,
              scaleX: 1,
            }}
            transition={{
              opacity: { duration: 0.3 },
              scaleX: { duration: 0.5 },
            }}
          />

          {/* Single continuous progress bar (0-100%) */}
          {!showLShape ? (
            <motion.div
              className="absolute left-0 top-0 h-12 bg-gradient-to-r from-white to-gray-300"
              style={{ width: `${progress}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: "easeOut" }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
            </motion.div>
          ) : (
            <motion.div
              className="absolute left-0 top-0 h-12 w-full"
              initial={{ scale: 1, opacity: 1 }}
              animate={{
                scale: showLShape ? 15 : 1,
                opacity: showLShape ? 0 : 1,
              }}
              transition={{
                delay: 1.8, // Delay after L-shape formation
                duration: 0.7,
                ease: "easeIn",
              }}
            >
              {/* Left part (60% width) - rotates upward */}
              <motion.div
                className="absolute left-0 top-0 h-12"
                style={{
                  width: "60%",
                  transformOrigin: "100% 0%", // Top-right corner as pivot
                  background: "linear-gradient(to right, #ffffff, #e3e6e9)",
                }}
                initial={{ rotate: 0 }}
                animate={{
                  rotate: 90,
                }}
                transition={{
                  rotate: { duration: 0.8, ease: "backOut" },
                }}
              >
                {/* Shimmer effect for left part */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
              </motion.div>
              {/* Right part (40% width) - stays horizontal */}
              <motion.div
                className="absolute top-0 h-12"
                style={{
                  left: "60%",
                  width: "40%",
                  background: "linear-gradient(to right, #e3e6e9, #d1d5db)",
                }}
              >
                {/* Shimmer effect for right part */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
              </motion.div>
            </motion.div>
          )}

          <motion.div
            className="absolute -inset-1 bg-white/10 blur-sm"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <motion.p
          className="text-white text-center mt-6 text-lg font-light tracking-wider"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        ></motion.p>
      </div>

      {showPercentage && (
        <motion.div
          className="fixed bottom-8 left-8 text-white"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="flex items-baseline space-x-1">
            <span
              ref={counterRef}
              className="text-9xl font-bold tabular-nums tracking-tight"
            >
              0
            </span>
          </div>
          <motion.div
            className="text-sm opacity-60 mt-1 font-light tracking-wide"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          ></motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Loader;
