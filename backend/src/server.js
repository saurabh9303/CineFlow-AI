import dotenv from "dotenv";

dotenv.config();


import { connectDB } from "./config/db.js";


const { default: app } = await import("./app.js");


if (connectDB) {
   await connectDB();
}

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
   console.log(`Server running on ${PORT}`);
});