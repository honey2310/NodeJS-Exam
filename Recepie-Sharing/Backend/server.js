import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; // IMPORTANT: .js required
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import cors from 'cors'
import commentRoutes from "./routes/commentRoutes.js";

dotenv.config();

const app = express();

// Connect Database
connectDB();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("🍳 Recipe API Running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/comments", commentRoutes);


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
