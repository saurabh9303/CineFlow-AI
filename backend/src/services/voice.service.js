import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "fs";
import path from "path";

const ENABLE_VOICE = false; // 👈 temporary disable

const elevenlabs = new ElevenLabsClient({
   apiKey: process.env.ELEVENLABS_API_KEY,
});

export async function generateVoice(script) {

   try {

      // ✅ Voice disabled
      if (!ENABLE_VOICE) {

         console.log("⚠️ Voice generation disabled");

         // dummy silent audio path
         const dummyPath = path.join(
            "src",
            "temp",
            "audio",
            "Oudio.mp3"
         );

         return dummyPath;
      }

      console.log("🎤 Generating Voice...");

      const audioStream = await elevenlabs.textToSpeech.convert(
         "JBFqnCBsd6RMkjVDRZzb",
         {
            text: script,
            model_id: "eleven_multilingual_v2",
         }
      );

      const chunks = [];

      for await (const chunk of audioStream) {
         chunks.push(chunk);
      }

      const audioBuffer = Buffer.concat(chunks);

      const outputPath = path.join(
         "src",
         "temp",
         "audio",
         "voice.mp3"
      );

      fs.writeFileSync(outputPath, audioBuffer);

      console.log("✅ Voice Saved:", outputPath);

      return outputPath;

   } catch (error) {

      console.log("❌ Voice Generation Error:", error.message);

      throw error;
   }
}



// import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

// import fs from "fs";
// import path from "path";
// // import dotenv from "dotenv";

// // dotenv.config();

// const elevenlabs = new ElevenLabsClient({
//    apiKey: process.env.ELEVENLABS_API_KEY,
// });

// export async function generateVoice(script) {

//    try {

//       console.log("🎤 Generating Voice...");

//       const audioStream = await elevenlabs.textToSpeech.convert(
//          "JBFqnCBsd6RMkjVDRZzb",
//          {
//             text: script,
//             model_id: "eleven_multilingual_v2",
//          }
//       );

//       const chunks = [];

//       for await (const chunk of audioStream) {
//          chunks.push(chunk);
//       }

//       const audioBuffer = Buffer.concat(chunks);

//       const outputPath = path.join(
//          "src",
//          "temp",
//          "audio",
//          "voice.mp3"
//       );

//       fs.writeFileSync(outputPath, audioBuffer);

//       console.log("✅ Voice Saved:", outputPath);

//       return outputPath;

//    } catch (error) {

//       console.log("❌ Voice Generation Error:", error.message);

//       throw error;
//    }
// }