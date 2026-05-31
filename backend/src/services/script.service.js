import Groq from "groq-sdk";
// import dotenv from "dotenv";

// dotenv.config();

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function generateScript(topic) {

    const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        temperature: 1,
        messages: [
            {
                role: "system",
                content: `
Tum viral Hindi YouTube Shorts ke expert suspense storyteller ho.

Tumhara kaam aisi mini stories likhna hai
jo audience ko end tak dekhne par majboor kar dein.

IMPORTANT:
- Script natural spoken Hindi me honi chahiye
- Story real insan ki kahani jaisi lage
- Har line curiosity build kare
- Audience ko “aage kya hoga?” feel aana chahiye
- Narration cinematic aur suspenseful hona chahiye
- Story boring nahi honi chahiye
- Script AI generated nahi lagni chahiye

STYLE:
- Curiosity driven storytelling
- Suspense build-up
- Emotional tension
- Dark humor ya funny twist
- Meme-style unexpected ending
- Internet-style pacing

STORY STRUCTURE:
1. Strong hook
2. Suspense setup
3. Tension increase
4. Unexpected reveal
5. Funny ya shocking twist ending

STRICT RULES:
- Maximum 90 words
- 6-9 short lines
- Har line short aur punchy ho
- No paragraphs
- No scene labels
- No difficult Hindi
- Voiceover friendly
- Fast pacing
- Last line strongest honi chahiye

GOOD EXAMPLE STYLE:

"हर रात मेरे कमरे के बाहर
किसी के चलने की आवाज आती थी...

पहले लगा बिल्ली होगी।

लेकिन कल रात
आवाज़ मेरे कमरे के अंदर से आई 😭

मैं डरते-डरते उठा...

और देखा...

पापा मेरा charger ढूंढ रहे थे 💀"
`
            },
            {
                role: "user",
                content: `Is topic par ek viral funny Hindi Shorts script likho: ${topic}`
            }
        ]
    });

    return response.choices[0].message.content.trim();
}