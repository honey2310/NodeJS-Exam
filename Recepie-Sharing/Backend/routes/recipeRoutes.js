import express from "express";
import {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  getMyRecipes
} from "../controllers/recipeController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getAllRecipes);
router.get("/:id", getRecipeById);

// Protected Routes
router.post("/", protect, createRecipe);
router.put("/:id", protect, updateRecipe);
router.delete("/:id", protect, deleteRecipe);
router.get("/user/my-recipes", protect, getMyRecipes);
router.get("/:id", getRecipeById);

export default router;