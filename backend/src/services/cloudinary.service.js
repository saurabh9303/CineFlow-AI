import cloudinary from "../config/cloudinary.js";

export const uploadVideoToCloudinary = async (filePath) => {
   try {
      const result = await cloudinary.uploader.upload(filePath, {
         resource_type: "video",
         folder: "cineflow-shorts",
      });

      return {
         url: result.secure_url,
         public_id: result.public_id,
      };
   } catch (error) {
      console.log("Cloudinary Upload Error:", error);
      throw error;
   }
};