import Comment from "../models/Comment.js";
import Recipe from "../models/Recipe.js";

// Add Comment
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { recipeId } = req.params;

    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const comment = await Comment.create({
      text,
      author: req.user._id,
      recipe: recipeId
    });

    recipe.comments.push(comment._id);
    await recipe.save();

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Comment (Owner or Admin)
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (
      comment.author.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Recipe.findByIdAndUpdate(comment.recipe, {
      $pull: { comments: comment._id }
    });

    await comment.deleteOne();

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};