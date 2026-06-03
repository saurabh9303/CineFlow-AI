"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {

   const router = useRouter();
   const { setUser } = useAuth();

   const [formData, setFormData] = useState({
      email: "",
      password: ""
   });

   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);

   const handleChange = (e) => {

      setFormData({
         ...formData,
         [e.target.name]: e.target.value
      });

   };

   const validate = () => {

      const { email, password } = formData;

      if (!email || !password) {
         return "Email and password required";
      }

      return null;
   };

   const handleLogin = async () => {

      const err = validate();

      if (err) {
         setError(err);
         return;
      }

      setError("");
      setLoading(true);

      try {

         const res = await fetch("http://localhost:8000/api/auth/login", {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(formData)
         });

         const data = await res.json();

         if (!res.ok) {
            throw new Error(data.message || "Login failed");
         }

         setUser(data.user);

         router.push("/profile");
      } catch (err) {

         setError(err.message);

      } finally {

         setLoading(false);

      }

   };

   return (
      <div className="flex items-center justify-center min-h-screen bg-[#030712] text-white px-4">

         <div className="w-full max-w-[380px] border border-white/10 rounded-2xl p-6 bg-white/5 backdrop-blur">

            <h1 className="text-3xl font-bold mb-5">
               Login
            </h1>

            {error && (
               <p className="text-red-400 text-sm mb-3">
                  {error}
               </p>
            )}

            <input
               type="email"
               name="email"
               placeholder="Email Address"
               value={formData.email}
               onChange={handleChange}
               className="w-full p-3 mb-3 rounded-xl bg-transparent border border-white/15 outline-none focus:border-blue-400"
            />

            <input
               type="password"
               name="password"
               placeholder="Password"
               value={formData.password}
               onChange={handleChange}
               className="w-full p-3 mb-4 rounded-xl bg-transparent border border-white/15 outline-none focus:border-blue-400"
            />

            <button
               onClick={handleLogin}
               disabled={loading}
               className="w-full bg-blue-500 hover:bg-blue-400 transition-all py-3 rounded-xl font-semibold disabled:opacity-50"
            >
               {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-sm text-center text-gray-400 mt-4">
               Don’t have an account?{" "}
               <span
                  onClick={() => router.push("/signup")}
                  className="text-blue-400 cursor-pointer hover:underline"
               >
                  Signup
               </span>
            </p>

         </div>
      </div>
   );
}