import dotenv from "dotenv";

dotenv.config();

// import DB connection (optional but recommended)
import { connectDB } from "./config/db.js";

// app import (same as yours)
const { default: app } = await import("./app.js");

// connect database BEFORE starting server
if (connectDB) {
   await connectDB();
}

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
   console.log(`Server running on ${PORT}`);
});