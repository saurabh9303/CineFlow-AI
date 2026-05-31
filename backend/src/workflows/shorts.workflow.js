import { generateTopic } from "../services/topic.service.js";
import { generateScript } from "../services/script.service.js";
import { generateVoice } from "../services/voice.service.js";
import { generateVideo } from "../services/video.service.js";
import { mergeAudioVideo } from "../services/ffmpeg.service.js";
import { uploadToYoutube } from "../services/upload.service.js";
import { uploadVideoToCloudinary } from "../services/cloudinary.service.js";
import Short from "../models/short.model.js";

export async function createShort(onProgress, userId) {

   console.log("🚀 [WORKFLOW START] createShort called for user:", userId);

   const result = {
      topic: null,
      script: null,
      audio: null,
      video: null,
      finalVideo: null,
      cloudinary: null,
      upload: null,
      db: null,
      status: "processing",
   };

   try {

      // ---------------- TOPIC ----------------
      console.log("🎯 [STEP 1] Generating Topic...");
      onProgress("🎯 Generating Topic");

      result.topic = await generateTopic();

      console.log("✅ Topic Generated:", result.topic);

      // ---------------- SCRIPT ----------------
      console.log("🚀 [STEP 2] Generating Script...");
      onProgress("🚀 Generating Script");

      result.script = await generateScript(result.topic);

      console.log("✅ Script Generated (length):", result.script?.length);

      // ---------------- VOICE ----------------
      console.log("🎤 [STEP 3] Generating Voice...");
      onProgress("🎤 Generating Voice");

      result.audio = await generateVoice(result.script);

      console.log("✅ Voice Generated (audio path):", result.audio);

      // ---------------- VIDEO ----------------
      console.log("🎬 [STEP 4] Generating Video...");
      onProgress("🎬 Generating Video");

      result.video = await generateVideo(result.script);

      console.log("✅ Video Generated (path):", result.video);

      // ---------------- MERGE ----------------
      console.log("🎞️ [STEP 5] Merging Audio + Video...");
      onProgress("🎞️ Merging Audio + Video");

      result.finalVideo = await mergeAudioVideo(
         result.video,
         result.audio
      );

      console.log("✅ Final Video Created:", result.finalVideo);

      // ---------------- CLOUDINARY ----------------
      // console.log("☁️ [STEP 6] Cloudinary Disabled (Testing Mode)");
      // onProgress("☁️ Cloudinary Disabled");

      // result.cloudinary = {
      //    url: result.finalVideo,
      //    public_id: "cloudinary-disabled"
      // };

      // console.log("✅ Fake Cloudinary Response:");
      // console.log("   🔗 URL:", result.cloudinary.url);
      // console.log("   🆔 Public ID:", result.cloudinary.public_id);

      // ############## Original Cloudinery code ##############3

      console.log("☁️ [STEP 6] Uploading to Cloudinary...");
      onProgress("☁️ Uploading to Cloudinary");

      result.cloudinary = await uploadVideoToCloudinary(
         result.finalVideo
      );

      console.log("✅ Cloudinary Upload Success:");
      console.log("   🔗 URL:", result.cloudinary.url);
      console.log("   🆔 Public ID:", result.cloudinary.public_id);

      // ---------------- YOUTUBE ----------------
      console.log("📤 [STEP 7] Uploading to YouTube...");
      onProgress("📤 Uploading to YouTube");

      result.upload = await uploadToYoutube(result.finalVideo);

      console.log("✅ YouTube Upload Done:", result.upload);

      // ---------------- DB SAVE ----------------
      console.log("💾 [STEP 8] Saving to Database...");
      onProgress("💾 Saving to Database");

      result.db = await Short.create({
         userId,
         topic: result.topic,
         script: result.script,
         audioUrl: result.audio,
         videoUrl: result.cloudinary.url,
         cloudinaryPublicId: result.cloudinary.public_id,
         youtubeUrl: result.upload?.url || null,
      });

      console.log("✅ DB Saved Successfully:");
      console.log("   📄 DB ID:", result.db._id);
      console.log("   ☁️ Cloudinary URL:", result.cloudinary.url);
      console.log("   📺 YouTube URL:", result.upload?.url);

      // ---------------- COMPLETE ----------------
      console.log("🎉 [WORKFLOW COMPLETE]");
      onProgress("✅ Completed");

      return result;

   } catch (error) {

      console.error("❌ [WORKFLOW ERROR]:", error);

      onProgress("❌ Failed");

      throw error;
   }
}