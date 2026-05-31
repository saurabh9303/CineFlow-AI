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
            "-c:v copy",
            "-c:a aac",
            "-b:a 192k",
            "-ac 2",
            "-ar 44100",
            "-af volume=2.0",
            "-shortest",
            "-movflags +faststart"
         ])
         .output(outputPath)
         .on("end", () => resolve(outputPath)) // 🔥 STRING ONLY
         .on("error", (err) => reject(err))
         .run();
   });
}