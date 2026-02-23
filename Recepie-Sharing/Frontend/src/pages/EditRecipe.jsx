import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
    image: ""
  });

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await api.get(`/recipes/${id}`);
        setFormData({
          ...res.data,
          ingredients: res.data.ingredients.join(", ")
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formattedIngredients = formData.ingredients
      .split(",")
      .map(item => item.trim())
      .filter(item => item !== "");

    try {
      await api.put(`/recipes/${id}`, {
        ...formData,
        ingredients: formattedIngredients
      });
      alert("Recipe Updated!");
      navigate(`/recipe/${id}`);
    } catch (err) {
      console.error(err);
      alert("Not authorized!");
    }
  };

  return (
    <div style={pageWrapper}>
      <div style={cardStyle}>
        <div style={editIndicator}>REVISION MODE</div>
        
        <header style={headerStyle}>
          <h2 style={titleStyle}>Refine Recipe</h2>
          <p style={subtitleStyle}>Adjust your ingredients and steps for perfection.</p>
        </header>

        <form onSubmit={handleUpdate} style={formStyle}>
          <div style={inputGroup}>
            <label style={labelStyle}>Recipe Name</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div style={inputGroup}>
            <label style={labelStyle}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              style={{ ...textareaStyle, height: "80px" }}
            />
          </div>

          <div style={inputGroup}>
            <label style={labelStyle}>Ingredients (comma separated)</label>
            <input
              type="text"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div style={inputGroup}>
            <label style={labelStyle}>Cooking Method</label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              required
              style={{ ...textareaStyle, height: "150px" }}
            />
          </div>

          <div style={inputGroup}>
            <label style={labelStyle}>Update Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div style={buttonRow}>
            <button 
              type="button" 
              onClick={() => navigate(-1)} 
              style={cancelBtn}
            >
              Cancel
            </button>
            <button type="submit" style={updateBtn}>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Minimalist Cafe "Revision" Styles ---

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
  boxShadow: "0 4px 25px rgba(0,0,0,0.04)",
  position: "relative",
};

const editIndicator = {
  position: "absolute",
  top: "15px",
  right: "15px",
  fontSize: "0.65rem",
  fontWeight: "bold",
  letterSpacing: "1px",
  color: "#d27d56", // Terracotta
  border: "1px solid #d27d56",
  padding: "4px 8px",
  borderRadius: "4px",
};

const headerStyle = {
  marginBottom: "30px",
};

const titleStyle = { fontSize: "1.8rem", color: "#333", margin: "0 0 5px 0" };

const subtitleStyle = { color: "#999", fontSize: "0.95rem" };

const formStyle = { display: "flex", flexDirection: "column", gap: "20px" };

const inputGroup = { display: "flex", flexDirection: "column", gap: "8px" };

const labelStyle = {
  fontSize: "0.8rem",
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
  backgroundColor: "#fcfcfc",
};

const textareaStyle = { ...inputStyle, resize: "vertical", fontFamily: "inherit" };

const buttonRow = {
  display: "flex",
  gap: "15px",
  marginTop: "15px",
};

const updateBtn = {
  flex: 2,
  padding: "15px",
  background: "#333",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "1rem",
  fontWeight: "bold",
  cursor: "pointer",
};

const cancelBtn = {
  flex: 1,
  padding: "15px",
  background: "#f5f5f5",
  color: "#666",
  border: "none",
  borderRadius: "8px",
  fontSize: "1rem",
  fontWeight: "bold",
  cursor: "pointer",
};

export default EditRecipe;