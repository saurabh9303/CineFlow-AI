import User from "../models/user.model.js";
import Short from "../models/short.model.js";

import {
   uploadToYoutube,
} from "../services/youtubeUpload.service.js";

export const uploadShortToYoutube =
   async (req, res) => {

      try {

         const { shortId } = req.params;

         const userId = req.user.id;

         // Find short owned by logged-in user
         const short =
            await Short.findOne({
               _id: shortId,
               userId,
            });

         if (!short) {

            return res.status(404).json({
               success: false,
               message: "Short not found",
            });

         }

         // Prevent duplicate upload
         if (short.youtube?.uploaded) {

            return res.status(400).json({
               success: false,
               message:
                  "Video already uploaded to YouTube",
            });

         }

         // Find user
         const user =
            await User.findById(userId);

         if (!user) {

            return res.status(404).json({
               success: false,
               message: "User not found",
            });

         }

         const refreshToken =
            user?.socialAccounts?.youtube?.refreshToken;

         if (!refreshToken) {

            return res.status(400).json({
               success: false,
               message:
                  "YouTube account not connected",
            });

         }

         // Upload
         const result =
            await uploadToYoutube({

               refreshToken,

               title:
                  short.topic?.substring(
                     0,
                     100
                  ),

               description:
                  short.script,

               videoUrl:
                  short.videoUrl,

            });

         // Update DB
         await Short.findByIdAndUpdate(
            shortId,
            {
               $set: {

                  "youtube.uploaded":
                     true,

                  "youtube.videoId":
                     result.videoId,

                  "youtube.url":
                     result.url,

                  "youtube.uploadedAt":
                     new Date(),

               },
            }
         );

         return res.status(200).json({

            success: true,

            message:
               "Video uploaded successfully",

            youtube: {
               videoId:
                  result.videoId,

               url:
                  result.url,
            },

         });

      } catch (error) {

         console.error(
            "YOUTUBE UPLOAD ERROR:",
            error
         );

         return res.status(500).json({
            success: false,
            message: error.message,
         });

      }

   };