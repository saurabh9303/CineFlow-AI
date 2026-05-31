import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                error: "Message is required"
            });
        }

        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",

            messages: [
                {
                    role: "system",
                    content:
                        "You are CineFlow AI, a powerful AI assistant. Never say you are Gemini or ChatGPT. Always introduce yourself as CineFlow AI.",
                },

                {
                    role: "user",
                    content: message,
                },
            ],
        });

        const text = response.choices[0].message.content;

        res.json({
            reply: text
        });

    } catch (error) {
        console.error("Error:", error);

        res.status(500).json({
            error: error.message
        });
    }
});

app.listen(8000, () => {
    console.log("Server running on http://localhost:8000");
});