"use client";

import { useEffect, useMemo, useState } from "react";

import VideoCard from "@/components/videos/VideoCard";
import StatsCard from "@/components/videos/StatsCard";

export default function LibraryPage() {

   const [videos, setVideos] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");

   const [search, setSearch] = useState("");
   const [statusFilter, setStatusFilter] = useState("all");

   useEffect(() => {

      const fetchVideos = async () => {

         try {

            const res = await fetch(
               "http://localhost:8000/api/library/videos",
               {
                  credentials: "include",
               }
            );

            const data = await res.json();

            if (!res.ok) {
               throw new Error(
                  data.message || "Failed to fetch videos"
               );
            }

            setVideos(data.videos || []);

         } catch (err) {

            setError(err.message);

         } finally {

            setLoading(false);

         }

      };

      fetchVideos();

   }, []);

   const stats = useMemo(() => {

      return {
         totalVideos: videos.length,

         completedVideos: videos.filter(
            (v) => v.status === "completed"
         ).length,

         youtubeUploaded: videos.filter(
            (v) => v.youtube?.uploaded
         ).length,

         instagramUploaded: videos.filter(
            (v) => v.instagram?.uploaded
         ).length,

         facebookUploaded: videos.filter(
            (v) => v.facebook?.uploaded
         ).length,
      };

   }, [videos]);

   const filteredVideos = useMemo(() => {

      let result = [...videos];

      if (search.trim()) {

         result = result.filter((video) =>
            video.topic
               ?.toLowerCase()
               .includes(search.toLowerCase())
         );

      }

      if (statusFilter !== "all") {

         result = result.filter(
            (video) =>
               video.status === statusFilter
         );

      }

      return result;

   }, [videos, search, statusFilter]);

   const handleDelete = (videoId) => {

      setVideos((prev) =>
         prev.filter(
            (video) => video._id !== videoId
         )
      );

   };

   const handlePlatformUpdate = (
      videoId,
      platform,
      url
   ) => {

      setVideos((prev) =>
         prev.map((video) => {

            if (video._id !== videoId) {
               return video;
            }

            return {
               ...video,
               [platform]: {
                  uploaded: true,
                  url,
                  uploadedAt: new Date(),
               },
            };

         })
      );

   };

   return (

      <main className="min-h-screen bg-[#030712] text-white">

         <div className="max-w-7xl mx-auto px-4 py-10">

            {/* HEADER */}

            <div className="mb-10">

               <h1
                  className="
                     text-4xl
                     md:text-5xl
                     font-bold
                     tracking-tight
                  "
               >
                  Video Library
               </h1>

               <p
                  className="
                     text-zinc-400
                     mt-3
                  "
               >
                  Manage, publish and track all
                  your AI generated videos.
               </p>

            </div>

            {/* ERROR */}

            {
               error && (

                  <div
                     className="
                        mb-8
                        rounded-2xl
                        border
                        border-red-500/20
                        bg-red-500/10
                        text-red-400
                        p-4
                     "
                  >
                     {error}
                  </div>

               )
            }

            {/* STATS */}

            <div
               className="
                  grid
                  grid-cols-2
                  lg:grid-cols-5
                  gap-4
                  mb-10
               "
            >

               <StatsCard
                  title="Total Videos"
                  value={stats.totalVideos}
               />

               <StatsCard
                  title="Completed"
                  value={stats.completedVideos}
               />

               <StatsCard
                  title="YouTube"
                  value={stats.youtubeUploaded}
               />

               <StatsCard
                  title="Instagram"
                  value={stats.instagramUploaded}
               />

               <StatsCard
                  title="Facebook"
                  value={stats.facebookUploaded}
               />

            </div>

            {/* SEARCH + FILTER */}

            <div
               className="
                  flex
                  flex-col
                  md:flex-row
                  gap-4
                  mb-10
               "
            >

               <input
                  type="text"
                  placeholder="Search videos..."
                  value={search}
                  onChange={(e) =>
                     setSearch(e.target.value)
                  }
                  className="
                     flex-1
                     bg-white/5
                     border
                     border-white/10
                     rounded-2xl
                     px-5
                     py-3
                     outline-none
                     focus:border-cyan-500/50
                  "
               />

               <select
                  value={statusFilter}
                  onChange={(e) =>
                     setStatusFilter(
                        e.target.value
                     )
                  }
                  className="
                     bg-white/5
                     border
                     border-white/10
                     rounded-2xl
                     px-5
                     py-3
                     outline-none
                  "
               >

                  <option
                     value="all"
                     className="bg-black"
                  >
                     All Status
                  </option>

                  <option
                     value="completed"
                     className="bg-black"
                  >
                     Completed
                  </option>

                  <option
                     value="processing"
                     className="bg-black"
                  >
                     Processing
                  </option>

                  <option
                     value="failed"
                     className="bg-black"
                  >
                     Failed
                  </option>

               </select>

            </div>

            {/* LOADING */}

            {
               loading && (

                  <div
                     className="
                        flex
                        justify-center
                        py-20
                     "
                  >
                     Loading videos...
                  </div>

               )
            }

            {/* EMPTY */}

            {
               !loading &&
               filteredVideos.length === 0 && (

                  <div
                     className="
                        rounded-3xl
                        border
                        border-white/10
                        bg-white/[0.03]
                        text-center
                        p-16
                     "
                  >

                     <h2
                        className="
                           text-3xl
                           font-bold
                           mb-3
                        "
                     >
                        No Videos Found
                     </h2>

                     <p className="text-zinc-400">
                        Generate your first AI
                        video to start building
                        your library.
                     </p>

                  </div>

               )
            }

            {/* VIDEO GRID */}

            {
               !loading &&
               filteredVideos.length > 0 && (

                  <div
                     className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        xl:grid-cols-3
                        gap-8
                     "
                  >

                     {
                        filteredVideos.map(
                           (video) => (

                              <VideoCard
                                 key={video._id}
                                 video={video}
                                 onDelete={
                                    handleDelete
                                 }
                                 onPlatformUpdate={
                                    handlePlatformUpdate
                                 }
                              />

                           )
                        )
                     }

                  </div>

               )
            }

         </div>

      </main>

   );

}