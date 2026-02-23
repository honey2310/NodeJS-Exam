import express from "express";
import { addComment, deleteComment } from "../controllers/commentController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Add comment to recipe
router.post("/:recipeId", protect, addComment);

// Delete comment
router.delete("/:commentId", protect, deleteComment);

export default router;