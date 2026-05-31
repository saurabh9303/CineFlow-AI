"use client";

import { useEffect, useState } from "react";

export default function VideosPage() {

   const [videos, setVideos] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");

   useEffect(() => {

      const fetchVideos = async () => {

         try {

            const res = await fetch(
               "http://localhost:8000/api/library/videos",
               {
                  credentials: "include"
               }
            );

            const data = await res.json();

            if (!res.ok) {
               throw new Error(
                  data.message || "Failed to fetch videos"
               );
            }

            setVideos(data.videos);

         } catch (err) {

            setError(err.message);

         } finally {

            setLoading(false);

         }

      };

      fetchVideos();

   }, []);

   return (

      <main className="min-h-screen bg-[#030712] text-white">

         <div className="max-w-7xl mx-auto px-4 py-10">

            <div className="mb-10">

               <h1 className="text-4xl font-bold mb-3">

                  🎥 My Generated Videos

               </h1>

               <p className="text-zinc-400">

                  View all videos generated through your AI automation workflows.

               </p>

            </div>

            {
               loading && (

                  <div className="text-center py-20">

                     Loading videos...

                  </div>

               )
            }

            {
               error && (

                  <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-red-400">

                     {error}

                  </div>

               )
            }

            {
               !loading &&
               !error &&
               videos.length === 0 && (

                  <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center">

                     <h2 className="text-2xl font-semibold mb-2">

                        No Videos Found

                     </h2>

                     <p className="text-zinc-400">

                        Run a workflow to generate your first video.

                     </p>

                  </div>

               )
            }

            {
               videos.length > 0 && (

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                     {
                        videos.map((video) => (

                           <div
                              key={video._id}
                              className="
                                 rounded-3xl
                                 border border-white/10
                                 bg-white/[0.03]
                                 overflow-hidden
                                 backdrop-blur-xl
                              "
                           >

                              <video
                                 controls
                                 src={video.videoUrl}
                                 className="w-full aspect-video"
                              />

                              <div className="p-5">

                                 <h2 className="font-semibold text-lg line-clamp-2 mb-3">

                                    {video.topic}

                                 </h2>

                                 <p className="text-sm text-zinc-400 mb-4">

                                    {new Date(
                                       video.createdAt
                                    ).toLocaleString()}

                                 </p>

                                 <div className="flex gap-3">

                                    <a
                                       href={video.videoUrl}
                                       target="_blank"
                                       rel="noreferrer"
                                       className="
                                          px-4 py-2
                                          rounded-xl
                                          bg-cyan-500
                                          hover:bg-cyan-400
                                          transition
                                       "
                                    >
                                       Watch
                                    </a>

                                    {
                                       video.youtubeUrl && (

                                          <a
                                             href={video.youtubeUrl}
                                             target="_blank"
                                             rel="noreferrer"
                                             className="
                                                px-4 py-2
                                                rounded-xl
                                                border border-white/10
                                                hover:bg-white/10
                                                transition
                                             "
                                          >
                                             YouTube
                                          </a>

                                       )
                                    }

                                 </div>

                              </div>

                           </div>

                        ))
                     }

                  </div>

               )
            }

         </div>

      </main>

   );
}