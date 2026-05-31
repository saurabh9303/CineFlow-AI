"use client";

import { useState } from "react";

export default function Home() {

   const [steps, setSteps] = useState([]);

   const [loading, setLoading] = useState(false);

   const [finalVideo, setFinalVideo] = useState(null);

   const [error, setError] = useState("");

   const startGeneration = () => {

      setSteps([]);
      setError("");
      setFinalVideo(null);
      setLoading(true);

      const eventSource = new EventSource(
         "http://localhost:8000/api/video/generate"
      );

      eventSource.onmessage = (event) => {

         const data = JSON.parse(event.data);

         console.log(data);

         if (data.step) {

            setSteps((prev) => [...prev, data.step]);
         }

         if (data.step === "DONE") {

            setLoading(false);

            setFinalVideo(
               data.result?.finalVideo
            );

            eventSource.close();
         }

         if (data.step === "ERROR") {

            setLoading(false);

            setError(data.error);

            eventSource.close();
         }
      };

      eventSource.onerror = () => {

         setLoading(false);

         setError("Connection failed");

         eventSource.close();
      };
   };

   return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-10">

         <div className="w-full max-w-2xl bg-zinc-900 rounded-2xl p-8 border border-zinc-800 shadow-2xl">

            <h1 className="text-4xl font-bold mb-3">
               AI Shorts Generator
            </h1>

            <p className="text-zinc-400 mb-8">
               Generate YouTube Shorts using AI
            </p>

            <button
               onClick={startGeneration}
               disabled={loading}
               className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
               {
                  loading
                     ? "Generating..."
                     : "Generate Short"
               }
            </button>

            {/* Progress */}

            <div className="mt-8 space-y-4">

               {
                  steps.map((step, index) => (

                     <div
                        key={index}
                        className="flex items-center gap-3 bg-zinc-800 px-4 py-3 rounded-xl border border-zinc-700"
                     >

                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />

                        <p className="text-sm">
                           {step}
                        </p>

                     </div>
                  ))
               }

            </div>

            {/* Loader */}

            {
               loading && (

                  <div className="mt-8 flex items-center gap-3">

                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />

                     <p className="text-zinc-400">
                        AI is generating your short...
                     </p>

                  </div>
               )
            }

            {/* Error */}

            {
               error && (

                  <div className="mt-6 bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-xl">

                     {error}

                  </div>
               )
            }

            {/* Final Video */}

            {
               finalVideo && (

                  <div className="mt-10">

                     <h2 className="text-2xl font-semibold mb-4">
                        Generated Video
                     </h2>

                     <video
                        controls
                        className="w-full rounded-2xl border border-zinc-700"
                        src={finalVideo}
                     />

                  </div>
               )
            }

         </div>

      </div>
   );
}