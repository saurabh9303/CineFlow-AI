import fs from "fs";
import path from "path";

export async function generateVideo(script) {

   const videoDir = path.join("src", "temp", "video");

   if (!fs.existsSync(videoDir)) {
      throw new Error("Video folder not found");
   }

   const files = fs.readdirSync(videoDir);

   const videoFiles = files.filter(f =>
      f.endsWith(".mp4")
   );

   if (videoFiles.length === 0) {
      throw new Error("No video file found in temp/video");
   }

   // RANDOM PICK (better UX)
   const selectedFile =
      videoFiles[Math.floor(Math.random() * videoFiles.length)];

   const fullPath = path.join(videoDir, selectedFile);

   console.log("🎬 Selected Video:", fullPath);

   return fullPath;
}