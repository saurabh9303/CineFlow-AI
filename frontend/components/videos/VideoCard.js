"use client";

import { useState } from "react";

export default function VideoCard({
   video,
   onDelete,
   onPlatformUpdate,
}) {
   const [uploading, setUploading] = useState("");
   const [deleting, setDeleting] = useState(false);

   const copyScript = async () => {
      try {
         await navigator.clipboard.writeText(video.script || "");
         alert("Script copied successfully");
      } catch {
         alert("Failed to copy script");
      }
   };

   const handleUpload = async (platform) => {
      try {
         setUploading(platform);

         let endpoint = "";

         if (platform === "youtube") {
            endpoint = `http://localhost:8000/api/youtube/upload/${video._id}`;
         } else {
            alert(`${platform} upload not implemented yet`);
            return;
         }

         const res = await fetch(endpoint, {
            method: "POST",
            credentials: "include",
         });

         const data = await res.json();

         if (!res.ok) {
            throw new Error(data.message || `${platform} upload failed`);
         }

         onPlatformUpdate(
            video._id,
            platform,
            data.youtube?.url || data.url
         );

         alert("Video uploaded successfully");
      } catch (err) {
         alert(err.message);
      } finally {
         setUploading("");
      }
   };

   const handleDelete = async () => {
      const confirmed = window.confirm(
         "Are you sure you want to delete this video?"
      );

      if (!confirmed) return;

      try {
         setDeleting(true);

         const res = await fetch(
            `http://localhost:8000/api/library/video/${video._id}`,
            {
               method: "DELETE",
               credentials: "include",
            }
         );

         const data = await res.json();

         if (!res.ok) {
            throw new Error(data.message || "Failed to delete video");
         }

         onDelete(video._id);
      } catch (err) {
         alert(err.message);
      } finally {
         setDeleting(false);
      }
   };

   return (
      <div className="
         group
         rounded-2xl
         overflow-hidden
         border border-white/10
         bg-white/[0.03]
         backdrop-blur-xl
         hover:border-cyan-500/30
         transition-all duration-300
      ">

         {/* THUMBNAIL (smaller + tighter) */}
         <div className="relative">
            <img
               src={video.thumbnailUrl}
               alt={video.topic}
               className="w-full aspect-video object-cover"
            />

            <span className={`
               absolute top-2 right-2
               px-2 py-0.5 text-[11px] rounded-full border
               ${video.status === "completed"
                  ? "bg-green-500/15 text-green-400 border-green-500/20"
                  : video.status === "failed"
                  ? "bg-red-500/15 text-red-400 border-red-500/20"
                  : "bg-yellow-500/15 text-yellow-300 border-yellow-500/20"
               }
            `}>
               {video.status}
            </span>
         </div>

         {/* CONTENT (compact) */}
         <div className="p-4">

            {/* TITLE */}
            <h2 className="text-base font-semibold line-clamp-1">
               {video.topic}
            </h2>

            {/* DATE */}
            <p className="text-[11px] text-zinc-400 mt-1">
               {new Date(video.createdAt).toLocaleString()}
            </p>

            {/* PLATFORM STATUS (compact row) */}
            <div className="mt-3 flex flex-col gap-1 text-xs border border-white/10 rounded-xl p-3 bg-white/5">
               <div className="flex justify-between">
                  <span>YouTube</span>
                  <span className={video.youtube?.uploaded ? "text-green-400" : "text-zinc-500"}>
                     {video.youtube?.uploaded ? "Uploaded" : "Pending"}
                  </span>
               </div>

               <div className="flex justify-between">
                  <span>Instagram</span>
                  <span className={video.instagram?.uploaded ? "text-green-400" : "text-zinc-500"}>
                     {video.instagram?.uploaded ? "Uploaded" : "Pending"}
                  </span>
               </div>

               <div className="flex justify-between">
                  <span>Facebook</span>
                  <span className={video.facebook?.uploaded ? "text-green-400" : "text-zinc-500"}>
                     {video.facebook?.uploaded ? "Uploaded" : "Pending"}
                  </span>
               </div>
            </div>

            {/* ACTION BUTTONS (compact grid) */}
            <div className="grid grid-cols-2 gap-2 mt-3 text-xs">

               <a
                  href={video.videoUrl}
                  target="_blank"
                  className="text-center py-2 rounded-lg bg-cyan-500/90 hover:bg-cyan-400 transition"
               >
                  Watch
               </a>

               <a
                  href={video.videoUrl}
                  download
                  className="text-center py-2 rounded-lg border border-white/10 hover:bg-white/10 transition"
               >
                  Download
               </a>

               <button
                  onClick={copyScript}
                  className="py-2 rounded-lg border border-white/10 hover:bg-white/10 transition"
               >
                  Copy Script
               </button>

               <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="py-2 rounded-lg bg-red-500/15 text-red-400 hover:bg-red-500/25 transition"
               >
                  {deleting ? "..." : "Delete"}
               </button>
            </div>

            {/* UPLOAD SECTION (compressed) */}
            <div className="mt-3 space-y-2">

               {video.youtube?.uploaded ? (
                  <a
                     href={video.youtube.url}
                     className="block text-center py-2 rounded-lg bg-green-600/90 hover:bg-green-500 transition text-sm"
                  >
                     View YouTube
                  </a>
               ) : (
                  <button
                     onClick={() => handleUpload("youtube")}
                     disabled={uploading === "youtube"}
                     className="w-full py-2 rounded-lg bg-red-600 hover:bg-red-500 transition text-sm"
                  >
                     {uploading === "youtube"
                        ? "Uploading..."
                        : "Upload YouTube"}
                  </button>
               )}

               {!video.instagram?.uploaded && (
                  <button
                     onClick={() => handleUpload("instagram")}
                     disabled={uploading === "instagram"}
                     className="w-full py-2 rounded-lg bg-pink-600 hover:bg-pink-500 transition text-sm"
                  >
                     {uploading === "instagram"
                        ? "Uploading..."
                        : "Upload Instagram"}
                  </button>
               )}

               {!video.facebook?.uploaded && (
                  <button
                     onClick={() => handleUpload("facebook")}
                     disabled={uploading === "facebook"}
                     className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition text-sm"
                  >
                     {uploading === "facebook"
                        ? "Uploading..."
                        : "Upload Facebook"}
                  </button>
               )}

            </div>

         </div>
      </div>
   );
}