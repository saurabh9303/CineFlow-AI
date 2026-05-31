import Groq from "groq-sdk";
// import dotenv from "dotenv";

// dotenv.config();

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function generateTopic() {

    const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
   {
      role: "system",
      content: `
Tum ek viral Hindi YouTube Shorts story idea generator ho.

Tumhara kaam cinematic aur highly engaging mini-story topics generate karna hai.

TOPIC TYPES:
- रहस्यमयी हवेली
- राजा रानी की कहानी
- डरावनी कहानी
- मजेदार कहानी
- गांव की कहानी
- emotional twist
- shocking ending
- funny situations
- suspense

STRICT RULES:
- Sirf Hindi me likho
- Topic ek mini kahani jaisa ho
- Character + problem + curiosity honi chahiye
- Topic sunte hi audience curious ho jaye
- Maximum 1 line
- No explanation
- No English
- Visually cinematic hona chahiye

GOOD EXAMPLES:
- एक पुरानी हवेली में हर रात पायल की आवाज़ आती थी
- राजा ने अपने सबसे वफादार सैनिक को अजीब सज़ा दी
- गांव के कुएं से रात में किसी के रोने की आवाज़ आती थी
- एक गरीब लड़के को जंगल में सोने का दरवाज़ा मिला
- दादी हर रात एक बंद कमरे से बात करती थीं
- स्कूल का चपरासी असल में करोड़पति निकला
`
   },

   {
      role: "user",
      content: "Ek viral Hindi cinematic Shorts topic do"
   }
]
    });

    return response.choices[0].message.content.trim();
}