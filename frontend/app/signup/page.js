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

      if (!name || !email || !password) return "All fields are required";
      if (password.length < 6) return "Password must be at least 6 characters";

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
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(formData)
         });

         const data = await res.json();

         if (!res.ok) throw new Error(data.message || "Signup failed");

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
      <div className="min-h-screen flex items-center justify-center bg-[#030712] text-white px-4 relative overflow-hidden">

         {/* BACKGROUND GLOW */}
         <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-20 right-20 w-72 h-72 bg-violet-500/20 blur-[120px] rounded-full" />
         </div>

         {/* CARD */}
         <div className="w-full max-w-md">

            <div className="
               border border-white/10
               bg-white/[0.03]
               backdrop-blur-xl
               rounded-3xl
               p-8
               shadow-[0_0_60px_rgba(34,211,238,0.08)]
            ">

               {/* HEADER */}
               <div className="text-center mb-6">
                  <h1 className="text-3xl font-bold tracking-tight">
                     Create account
                  </h1>
                  <p className="text-sm text-zinc-400 mt-2">
                     Join CineFlow AI workspace
                  </p>
               </div>

               {/* ERROR / SUCCESS */}
               {error && (
                  <div className="mb-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
                     {error}
                  </div>
               )}

               {success && (
                  <div className="mb-3 text-sm text-green-400 bg-green-500/10 border border-green-500/20 p-3 rounded-xl">
                     {success}
                  </div>
               )}

               {/* INPUTS */}
               <div className="space-y-3">

                  <input
                     type="text"
                     name="name"
                     placeholder="Full name"
                     value={formData.name}
                     onChange={handleChange}
                     className="
                        w-full px-4 py-3
                        rounded-xl
                        bg-white/5
                        border border-white/10
                        outline-none text-sm
                        focus:border-cyan-500/50
                        focus:ring-2 focus:ring-cyan-500/10
                        transition
                     "
                  />

                  <input
                     type="email"
                     name="email"
                     placeholder="Email address"
                     value={formData.email}
                     onChange={handleChange}
                     className="
                        w-full px-4 py-3
                        rounded-xl
                        bg-white/5
                        border border-white/10
                        outline-none text-sm
                        focus:border-cyan-500/50
                        focus:ring-2 focus:ring-cyan-500/10
                        transition
                     "
                  />

                  <input
                     type="password"
                     name="password"
                     placeholder="Password"
                     value={formData.password}
                     onChange={handleChange}
                     className="
                        w-full px-4 py-3
                        rounded-xl
                        bg-white/5
                        border border-white/10
                        outline-none text-sm
                        focus:border-cyan-500/50
                        focus:ring-2 focus:ring-cyan-500/10
                        transition
                     "
                  />

               </div>

               {/* BUTTON */}
               <button
                  onClick={handleSignup}
                  disabled={loading}
                  className="
                     w-full mt-5
                     py-3 rounded-xl
                     font-semibold text-sm
                     bg-gradient-to-r from-cyan-500 to-blue-500
                     hover:scale-[1.02]
                     active:scale-[0.98]
                     transition
                     disabled:opacity-50
                  "
               >
                  {loading ? "Creating account..." : "Create account"}
               </button>

               {/* FOOTER */}
               <p className="text-xs text-center text-zinc-400 mt-5">
                  Already have an account?{" "}
                  <span
                     onClick={() => router.push("/login")}
                     className="text-cyan-400 cursor-pointer hover:underline"
                  >
                     Sign in
                  </span>
               </p>

            </div>

         </div>
      </div>
   );
}