"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex h-8 w-16 cursor-pointer items-center rounded-full bg-gray-200 dark:bg-gray-700 p-1 shadow-sm transition-colors duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-1"
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {/* Colored background that appears in dark mode */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: isDark ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Toggle Ball */}
      <motion.div
        className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md"
        animate={{
          x: isDark ? 32 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.15 }}
            >
              <Moon className="h-3.5 w-3.5 text-purple-600" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.15 }}
            >
              <Sun className="h-3.5 w-3.5 text-amber-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Background Icons (subtle) */}
      <div className="absolute inset-0 flex items-center">
        {/* Sun icon - positioned on the left side */}
        <motion.div
          className="absolute left-1.5"
          animate={{ opacity: isDark ? 0.15 : 0.3 }}
          transition={{ duration: 0.3 }}
        >
          <Sun className="h-2.5 w-2.5 text-amber-400" />
        </motion.div>
        {/* Moon icon - positioned on the right side */}
        <motion.div
          className="absolute right-1.5"
          animate={{ opacity: isDark ? 0.3 : 0.15 }}
          transition={{ duration: 0.3 }}
        >
          <Moon className="h-2.5 w-2.5 text-blue-300" />
        </motion.div>
      </div>
    </motion.button>
  );
}
