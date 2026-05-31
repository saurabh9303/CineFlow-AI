"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {

   const router = useRouter();

   const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: ""
   });

   const [error, setError] = useState("");
   const [success, setSuccess] = useState("");
   const [loading, setLoading] = useState(false);

   const handleChange = (e) => {

      setFormData({
         ...formData,
         [e.target.name]: e.target.value
      });

   };

   const validate = () => {

      const { name, email, password } = formData;

      if (!name || !email || !password) {
         return "All fields are required";
      }

      if (password.length < 6) {
         return "Password must be at least 6 characters";
      }

      return null;

   };

   const handleSignup = async () => {

      const err = validate();

      if (err) {
         setError(err);
         return;
      }

      setError("");
      setSuccess("");
      setLoading(true);

      try {

         const res = await fetch("http://localhost:8000/api/auth/register", {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(formData)
         });

         const data = await res.json();

         if (!res.ok) {
            throw new Error(data.message || "Signup failed");
         }

         setSuccess("Account created successfully 🎉");

         setTimeout(() => {
            router.push("/login");
         }, 1000);

      } catch (err) {

         setError(err.message);

      } finally {

         setLoading(false);

      }

   };

   return (
      <div className="flex items-center justify-center min-h-screen bg-[#030712] text-white px-4">

         <div className="w-full max-w-[380px] border border-white/10 rounded-2xl p-6 bg-white/5 backdrop-blur">

            <h1 className="text-3xl font-bold mb-1">
               Create Account
            </h1>

            <p className="text-sm text-gray-400 mb-5">
               Join CineFlow AI
            </p>

            {error && (
               <p className="text-red-400 text-sm mb-3">
                  {error}
               </p>
            )}

            {success && (
               <p className="text-green-400 text-sm mb-3">
                  {success}
               </p>
            )}

            <input
               type="text"
               name="name"
               placeholder="Full Name"
               value={formData.name}
               onChange={handleChange}
               className="w-full p-3 mb-3 rounded-xl bg-transparent border border-white/15 outline-none focus:border-cyan-400"
            />

            <input
               type="email"
               name="email"
               placeholder="Email Address"
               value={formData.email}
               onChange={handleChange}
               className="w-full p-3 mb-3 rounded-xl bg-transparent border border-white/15 outline-none focus:border-cyan-400"
            />

            <input
               type="password"
               name="password"
               placeholder="Password"
               value={formData.password}
               onChange={handleChange}
               className="w-full p-3 mb-4 rounded-xl bg-transparent border border-white/15 outline-none focus:border-cyan-400"
            />

            <button
               onClick={handleSignup}
               disabled={loading}
               className="w-full bg-cyan-500 hover:bg-cyan-400 transition-all py-3 rounded-xl font-semibold disabled:opacity-50"
            >
               {loading ? "Creating..." : "Create Account"}
            </button>

            <p className="text-sm text-center text-gray-400 mt-4">
               Already have an account?{" "}
               <span
                  onClick={() => router.push("/login")}
                  className="text-cyan-400 cursor-pointer hover:underline"
               >
                  Login
               </span>
            </p>

         </div>
      </div>
   );
}