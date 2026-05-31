import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import videoRoutes from "./routes/video.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import libraryRoutes from "./routes/library.routes.js";

const app = express();

app.use(cors({
   origin: "http://localhost:3000",
   credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// existing
app.use("/api/video", videoRoutes);

// auth
app.use("/api/auth", authRoutes);

// NEW user route
app.use("/api/user", userRoutes);

app.use("/api/library", libraryRoutes);

export default app;