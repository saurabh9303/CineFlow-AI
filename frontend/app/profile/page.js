"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

import {
   User,
   Mail,
   Shield,
   LogOut,
   Calendar,
} from "lucide-react";

export default function ProfilePage() {

   const router = useRouter();

   const { user, setUser } = useAuth();

   const [logoutLoading, setLogoutLoading] = useState(false);

   const handleLogout = async () => {

      try {

         setLogoutLoading(true);

         await fetch(
            "http://localhost:8000/api/auth/logout",
            {
               method: "POST",
               credentials: "include",
            }
         );

         setUser(null);

         router.push("/login");

      } catch (error) {

         console.log(error);

      } finally {

         setLogoutLoading(false);

      }

   };
   

   if (!user) {
      return (
         <div className="min-h-screen flex items-center justify-center bg-[#030712] text-white">
            Loading Profile...
         </div>
      );
   }
   
   const getStatusStyles = (status) => {
      switch (status) {
         case "active":
            return "text-green-400";

         case "banned":
            return "text-red-400";

         case "deactivated":
            return "text-yellow-400";

         case "deleted":
            return "text-gray-400";

         default:
            return "text-gray-400";
      }
   };

   return (
      <div className="min-h-screen bg-[#030712] text-white px-4 py-24">

         <div className="max-w-5xl mx-auto">

            {/* Header */}
            <div className="mb-8">

               <h1 className="text-4xl font-bold">
                  My Profile
               </h1>

               <p className="text-gray-400 mt-2">
                  Manage your account information and settings.
               </p>

            </div>

            {/* Main Card */}
            <div className="bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl overflow-hidden">

               {/* Top Section */}
               <div className="relative h-40 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20">

                  <div className="absolute -bottom-12 left-8">

                     <img
                        src={
                           user?.avatar ||
                           `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              user?.name
                           )}&background=0D8ABC&color=fff&size=200`
                        }
                        alt={user?.name}
                        className="w-24 h-24 rounded-full border-4 border-[#030712] object-cover"
                     />

                  </div>

               </div>

               {/* Content */}
               <div className="pt-16 px-8 pb-8">

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                     <div>

                        <h2 className="text-3xl font-bold">
                           {user?.name}
                        </h2>

                        <p className="text-gray-400 mt-1">
                           {user?.email}
                        </p>

                     </div>

                     <span className={getStatusStyles(user?.status)}>
                        {user?.status}
                     </span>

                  </div>

                  {/* Stats */}
                  <div className="grid md:grid-cols-3 gap-4 mt-10">

                     <div className="bg-white/5 border border-white/10 rounded-2xl p-5">

                        <div className="flex items-center gap-3">

                           <User size={20} />

                           <span className="text-gray-400">
                              Username
                           </span>

                        </div>

                        <p className="mt-3 text-lg font-semibold">
                           {user?.name}
                        </p>

                     </div>

                     <div className="bg-white/5 border border-white/10 rounded-2xl p-5">

                        <div className="flex items-center gap-3">

                           <Mail size={20} />

                           <span className="text-gray-400">
                              Email
                           </span>

                        </div>

                        <p className="mt-3 text-lg font-semibold break-all">
                           {user?.email}
                        </p>

                     </div>

                     <div className="bg-white/5 border border-white/10 rounded-2xl p-5">

                        <div className="flex items-center gap-3">

                           <Shield size={20} />

                           <span className="text-gray-400">
                              Account Status
                           </span>

                        </div>

                        <p className="mt-3 text-lg font-semibold text-green-400">
                           Verified
                        </p>

                     </div>

                  </div>

                  {/* Additional Info */}
                  <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6">

                     <div className="flex items-center gap-3 mb-4">

                        <Calendar size={20} />

                        <h3 className="text-lg font-semibold">
                           Account Information
                        </h3>

                     </div>

                     <div className="space-y-3 text-gray-300">

                        <div className="flex justify-between border-b border-white/10 pb-3">
                           <span>Name</span>
                           <span>{user?.name}</span>
                        </div>

                        <div className="flex justify-between border-b border-white/10 pb-3">
                           <span>Email</span>
                           <span>{user?.email}</span>
                        </div>

                        <div className="flex justify-between">
                           <span>Status</span>
                           <span className={getStatusStyles(user?.status)}>
                              {user?.status}
                           </span>
                        </div>

                     </div>

                  </div>

                  {/* Logout Button */}
                  <div className="mt-8">

                     <button
                        onClick={handleLogout}
                        disabled={logoutLoading}
                        className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 rounded-2xl bg-red-500 hover:bg-red-600 transition-all font-semibold disabled:opacity-50"
                     >

                        <LogOut size={18} />

                        {logoutLoading
                           ? "Logging out..."
                           : "Logout"}

                     </button>

                  </div>

               </div>

            </div>

         </div>

      </div>
   );
}