import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  // Get logged in user from localStorage
  const loggedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await api.get("/recipes");
        setRecipes(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipes();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this recipe?")) return;

    try {
      await api.delete(`/recipes/${id}`);
      setRecipes((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      alert("Not authorized or error deleting recipe.");
    }
  };

  return (
    <div style={pageWrapper}>
      <header style={header}>
        <h2 style={title}>Kitchen Notes</h2>
        <p style={subtitle}>Simple recipes for everyday cooking.</p>
      </header>

      <div style={listContainer}>
        {recipes.map((recipe) => {
          const isOwner = loggedUser && recipe.author?._id === loggedUser._id;

          return (
            <div key={recipe._id} style={simpleCard}>
              {/* Image */}
              <div style={imageContainer}>
                <img
                  src={
                    recipe.image ||
                    "https://via.placeholder.com/300x300?text=Food"
                  }
                  alt={recipe.title}
                  style={imgStyle}
                />
              </div>

              {/* Info */}
              <div style={infoContainer}>
                <div style={topRow}>
                  <h3 style={recipeTitle}>{recipe.title}</h3>

                  {isOwner && (
                    <div style={actionButtons}>
                      <button
                        onClick={() => navigate(`/edit-recipe/${recipe._id}`)}
                        style={textBtn}
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(recipe._id)}
                        style={deleteTextBtn}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>

                <p style={authorLine}>by Chef {recipe.author?.username}</p>

                <p style={descText}>{recipe.description}</p>

                <div style={detailsArea}>
                  <strong style={label}>Ingredients:</strong>
                  <span style={inlineList}>
                    {recipe.ingredients?.join(", ") || "Fresh ingredients"}
                  </span>
                </div>

                <div style={cardFooter}>
                  <Link to={`/recipe/${recipe._id}`} style={linkBtn}>
                    View Full Recipe →
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- Simple Minimalist Styles ---

const pageWrapper = {
  padding: "40px 10%",
  backgroundColor: "#f9f9f9",
  minHeight: "100vh",
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
};

const header = {
  marginBottom: "40px",
  borderBottom: "1px solid #ddd",
  paddingBottom: "20px",
};

const title = { fontSize: "2rem", color: "#333", margin: 0 };

const subtitle = { color: "#777", margin: "5px 0 0 0" };

const listContainer = { display: "flex", flexDirection: "column", gap: "25px" };

const simpleCard = {
  display: "flex",
  backgroundColor: "#fff",
  borderRadius: "12px",
  overflow: "hidden",
  border: "1px solid #eee",
  transition: "box-shadow 0.2s",
};

const imageContainer = { width: "220px", minWidth: "220px" };

const imgStyle = { width: "100%", height: "100%", objectFit: "cover" };

const infoContainer = {
  padding: "25px",
  flex: 1,
  display: "flex",
  flexDirection: "column",
};

const topRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const recipeTitle = { fontSize: "1.4rem", margin: 0, color: "#222" };

const authorLine = {
  fontSize: "0.85rem",
  color: "#999",
  margin: "5px 0 15px 0",
};

const descText = {
  fontSize: "0.95rem",
  color: "#555",
  lineHeight: "1.5",
  margin: "0 0 15px 0",
};

const detailsArea = {
  fontSize: "0.9rem",
  color: "#444",
  backgroundColor: "#fcfcfc",
  padding: "10px",
  borderRadius: "6px",
};

const label = { marginRight: "8px", color: "#6b8e6b" };

const inlineList = { color: "#666" };

const cardFooter = { marginTop: "20px" };

const linkBtn = {
  textDecoration: "none",
  color: "#6b8e6b",
  fontWeight: "bold",
  fontSize: "0.9rem",
};

const actionButtons = { display: "flex", gap: "10px" };

const textBtn = {
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "#007bff",
  fontSize: "0.8rem",
  padding: 0,
};

const deleteTextBtn = {
  ...textBtn,
  color: "#dc3545",
};

export default RecipeList;
