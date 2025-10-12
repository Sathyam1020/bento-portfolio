
'use client'

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const [activeGradient, setActiveGradient] = useState<'red' | 'purple'>('red');
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => setMounted(true), []);

  // Auto-toggle gradients every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveGradient(prev => prev === 'red' ? 'purple' : 'red');
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleThemeToggle = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setTheme(isDark ? "light" : "dark");
      setTimeout(() => setIsTransitioning(false), 100);
    }, 150);
  };

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <>
      <style jsx>{`
        @keyframes shine-sweep {
          0% {
            top: -100%;
          }
          100% {
            top: 100%;
          }
        }

        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        @keyframes icon-rotate-in {
          0% {
            opacity: 0;
            transform: rotate(-90deg) scale(0.5);
          }
          100% {
            opacity: 1;
            transform: rotate(0deg) scale(1);
          }
        }

        @keyframes icon-rotate-out {
          0% {
            opacity: 1;
            transform: rotate(0deg) scale(1);
          }
          100% {
            opacity: 0;
            transform: rotate(90deg) scale(0.5);
          }
        }

        @keyframes theme-pulse-light {
          0%, 100% {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4);
          }
          50% {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.15));
            box-shadow: 0 0 30px rgba(255, 255, 255, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.6);
          }
        }

        @keyframes theme-pulse-dark {
          0%, 100% {
            background: linear-gradient(135deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2));
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);
          }
          50% {
            background: linear-gradient(135deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.25));
            box-shadow: 0 0 30px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.15);
          }
        }

        .gradient-base {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: inherit;
          background-size: 300% 300%;
          animation: gradient-shift 2s ease-in-out infinite;
          transition: opacity 1.5s ease-in-out;
        }

        .gradient-red {
          background: linear-gradient(45deg, #ef4444, #ec4899, #f87171, #ec4899, #ef4444);
        }

        .gradient-purple {
          background: linear-gradient(45deg, #8b5cf6, #3b82f6, #a855f7, #3b82f6, #8b5cf6);
        }

        .shine-container {
          position: relative;
          overflow: hidden;
        }

        .shine-container::before {
          content: '';
          position: absolute;
          top: -100%;
          left: 0;
          width: 100%;
          height: 50%;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          animation: shine-sweep 3s ease-in-out infinite;
          pointer-events: none;
          z-index: 10;
        }

        .theme-toggle {
          backdrop-filter: blur(15px);
          border: 2px solid rgba(255, 255, 255, 0.3);
          animation: float 4s ease-in-out infinite;
          transition: all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .theme-toggle.light {
          animation: float 4s ease-in-out infinite, theme-pulse-light 3s ease-in-out infinite;
        }

        .theme-toggle.dark {
          animation: float 4s ease-in-out infinite, theme-pulse-dark 3s ease-in-out infinite;
        }

        .theme-toggle:hover {
          border-color: rgba(255, 255, 255, 0.5);
          transform: scale(1.08) translateY(-3px);
        }

        .theme-toggle:active {
          transform: scale(0.92) translateY(1px);
          transition: all 0.1s ease-out;
        }

        .icon-container {
          position: relative;
          width: 28px;
          height: 28px;
        }

        .theme-icon {
          position: absolute;
          top: 0;
          left: 0;
          transition: all 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
        }

        .theme-icon.entering {
          animation: icon-rotate-in 0.5s ease-out forwards;
        }

        .theme-icon.exiting {
          animation: icon-rotate-out 0.5s ease-out forwards;
        }
      `}</style>

      <div className="shine-container rounded-4xl h-full w-full relative">
        {/* Red Gradient Layer */}
        <div
          className={`gradient-base gradient-red ${activeGradient === 'red' ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Purple Gradient Layer */}
        <div
          className={`gradient-base gradient-purple ${activeGradient === 'purple' ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Enhanced Animated Theme Toggle */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <button
            onClick={handleThemeToggle}
            className={`theme-toggle w-18 h-18 cursor-pointer rounded-full flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-white/40 ${isDark ? 'dark' : 'light'}`}
            disabled={isTransitioning}
          >
            <div className="icon-container cursor-pointer">
              {!isTransitioning && isDark && (
                <Moon className={`h-7 w-7 text-white drop-shadow-lg theme-icon entering`} />
              )}
              {!isTransitioning && !isDark && (
                <Sun className={`h-7 w-7 text-white drop-shadow-lg theme-icon entering`} />
              )}
              {isTransitioning && (
                <div className="w-7 h-7 border-2 border-white/50 border-t-white rounded-full animate-spin drop-shadow-lg" />
              )}
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default ThemeToggle;