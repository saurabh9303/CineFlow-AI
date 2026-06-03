import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import path from "path";

export async function mergeAudioVideo(videoPath, audioPath) {
   return new Promise((resolve, reject) => {
      const finalDir = path.resolve("src/temp/final");
      fs.mkdirSync(finalDir, { recursive: true });

      const outputPath = path.resolve(
         finalDir,
         `final-${Date.now()}.mp4`
      );

      ffmpeg()
         .input(videoPath)
         .input(audioPath)
         .outputOptions([
            "-map 0:v:0",
            "-map 1:a:0",

            // Video Compression
            "-vf scale=-2:1080",
            "-c:v libx264",
            "-crf 24",
            "-preset medium",
            "-pix_fmt yuv420p",

            // Audio
            "-c:a aac",
            "-b:a 128k",
            "-ac 2",
            "-ar 44100",

            // Other
            "-af volume=2.0",
            "-shortest",
            "-movflags +faststart"
         ])
         .output(outputPath)
         .on("end", () => resolve(outputPath))
         .on("error", (err) => reject(err))
         .run();
   });
}