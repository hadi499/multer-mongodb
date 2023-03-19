import express from "express";
import connectDB from "./config/db.js";
import path from "path";
import dotenv from "dotenv";
import articleRoutes from "./routes/articles.js";
import uploadRoutes from "./routes/upload.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use("/api/articles", articleRoutes);
app.use("/api/upload", uploadRoutes);
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
