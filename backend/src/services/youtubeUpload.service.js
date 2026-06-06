import { google } from "googleapis";
import { Readable } from "stream";

import { oauth2Client } from "../config/google.config.js";

export const uploadToYoutube = async ({
   refreshToken,
   title,
   description,
   videoUrl,
}) => {

   try {

      if (!refreshToken) {
         throw new Error(
            "YouTube refresh token not found"
         );
      }

      // OAuth credentials
      oauth2Client.setCredentials({
         refresh_token: refreshToken,
      });

      const youtube = google.youtube({
         version: "v3",
         auth: oauth2Client,
      });

      console.log("🎬 Fetching video from Cloudinary...");

      const response = await fetch(videoUrl);

      if (!response.ok) {
         throw new Error(
            `Failed to fetch video: ${response.status}`
         );
      }

      if (!response.body) {
         throw new Error(
            "Video stream not available"
         );
      }

      const videoStream =
         Readable.fromWeb(response.body);

      console.log("📤 Uploading video to YouTube...");

      const uploadResponse =
         await youtube.videos.insert({

            part: [
               "snippet",
               "status",
            ],

            requestBody: {

               snippet: {
                  title,
                  description,
               },

               status: {
                  privacyStatus: "public",
               },

            },

            media: {
               body: videoStream,
            },

         });

      console.log(
         "✅ YouTube Upload Success:",
         uploadResponse.data.id
      );

      return {
         success: true,
         videoId: uploadResponse.data.id,
         url: `https://www.youtube.com/watch?v=${uploadResponse.data.id}`,
      };

   } catch (error) {

      console.error(
         "❌ YouTube Upload Error:",
         error
      );

      throw error;

   }

};