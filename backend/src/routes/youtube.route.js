import express from "express";

import { authMiddleware } from "../middleware/auth.middleware.js";

import {
   uploadShortToYoutube
} from "../controllers/youtube.controller.js";

const router = express.Router();

router.post(
   "/upload/:shortId",
   authMiddleware,
   uploadShortToYoutube
);

export default router;