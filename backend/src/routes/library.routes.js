import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import Short from "../models/short.model.js";

const router = express.Router();

router.get(
   "/videos",
   authMiddleware,
   async (req, res) => {

      try {

         const videos = await Short.find({
            userId: req.user.id
         })
         .sort({ createdAt: -1 });

         res.status(200).json({
            success: true,
            videos
         });

      } catch (error) {

         console.error(error);

         res.status(500).json({
            success: false,
            message: "Failed to fetch videos"
         });

      }

   }
);

export default router;