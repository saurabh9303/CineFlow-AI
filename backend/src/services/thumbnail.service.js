import fs from "fs";
import path from "path";

export async function generateThumbnail() {

   try {

      const thumbDir = path.join(
         process.cwd(),
         "src",
         "temp",
         "thumb"
      );

      const files = fs
         .readdirSync(thumbDir)
         .filter(file =>
            /\.(jpg|jpeg|png|webp)$/i.test(file)
         );

      if (!files.length) {
         throw new Error(
            "No thumbnails found in temp/thumb folder"
         );
      }

      const randomFile =
         files[
            Math.floor(
               Math.random() * files.length
            )
         ];

      const thumbnailPath = path.join(
         thumbDir,
         randomFile
      );

      console.log(
         "🖼️ Selected Thumbnail:",
         randomFile
      );

      return thumbnailPath;

   } catch (error) {

      console.error(
         "Thumbnail Generation Error:",
         error
      );

      throw error;
   }

}