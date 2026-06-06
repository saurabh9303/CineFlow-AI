"use client";

import { useState, useEffect } from "react";
import Pipeline from "@/components/Pipeline";
import { useRouter } from "next/navigation";

export default function Home() {

   const [steps, setSteps] = useState([]);

   const [loading, setLoading] = useState(false);

   const [finalVideo, setFinalVideo] = useState(null);

   const [error, setError] = useState("");

   const [user, setUser] = useState(null);
   const [checkingAuth, setCheckingAuth] = useState(true);

   const router = useRouter()


   const pipelineSteps = [
      "🎯 Generating Topic",
      "🚀 Generating Script",
      "🎤 Generating Voice",
      "🎬 Generating Video",
      "🎞️ Merging",
      "📤 Uploading",
      "✅ Completed",
   ];

   const startGeneration = () => {

      setSteps([]);
      setError("");
      setFinalVideo(null);
      setLoading(true);

      const eventSource = new EventSource(
         "http://localhost:8000/api/video/generate",
         { withCredentials: true }
      );

      let completed = false;

      eventSource.onmessage = (event) => {

         const data = JSON.parse(event.data);

         if (data.error) {

            setError(data.error);
            setLoading(false);

            eventSource.close();
            return;
         }

         if (data.done) {

            setSteps(prev =>
               prev.map(step => ({
                  ...step,
                  status: "completed"
               }))
            );

            setLoading(false);

            setFinalVideo(
               data.result?.finalVideo
            );

            eventSource.close();
            return;
         }

         if (data.message) {

            setSteps(prev => {

               const completedSteps = prev.map(step => ({
                  ...step,
                  status: "completed"
               }));

               return [
                  ...completedSteps,
                  {
                     name: data.message,
                     status: "running"
                  }
               ];
            });
         }
      };

      eventSource.onerror = () => {

         // Ignore normal close after success
         if (completed) return;

         setLoading(false);

         setError("Connection failed");

         eventSource.close();
      };
   };

   useEffect(() => {

      const checkUser = async () => {

         try {

            const res = await fetch("http://localhost:8000/api/user/profile", {
               credentials: "include"
            });

            if (!res.ok) {
               setUser(null);
            } else {
               const data = await res.json();
               setUser(data.user);
            }

         } catch (err) {
            setUser(null);
         }

         setCheckingAuth(false);
      };

      checkUser();

   }, []);

   useEffect(() => {

      const handleBeforeUnload = (event) => {

         if (!loading) return;

         event.preventDefault();

         // Chrome ke liye
         event.returnValue = "";

      };

      window.addEventListener(
         "beforeunload",
         handleBeforeUnload
      );

      return () => {

         window.removeEventListener(
            "beforeunload",
            handleBeforeUnload
         );

      };

   }, [loading]);

   return (

      <main className="min-h-screen bg-[#030712] text-white overflow-x-hidden">

         {/* Background */}

         <div className="fixed inset-0 overflow-hidden pointer-events-none">

            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full" />

            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full" />

         </div>

         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

            {/* Hero */}

            <div className="mb-16 text-center">

               <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-300 text-sm font-medium mb-3">

                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />

                  AI Video Automation Platform

               </div>

               <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-3">

                  Create Short Videos with
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                     {" AI"}
                  </span>

               </h1>

               <p className="text-zinc-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
                  Launch an end-to-end automation workflow that generates topics,
                  writes scripts, creates voiceovers, renders videos, and prepares
                  content for publishing — all with live execution tracking.
               </p>

               <div className="flex flex-col sm:flex-row gap-4 justify-center mt-5">

                  <button
                     onClick={() => {
                        if (!user) {
                           alert("Please login first 🔒");
                           return;
                        }
                        startGeneration();
                     }}
                     disabled={loading || checkingAuth || !user}
                     className="px-8 py-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold text-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 cursor-pointer"
                  >
                     {
                        checkingAuth
                           ? "Checking login..."
                           : loading
                              ? "⚡ Workflow Running..."
                              : user
                                 ? "⚡ Run Workflow"
                                 : "Login required"
                     }
                  </button>

                  <button
                     onClick={() => router.push("/library")}
                     disabled={!user}
                     className="px-8 py-2 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 font-semibold cursor-pointer"
                  >
                     🎥 My Videos
                  </button>

               </div>


            </div>

            {/* Error */}

            {
               error && (

                  <div className="mb-10 rounded-3xl border border-red-500/20 bg-red-500/10 p-6 text-red-400">

                     {error}

                  </div>
               )
            }

            {/* Pipeline */}

            <Pipeline
               steps={steps}
               loading={loading}
               error={error}
            />

            {/* Final Video */}

            {
               finalVideo && (

                  <section className="mt-20">

                     <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">

                        <div>

                           <h2 className="text-3xl sm:text-4xl font-bold mb-2">

                              Final Generated Video

                           </h2>

                           <p className="text-zinc-400">

                              AI automation completed successfully.

                           </p>

                        </div>

                        <div className="px-5 py-3 rounded-2xl border border-green-500/20 bg-green-500/10 w-fit">

                           <span className="text-green-400 font-semibold">

                              Render Completed

                           </span>

                        </div>

                     </div>

                     <div className="rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-4 sm:p-6">

                        <video
                           controls
                           className="w-full rounded-[24px]"
                           src={finalVideo}
                        />

                     </div>

                  </section>
               )
            }

         </div>

      </main>
   );
}