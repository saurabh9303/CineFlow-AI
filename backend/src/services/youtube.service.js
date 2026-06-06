import { google } from "googleapis";
import { oauth2Client } from "../config/google.config.js";

export const generateYoutubeAuthUrl = (userId) => {
   return oauth2Client.generateAuthUrl({
      access_type: "offline",
      prompt: "consent",
      include_granted_scopes: true,
      state: userId,

      scope: [
         "https://www.googleapis.com/auth/youtube.upload",
         "https://www.googleapis.com/auth/youtube.readonly"
      ]
   });
};
// console.log(generateYoutubeAuthUrl);
export const getYoutubeTokens = async (code) => {

   const { tokens } =
      await oauth2Client.getToken(code);

   return tokens;

};

export const getYoutubeChannelInfo = async (tokens) => {

   oauth2Client.setCredentials(tokens);

   const youtube = google.youtube({
      version: "v3",
      auth: oauth2Client
   });

   const response =
      await youtube.channels.list({
         part: ["snippet"],
         mine: true
      });

   return response.data.items[0];

};