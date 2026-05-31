import express from "express";
import { createShort } from "../workflows/shorts.workflow.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/generate", authMiddleware, async (req, res) => {

   // SSE headers
   res.setHeader("Content-Type", "text/event-stream");
   res.setHeader("Cache-Control", "no-cache");
   res.setHeader("Connection", "keep-alive");
   res.setHeader("X-Accel-Buffering", "no");

   const send = (message) => {
      res.write(`data: ${JSON.stringify({ message })}\n\n`);
   };

   try {

      send("🚀 Starting pipeline...");

      const result = await createShort(send, req.user.id);

      send("🎉 Finalizing response...");

      res.write(`data: ${JSON.stringify({
         done: true,
         result
      })}\n\n`);

      res.end();

   } catch (err) {

      console.log("Workflow Error:", err);

      res.write(`data: ${JSON.stringify({
         error: err.message || "Something went wrong"
      })}\n\n`);

      res.end();
   }
});

export default router;