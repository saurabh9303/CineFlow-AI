import mongoose from "mongoose";

const shortSchema = new mongoose.Schema(
   {
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },

      topic: String,
      script: String,

      audioUrl: String,
      videoUrl: String,

      cloudinaryPublicId: String,

      youtubeUrl: String,
   },
   { timestamps: true }
);

export default mongoose.model("Short", shortSchema);