import Recipe from "../models/Recipe.js";

// CREATE Recipe
export const createRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, instructions, image } = req.body;

    const recipe = await Recipe.create({
      title,
      description,
      ingredients,
      instructions,
      image,
      author: req.user._id,
    });

    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET All Recipes (Populate Author)
export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find()
      .populate("author", "username role")
      .sort({ createdAt: -1 });

    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET Single Recipe
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate("author", "username role")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: "username role",
        },
      });

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE Recipe (Owner or Admin)
export const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Check ownership or admin
    if (
      recipe.author.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    res.json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE Recipe (Admin or Owner)
export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (
      recipe.author.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await recipe.deleteOne();

    res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET Logged-in User Recipes
export const getMyRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ author: req.user._id }).populate(
      "author",
      "username",
    );

    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
