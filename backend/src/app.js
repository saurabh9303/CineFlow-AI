import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import integrationsRoutes from "./routes/integrations.routes.js";
import videoRoutes from "./routes/video.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import libraryRoutes from "./routes/library.routes.js";
import youtubeRoutes from "./routes/youtube.route.js";

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

app.use("/api/integrations", integrationsRoutes);

app.use("/api/youtube", youtubeRoutes);

export default app;