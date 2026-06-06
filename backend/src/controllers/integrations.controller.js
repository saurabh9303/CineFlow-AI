import User from "../models/user.model.js";

import {
   generateYoutubeAuthUrl,
   getYoutubeTokens,
   getYoutubeChannelInfo
} from "../services/youtube.service.js";

export const connectYoutube =
   async (req, res) => {

      try {
         console.log("REQ USER:", req.user);
         const userId = req.user.id;
         console.log("USER ID:", userId);

         const authUrl = generateYoutubeAuthUrl(userId);
         console.log("AUTH URL:", authUrl);
         console.log("CONNECT USER ID:", userId);
         console.log("AUTH URL:", authUrl);

         return res.status(200).json({
            success: true,
            authUrl
         });

      } catch (error) {

         return res.status(500).json({
            success: false,
            message: error.message
         });

      }

   };

export const youtubeCallback =
   async (req, res) => {

      try {

         const { code, state } = req.query;

         console.log("QUERY FULL:", req.query);


         if (!code) {

            return res.status(400).json({
               success: false,
               message: "Authorization code missing"
            });

         }

         if (!state) {
            return res.status(400).json({
               success: false,
               message: "OAuth state missing (userId not received)"
            });
         }

         const tokens =
            await getYoutubeTokens(code);

         console.log("TOKENS:", tokens);
         console.log("ACCESS TOKEN:", tokens.access_token);
         console.log("REFRESH TOKEN:", tokens.refresh_token);
         console.log("STATE (USER ID):", state || "❌ MISSING STATE");
         console.log("QUERY FULL:", req.query);

         const channel =
            await getYoutubeChannelInfo(tokens);

         console.log("CHANNEL INFO:", channel);

         const updateData = {

            "socialAccounts.youtube.connected":
               true,

            "socialAccounts.youtube.channelId":
               channel.id,

            "socialAccounts.youtube.channelTitle":
               channel.snippet.title,

            "socialAccounts.youtube.channelHandle":
               channel.snippet.customUrl || "",

            "socialAccounts.youtube.connectedAt":
               new Date()

         };

         if (tokens.refresh_token) {

            updateData[
               "socialAccounts.youtube.refreshToken"
            ] = tokens.refresh_token;

         }

         await User.findByIdAndUpdate(
            state,
            {
               $set: updateData
            }
         );

         return res.redirect(
            "http://localhost:3000/settings"
         );

      } catch (error) {

         console.error(error);

         return res.status(500).json({
            success: false,
            message: error.message
         });

      }

   };