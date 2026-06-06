import mongoose from "mongoose";

const platformSchema = new mongoose.Schema(
   {
      uploaded: {
         type: Boolean,
         default: false,
      },

      videoId: {
         type: String,
         default: null,
      },

      url: {
         type: String,
         default: null,
      },

      uploadedAt: {
         type: Date,
         default: null,
      },
   },
   {
      _id: false,
   }
);

const shortSchema = new mongoose.Schema(
   {
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },

      topic: {
         type: String,
         required: true,
         trim: true,
         index: true,
      },

      script: {
         type: String,
         required: true,
      },

      audioUrl: {
         type: String,
         default: null,
      },

      videoUrl: {
         type: String,
         required: true,
      },

      thumbnailUrl: {
         type: String,
         default: null,
      },

      cloudinaryVideoId: {
         type: String,
         default: null,
      },

      cloudinaryThumbnailId: {
         type: String,
         default: null,
      },

      duration: {
         type: Number,
         default: 0,
      },

      youtube: {
         type: platformSchema,
         default: () => ({}),
      },

      instagram: {
         type: platformSchema,
         default: () => ({}),
      },

      facebook: {
         type: platformSchema,
         default: () => ({}),
      },

      status: {
         type: String,
         enum: [
            "processing",
            "completed",
            "failed",
         ],
         default: "processing",
      },
   },
   {
      timestamps: true,
   }
);

export default mongoose.model("Short", shortSchema);