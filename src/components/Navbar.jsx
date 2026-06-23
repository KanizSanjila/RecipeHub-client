"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUser, FaSignOutAlt, FaThLarge } from "react-icons/fa";
import Logo from "./Logo";
import { useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import Image from "next/image";
// 🎯 ১. থিম টগল (বাটন) কম্পোনেন্টটি ইম্পোর্ট করো (ThemeProvider নয়)
import ThemeToggle from "../components/ThemeToggle"; 

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  return (
    // 🎨 লাইট মোডে সাদা এবং ডার্ক মোডে ডার্ক ব্যাকগ্রাউন্ড করা হয়েছে
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-white/5 bg-white/80 dark:bg-slate-950/65 backdrop-blur-md py-3.5 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* LOGO */}
        <Logo />

        {/* NAVIGATION LINKS */}
        <div className="hidden sm:flex items-center gap-8">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors ${pathname === "/" ? "text-red-500 font-semibold" : "text-gray-600 dark:text-slate-300 hover:text-red-500 dark:hover:text-white"}`}
          >
            Home
          </Link>
          <Link
            href="/all-recipes"
            className={`text-sm font-medium transition-colors ${pathname.startsWith("/all-recipes") ? "text-red-500 font-semibold" : "text-gray-600 dark:text-slate-300 hover:text-red-500 dark:hover:text-white"}`}
          >
            Browse Recipes
          </Link>
          {session && session?.user && (
            <Link
              href={`/dashboard/${session?.user?.role}`}
              className={`text-sm font-medium transition-colors ${pathname.startsWith("/dashboard") ? "text-red-500 font-semibold" : "text-gray-600 dark:text-slate-300 hover:text-red-500 dark:hover:text-white"}`}
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-4">
          
          {/* 🎯 ২. এখানে থিম পরিবর্তন করার সূর্য/চাঁদ বাটনটি বসানো হলো */}
          <ThemeToggle />

          {!session && (
            <div className="flex items-center gap-3">
              <Link href="/login">
                <button
                  className="inline-flex items-center justify-center font-semibold text-xs text-gray-600 dark:text-slate-300 hover:text-red-500 dark:hover:text-white h-9 px-4 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition"
                >
                  Login
                </button>
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center font-semibold text-xs bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-pink-500/10 hover:shadow-pink-500/20 transition h-9 px-4 rounded-xl"
              >
                Sign Up
              </Link>
            </div>
          )}

          {session && session?.user && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center transition-transform hover:scale-105 outline-none focus:outline-none cursor-pointer"
              >
                <Image
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-full object-cover border border-red-500 shadow-md shadow-pink-500/10"
                  src={session?.user?.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"}
                  alt="avatar"
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-slate-900/95 border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl py-2 z-55 animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* User info */}
                  <div className="px-4 py-2.5 border-b border-gray-100 dark:border-white/5 mb-1.5 cursor-default">
                    <p className="text-[10px] text-red-500 dark:text-red-400 font-bold uppercase tracking-wider">
                      {session.user.role} Account
                    </p>
                    <p className="font-bold text-gray-800 dark:text-white text-sm mt-0.5">{session.user.name}</p>
                    <p className="text-[11px] text-gray-500 dark:text-slate-400 truncate mt-0.5">{session.user.email}</p>
                  </div>

                  {/* Actions */}
                  <Link
                    href="/dashboard/user"
                    onClick={() => setDropdownOpen(false)}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-xs font-semibold text-gray-700 dark:text-slate-300 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-white/5 transition cursor-pointer"
                  >
                    <FaThLarge className="text-gray-400 dark:text-slate-400 text-sm shrink-0" />
                    <span>My Dashboard</span>
                  </Link>

                  <Link
                    href={`/dashboard/${session.user.role}/profile`}
                    onClick={() => setDropdownOpen(false)}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-xs font-semibold text-gray-700 dark:text-slate-300 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-white/5 transition cursor-pointer"
                  >
                    <FaUser className="text-gray-400 dark:text-slate-400 text-sm shrink-0" />
                    <span>Profile Settings</span>
                  </Link>

                  <div className="border-t border-gray-100 dark:border-white/5 my-1.5" />

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-xs font-semibold text-red-500 hover:text-red-600 hover:bg-red-500/5 dark:hover:bg-red-500/5 transition cursor-pointer"
                  >
                    <FaSignOutAlt className="text-sm shrink-0 text-red-500" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </nav>
  );
}