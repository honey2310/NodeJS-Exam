import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const AddRecipe = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedIngredients = formData.ingredients
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");

    try {
      await api.post("/recipes", {
        ...formData,
        ingredients: formattedIngredients,
      });

      alert("Recipe Added Successfully!");
      navigate("/receipe");
    } catch (err) {
      console.error(err);
      alert("Login Required!");
    }
  };

  return (
    <div style={pageWrapper}>
      <div style={cardStyle}>
        <header style={headerStyle}>
          <h2 style={titleStyle}>Draft a Recipe</h2>
          <p style={subtitleStyle}>Record your culinary secrets.</p>
        </header>

        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputGroup}>
            <label style={labelStyle}>Dish Name</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Summer Basil Pesto"
              value={formData.title}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div style={inputGroup}>
            <label style={labelStyle}>Brief Description</label>
            <textarea
              name="description"
              placeholder="What makes this dish special?"
              value={formData.description}
              onChange={handleChange}
              required
              style={{ ...textareaStyle, height: "80px" }}
            />
          </div>

          <div style={inputGroup}>
            <label style={labelStyle}>Ingredients</label>
            <input
              type="text"
              name="ingredients"
              placeholder="Flour, eggs, milk (comma separated)"
              value={formData.ingredients}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div style={inputGroup}>
            <label style={labelStyle}>Cooking Steps</label>
            <textarea
              name="instructions"
              placeholder="1. Boil water... 2. Add salt..."
              value={formData.instructions}
              onChange={handleChange}
              required
              style={{ ...textareaStyle, height: "150px" }}
            />
          </div>

          <div style={inputGroup}>
            <label style={labelStyle}>Image Link</label>
            <input
              type="text"
              name="image"
              placeholder="https://..."
              value={formData.image}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <button type="submit" style={buttonStyle}>
            Save to Collection
          </button>
        </form>
      </div>
    </div>
  );
};

// --- Simple Minimalist Form Styles ---

const pageWrapper = {
  backgroundColor: "#f9f9f9",
  minHeight: "100vh",
  padding: "60px 20px",
  display: "flex",
  justifyContent: "center",
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
};

const cardStyle = {
  width: "100%",
  maxWidth: "550px",
  background: "#ffffff",
  padding: "40px",
  borderRadius: "16px",
  border: "1px solid #eee",
  boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
};

const headerStyle = {
  textAlign: "center",
  marginBottom: "35px",
};

const titleStyle = {
  fontSize: "1.8rem",
  color: "#333",
  margin: "0 0 5px 0",
};

const subtitleStyle = {
  color: "#999",
  fontSize: "0.95rem",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const inputGroup = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const labelStyle = {
  fontSize: "0.85rem",
  fontWeight: "bold",
  color: "#6b8e6b", // Sage Green
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const inputStyle = {
  width: "100%",
  padding: "12px 15px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "1rem",
  outline: "none",
  backgroundColor: "#fafafa",
  transition: "border-color 0.2s",
};

const textareaStyle = {
  ...inputStyle,
  resize: "vertical",
  fontFamily: "inherit",
};

const buttonStyle = {
  marginTop: "10px",
  padding: "15px",
  background: "#333", // Minimal Black/Charcoal
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "1rem",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "background 0.2s",
};

export default AddRecipe;