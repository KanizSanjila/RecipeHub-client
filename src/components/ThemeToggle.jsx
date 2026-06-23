"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 🎯 হাইড্রেশন এরর (Hydration Mismatch) এড়ানোর জন্য এই লজিকটি জরুরি
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-zinc-800 animate-pulse" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2.5 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-zinc-200 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all duration-300 shadow-sm border border-gray-200 dark:border-zinc-700 cursor-pointer outline-none focus:outline-none"
      aria-label="Toggle Theme"
    >
      {/* ☀️ থিম ডার্ক হলে সূর্যের আইকন দেখাবে, আর লাইট হলে চাঁদের আইকন 🌙 */}
      {theme === "dark" ? (
        <FaSun className="w-4 h-4 text-amber-400" />
      ) : (
        <FaMoon className="w-4 h-4 text-indigo-600" />
      )}
    </button>
  );
}