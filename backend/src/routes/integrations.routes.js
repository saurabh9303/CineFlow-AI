import express from "express";

import { authMiddleware } from "../middleware/auth.middleware.js";

import { connectYoutube, youtubeCallback } from "../controllers/integrations.controller.js";

const router = express.Router();

router.get(
   "/youtube/connect",
   authMiddleware,
   connectYoutube
);

router.get(
   "/youtube/callback",
   youtubeCallback
);

export default router;