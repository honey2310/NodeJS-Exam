import { useState } from "react";

const RecipeForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    ingredients: initialData.ingredients
      ? initialData.ingredients.join(", ")
      : "",
    instructions: initialData.instructions || "",
    image: initialData.image || ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      ingredients: formData.ingredients.split(",").map(item => item.trim())
    };

    onSubmit(formattedData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Recipe Title"
        value={formData.title}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      <textarea
        name="description"
        placeholder="Short Description"
        value={formData.description}
        onChange={handleChange}
        required
        style={textareaStyle}
      />

      <input
        type="text"
        name="ingredients"
        placeholder="Ingredients (comma separated)"
        value={formData.ingredients}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      <textarea
        name="instructions"
        placeholder="Cooking Instructions"
        value={formData.instructions}
        onChange={handleChange}
        required
        style={textareaStyle}
      />

      <input
        type="text"
        name="image"
        placeholder="Image URL (optional)"
        value={formData.image}
        onChange={handleChange}
        style={inputStyle}
      />

      <button type="submit" style={buttonStyle}>
        Save Recipe
      </button>
    </form>
  );
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "6px",
  border: "1px solid #ccc"
};

const textareaStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  height: "100px"
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  background: "#8B4513",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

export default RecipeForm;