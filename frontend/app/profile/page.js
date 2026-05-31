"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {

   const router = useRouter();

   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");

   useEffect(() => {

      const fetchUser = async () => {

         try {

            const res = await fetch("http://localhost:8000/api/user/profile", {
               method: "GET",
               credentials: "include"
            });

            const data = await res.json();

            if (!res.ok) {
               throw new Error(data.message || "Failed to fetch profile");
            }

            setUser(data.user);

         } catch (err) {

            setError(err.message);

         } finally {
            setLoading(false);
         }

      };

      fetchUser();

   }, []);

   const logout = async () => {

      await fetch("http://localhost:8000/api/auth/logout", {
         method: "POST",
         credentials: "include"
      });

      setUser(null);
      router.push("/login");

   };

   if (loading) {
      return (
         <div className="h-screen flex items-center justify-center bg-[#030712] text-white">
            Loading profile...
         </div>
      );
   }

   if (error) {
      return (
         <div className="h-screen flex items-center justify-center bg-[#030712] text-red-400">
            ❌ {error}
         </div>
      );
   }

   return (
      <div className="h-screen flex items-center justify-center bg-[#030712] text-white">

         <div className="w-[350px] p-6 border border-white/10 rounded-2xl bg-white/5 text-center">

            {/* USER IMAGE */}
            <img
               src={user?.avatar || "https://via.placeholder.com/100"}
               className="w-20 h-20 rounded-full mx-auto mb-4 border border-white/20"
            />

            {/* NAME (USERNAME) */}
            <h2 className="text-xl font-bold">
               {user?.name}
            </h2>

            {/* EMAIL */}
            <p className="text-gray-400 text-sm mt-1">
               {user?.email}
            </p>

            {/* STATUS */}
            <p className={`text-sm mt-2 ${
               user?.status === "active"
                  ? "text-green-400"
                  : "text-red-400"
            }`}>
               {user?.status || "active"}
            </p>

            {/* LOGOUT */}
            <button
               onClick={logout}
               className="mt-5 w-full bg-red-500 hover:bg-red-600 py-2 rounded-xl"
            >
               Logout
            </button>

         </div>

      </div>
   );
}