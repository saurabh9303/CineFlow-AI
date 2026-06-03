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

         await navigator.clipboard.writeText(
            video.script || ""
         );

         alert("Script copied successfully");

      } catch {

         alert("Failed to copy script");

      }

   };

   const handleUpload = async (platform) => {

      try {

         setUploading(platform);

         const res = await fetch(
            `http://localhost:8000/api/upload/${platform}/${video._id}`,
            {
               method: "POST",
               credentials: "include",
            }
         );

         const data = await res.json();

         if (!res.ok) {

            throw new Error(
               data.message ||
               `${platform} upload failed`
            );

         }

         onPlatformUpdate(
            video._id,
            platform,
            data.url || "#"
         );

         alert(
            `${platform} uploaded successfully`
         );

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

            throw new Error(
               data.message ||
               "Failed to delete video"
            );

         }

         onDelete(video._id);

      } catch (err) {

         alert(err.message);

      } finally {

         setDeleting(false);

      }

   };

   return (

      <div
         className="
            rounded-3xl
            overflow-hidden
            border
            border-white/10
            bg-white/[0.03]
            backdrop-blur-xl
            hover:border-cyan-500/30
            hover:-translate-y-1
            transition-all
            duration-300
         "
      >

         {/* THUMBNAIL */}

         <div className="relative">

            <img
               src={video.thumbnailUrl}
               alt={video.topic}
               className="
                  w-full
                  aspect-video
                  object-cover
               "
            />

            <div
               className="
                  absolute
                  top-3
                  right-3
               "
            >

               <span
                  className={`
                     px-3
                     py-1
                     rounded-full
                     text-xs
                     font-medium
                     ${
                        video.status ===
                        "completed"
                           ? "bg-green-500/20 text-green-400"
                           : video.status ===
                             "failed"
                           ? "bg-red-500/20 text-red-400"
                           : "bg-yellow-500/20 text-yellow-400"
                     }
                  `}
               >
                  {video.status}
               </span>

            </div>

         </div>

         {/* CONTENT */}

         <div className="p-5">

            <h2
               className="
                  text-lg
                  font-semibold
                  line-clamp-2
                  mb-3
               "
            >
               {video.topic}
            </h2>

            <p
               className="
                  text-sm
                  text-zinc-400
                  mb-5
               "
            >
               {new Date(
                  video.createdAt
               ).toLocaleString()}
            </p>

            {/* PLATFORM STATUS */}

            <div
               className="
                  border
                  border-white/10
                  rounded-2xl
                  p-4
                  mb-5
               "
            >

               <div
                  className="
                     flex
                     justify-between
                     mb-2
                  "
               >
                  <span>YouTube</span>

                  <span
                     className={
                        video.youtube?.uploaded
                           ? "text-green-400"
                           : "text-zinc-500"
                     }
                  >
                     {
                        video.youtube?.uploaded
                           ? "Uploaded"
                           : "Pending"
                     }
                  </span>
               </div>

               <div
                  className="
                     flex
                     justify-between
                     mb-2
                  "
               >
                  <span>Instagram</span>

                  <span
                     className={
                        video.instagram?.uploaded
                           ? "text-green-400"
                           : "text-zinc-500"
                     }
                  >
                     {
                        video.instagram?.uploaded
                           ? "Uploaded"
                           : "Pending"
                     }
                  </span>
               </div>

               <div
                  className="
                     flex
                     justify-between
                  "
               >
                  <span>Facebook</span>

                  <span
                     className={
                        video.facebook?.uploaded
                           ? "text-green-400"
                           : "text-zinc-500"
                     }
                  >
                     {
                        video.facebook?.uploaded
                           ? "Uploaded"
                           : "Pending"
                     }
                  </span>
               </div>

            </div>

            {/* ACTIONS */}

            <div
               className="
                  grid
                  grid-cols-2
                  gap-3
                  mb-5
               "
            >

               <a
                  href={video.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="
                     text-center
                     rounded-xl
                     bg-cyan-500
                     hover:bg-cyan-400
                     py-3
                     transition
                  "
               >
                  Watch
               </a>

               <a
                  href={video.videoUrl}
                  download
                  className="
                     text-center
                     rounded-xl
                     border
                     border-white/10
                     hover:bg-white/10
                     py-3
                     transition
                  "
               >
                  Download
               </a>

               <button
                  onClick={copyScript}
                  className="
                     rounded-xl
                     border
                     border-white/10
                     hover:bg-white/10
                     py-3
                     transition
                  "
               >
                  Copy Script
               </button>

               <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="
                     rounded-xl
                     bg-red-500/15
                     text-red-400
                     hover:bg-red-500/25
                     py-3
                     transition
                  "
               >
                  {
                     deleting
                        ? "Deleting..."
                        : "Delete"
                  }
               </button>

            </div>

            {/* UPLOAD SECTION */}

            <div
               className="
                  border-t
                  border-white/10
                  pt-4
                  space-y-3
               "
            >

               {
                  !video.youtube?.uploaded && (

                     <button
                        onClick={() =>
                           handleUpload(
                              "youtube"
                           )
                        }
                        disabled={
                           uploading ===
                           "youtube"
                        }
                        className="
                           w-full
                           rounded-xl
                           bg-red-600
                           hover:bg-red-500
                           py-3
                           transition
                        "
                     >
                        {
                           uploading ===
                           "youtube"
                              ? "Uploading..."
                              : "Upload to YouTube"
                        }
                     </button>

                  )
               }

               {
                  !video.instagram
                     ?.uploaded && (

                     <button
                        onClick={() =>
                           handleUpload(
                              "instagram"
                           )
                        }
                        disabled={
                           uploading ===
                           "instagram"
                        }
                        className="
                           w-full
                           rounded-xl
                           bg-pink-600
                           hover:bg-pink-500
                           py-3
                           transition
                        "
                     >
                        {
                           uploading ===
                           "instagram"
                              ? "Uploading..."
                              : "Upload to Instagram"
                        }
                     </button>

                  )
               }

               {
                  !video.facebook
                     ?.uploaded && (

                     <button
                        onClick={() =>
                           handleUpload(
                              "facebook"
                           )
                        }
                        disabled={
                           uploading ===
                           "facebook"
                        }
                        className="
                           w-full
                           rounded-xl
                           bg-blue-600
                           hover:bg-blue-500
                           py-3
                           transition
                        "
                     >
                        {
                           uploading ===
                           "facebook"
                              ? "Uploading..."
                              : "Upload to Facebook"
                        }
                     </button>

                  )
               }

            </div>

         </div>

      </div>

   );

}