"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

import {
   LayoutDashboard,
   Bot,
   WandSparkles,
   Library,
   BarChart3,
   Settings,
   Menu,
   X,
} from "lucide-react";

const navItems = [
   {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
   },
   {
      name: "Auto Mode",
      href: "/auto",
      icon: Bot,
   },
   {
      name: "Manual Mode",
      href: "/manual",
      icon: WandSparkles,
   },
   {
      name: "Library",
      href: "/library",
      icon: Library,
   },
   {
      name: "Analytics",
      href: "/analytics",
      icon: BarChart3,
   },
   {
      name: "Settings",
      href: "/settings",
      icon: Settings,
   },
];

export default function Navbar() {
   const [mobileMenu, setMobileMenu] = useState(false);
   const { user, loading } = useAuth();
   return (
      <>
         {/* Navbar */}
         <header className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">

            <div className="max-w-[1400px] mx-auto h-14 px-4 sm:px-6 flex items-center justify-between">

               {/* Logo */}
               <Link
                  href="/"
                  className="flex items-center gap-3"
               >

                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-cyan-500/20">
                     AI
                  </div>

                  <h1 className="text-lg font-bold text-white tracking-wide">
                     Social Automation
                  </h1>

               </Link>

               {/* Desktop Navigation */}
               <div className="hidden lg:flex items-center gap-4">

                  {/* Nav Links */}
                  <nav className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-2xl px-2 py-1.5 backdrop-blur-xl">

                     {navItems.map((item) => {

                        const Icon = item.icon;

                        return (
                           <Link
                              key={item.name}
                              href={item.href}
                              className="flex items-center gap-2 px-3 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                           >

                              <Icon size={15} />

                              <span className="text-[14px] font-medium">
                                 {item.name}
                              </span>

                           </Link>
                        );
                     })}

                  </nav>

                  {/* Auth Buttons */}
                  <div className="flex items-center gap-2">

                     {user ? (

                        <Link
                           href="/profile"
                           className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/10 transition-all duration-300"
                        >

                           <img
                              src={
                                 user.profilePic ||
                                 `https://ui-avatars.com/api/?name=${user.name}`
                              }
                              alt={user.name}
                              className="w-9 h-9 rounded-full object-cover border border-white/20"
                           />

                           <span className="text-white text-sm font-medium">
                              {user.name}
                           </span>

                        </Link>

                     ) : (

                        <>
                           <Link
                              href="/login"
                              className="px-4 py-2 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 border border-white/10 transition-all duration-300"
                           >
                              Login
                           </Link>

                           <Link
                              href="/signup"
                              className="px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/20"
                           >
                              Sign Up
                           </Link>
                        </>

                     )}

                  </div>

               </div>

               {/* Mobile Menu Button */}
               <button
                  onClick={() => setMobileMenu(true)}
                  className="lg:hidden text-white"
               >
                  <Menu size={26} />
               </button>

            </div>

         </header>

         {/* Mobile Sidebar */}
         <div
            className={`fixed inset-0 z-[60] transition-all duration-300 ${mobileMenu
               ? "visible opacity-100"
               : "invisible opacity-0"
               }`}
         >

            {/* Overlay */}
            <div
               onClick={() => setMobileMenu(false)}
               className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Sidebar */}
            <div
               className={`absolute top-0 right-0 h-full w-[280px] bg-[#0f172a] border-l border-white/10 p-6 transform transition-transform duration-300 ${mobileMenu
                  ? "translate-x-0"
                  : "translate-x-full"
                  }`}
            >

               {/* Top */}
               <div className="flex items-center justify-between mb-10">

                  <div className="flex items-center gap-3">

                     <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/20">
                        AI
                     </div>

                     <h2 className="text-lg font-bold text-white">
                        Menu
                     </h2>

                  </div>

                  <button
                     onClick={() => setMobileMenu(false)}
                     className="text-gray-400 hover:text-white"
                  >
                     <X size={28} />
                  </button>

               </div>

               {/* Navigation */}
               <nav className="flex flex-col gap-2">

                  {navItems.map((item) => {

                     const Icon = item.icon;

                     return (
                        <Link
                           key={item.name}
                           href={item.href}
                           onClick={() => setMobileMenu(false)}
                           className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                        >

                           <Icon size={20} />

                           <span className="font-medium">
                              {item.name}
                           </span>

                        </Link>
                     );
                  })}

               </nav>

               {/* Mobile Auth Buttons */}
               <div className="mt-8 flex flex-col gap-3">

                  <Link
                     href="/login"
                     onClick={() => setMobileMenu(false)}
                     className="w-full text-center px-4 py-3 rounded-xl border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                  >
                     Login
                  </Link>

                  <Link
                     href="/signup"
                     onClick={() => setMobileMenu(false)}
                     className="w-full text-center px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium shadow-lg shadow-cyan-500/20"
                  >
                     Sign Up
                  </Link>

               </div>

            </div>

         </div>
      </>
   );
}