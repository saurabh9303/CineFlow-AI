import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

   name: {
      type: String,
      required: true,
      trim: true
   },

   email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
   },

   password: {
      type: String,
      required: true
   },

   avatar: {
      type: String,
      default: ""
   },

   role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
   },

   status: {
      type: String,
      enum: [
         "active",
         "banned",
         "deleted",
         "deactivated"
      ],
      default: "active"
   },

   // JWT Refresh Token
   refreshToken: {
      type: String,
      default: ""
   },

   socialAccounts: {

      youtube: {

         connected: {
            type: Boolean,
            default: false
         },

         channelId: {
            type: String,
            default: ""
         },

         channelTitle: {
            type: String,
            default: ""
         },

         channelHandle: {
            type: String,
            default: ""
         },

         refreshToken: {
            type: String,
            default: ""
         },

         connectedAt: {
            type: Date,
            default: null
         }

      },

      instagram: {

         connected: {
            type: Boolean,
            default: false
         },

         accountId: {
            type: String,
            default: ""
         },

         username: {
            type: String,
            default: ""
         },

         accessToken: {
            type: String,
            default: ""
         },

         connectedAt: {
            type: Date,
            default: null
         }

      },

      facebook: {

         connected: {
            type: Boolean,
            default: false
         },

         pageId: {
            type: String,
            default: ""
         },

         pageName: {
            type: String,
            default: ""
         },

         accessToken: {
            type: String,
            default: ""
         },

         connectedAt: {
            type: Date,
            default: null
         }

      }

   }

}, {
   timestamps: true
});

export default mongoose.model("User", userSchema);