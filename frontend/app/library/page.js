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
               { credentials: "include" }
            );

            const data = await res.json();

            if (!res.ok) {
               throw new Error(data.message || "Failed to fetch videos");
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
         completedVideos: videos.filter(v => v.status === "completed").length,
         youtubeUploaded: videos.filter(v => v.youtube?.uploaded).length,
         instagramUploaded: videos.filter(v => v.instagram?.uploaded).length,
         facebookUploaded: videos.filter(v => v.facebook?.uploaded).length,
      };
   }, [videos]);

   const filteredVideos = useMemo(() => {
      let result = [...videos];

      if (search.trim()) {
         result = result.filter(v =>
            v.topic?.toLowerCase().includes(search.toLowerCase())
         );
      }

      if (statusFilter !== "all") {
         result = result.filter(v => v.status === statusFilter);
      }

      return result;
   }, [videos, search, statusFilter]);

   const handleDelete = (videoId) => {
      setVideos(prev => prev.filter(v => v._id !== videoId));
   };

   const handlePlatformUpdate = (videoId, platform, url) => {
      setVideos(prev =>
         prev.map(v => {
            if (v._id !== videoId) return v;

            return {
               ...v,
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

         <div className="max-w-7xl mx-auto px-5 py-8">

            {/* HEADER (compact) */}
            <div className="mb-6">
               <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Video Library
               </h1>
               <p className="text-zinc-400 text-sm mt-1">
                  Manage and publish AI videos
               </p>
            </div>

            {/* ERROR */}
            {error && (
               <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 p-3 text-sm">
                  {error}
               </div>
            )}

            {/* STATS (compact grid) */}
            {/* STATS - SaaS KPI STRIP */}
            <div className="mb-6 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md px-4 py-3">

               <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4 text-xs md:text-sm">

                  <div className="flex items-center gap-2">
                     <span className="text-zinc-400">Total</span>
                     <span className="font-semibold text-white">
                        {stats.totalVideos}
                     </span>
                  </div>

                  <div className="h-4 w-px bg-white/10 hidden md:block" />

                  <div className="flex items-center gap-2">
                     <span className="text-zinc-400">Completed</span>
                     <span className="font-semibold text-green-400">
                        {stats.completedVideos}
                     </span>
                  </div>

                  <div className="h-4 w-px bg-white/10 hidden md:block" />

                  <div className="flex items-center gap-2">
                     <span className="text-zinc-400">YouTube</span>
                     <span className="font-semibold text-white">
                        {stats.youtubeUploaded}
                     </span>
                  </div>

                  <div className="h-4 w-px bg-white/10 hidden md:block" />

                  <div className="flex items-center gap-2">
                     <span className="text-zinc-400">Instagram</span>
                     <span className="font-semibold text-white">
                        {stats.instagramUploaded}
                     </span>
                  </div>

                  <div className="h-4 w-px bg-white/10 hidden md:block" />

                  <div className="flex items-center gap-2">
                     <span className="text-zinc-400">Facebook</span>
                     <span className="font-semibold text-white">
                        {stats.facebookUploaded}
                     </span>
                  </div>

               </div>
            </div>

            {/* SEARCH + FILTER (single row on desktop) */}
            <div className="flex flex-col md:flex-row gap-3 mb-6">

               <input
                  type="text"
                  placeholder="Search videos..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="
                     flex-1
                     bg-white/5
                     border border-white/10
                     rounded-xl
                     px-4 py-2.5
                     text-sm
                     outline-none
                     focus:border-cyan-500/40
                  "
               />

               <div className="relative w-full md:w-52">

                  <select
                     value={statusFilter}
                     onChange={(e) => setStatusFilter(e.target.value)}
                     className="
         w-full
         appearance-none

         bg-[#0b1220]
         border border-white/10
         rounded-xl

         px-4 py-2.5 pr-10

         text-sm text-white
         placeholder:text-zinc-400

         outline-none
         cursor-pointer

         transition
         hover:border-cyan-500/40
         focus:border-cyan-500/60
         focus:ring-2 focus:ring-cyan-500/10
      "
                  >
                     <option value="all" className="text-white">All Status</option>
                     <option value="completed" className="text-white">Completed</option>
                     <option value="processing" className="text-white">Processing</option>
                     <option value="failed" className="text-white">Failed</option>
                  </select>

                  {/* arrow */}
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                     <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                     >
                        <path
                           d="M6 9l6 6 6-6"
                           stroke="currentColor"
                           strokeWidth="2"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                        />
                     </svg>
                  </div>

               </div>
            </div>

            {/* LOADING */}
            {loading && (
               <div className="text-center py-12 text-sm text-zinc-400">
                  Loading videos...
               </div>
            )}

            {/* EMPTY STATE (compact) */}
            {!loading && filteredVideos.length === 0 && (
               <div className="rounded-2xl border border-white/10 bg-white/[0.03] text-center p-10">
                  <h2 className="text-xl font-semibold">
                     No Videos Found
                  </h2>
                  <p className="text-zinc-400 text-sm mt-2">
                     Create your first AI video to get started
                  </p>
               </div>
            )}

            {/* GRID (denser layout) */}
            {!loading && filteredVideos.length > 0 && (
               <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredVideos.map(video => (
                     <VideoCard
                        key={video._id}
                        video={video}
                        onDelete={handleDelete}
                        onPlatformUpdate={handlePlatformUpdate}
                     />
                  ))}
               </div>
            )}

         </div>
      </main>
   );
}