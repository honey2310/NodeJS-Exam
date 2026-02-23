import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

const RecipeExplorer = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await api.get("/recipes");
        setRecipes(res.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
    fetchRecipes();
  }, []);

  // Filter Logic
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || recipe.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={pageWrapper}>
      {/* Header Section */}
      <header style={headerStyle}>
        <h2 style={titleStyle}>Discover Seasonal Flavors</h2>
        <p style={subtitleStyle}>Handpicked recipes from our community of chefs.</p>
      </header>

      {/* Filter Bar */}
      <div style={filterBar}>
        <input
          type="text"
          placeholder="Search ingredients or dishes..."
          style={searchInput}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div style={categoryGroup}>
          {["All", "Breakfast", "Main", "Dessert", "Drinks"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                ...categoryBtn,
                backgroundColor: activeCategory === cat ? "#6b8e6b" : "transparent",
                color: activeCategory === cat ? "#fff" : "#666",
                border: activeCategory === cat ? "1px solid #6b8e6b" : "1px solid #ddd",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Recipe Grid */}
      <div style={gridStyle}>
        {filteredRecipes.map((recipe) => (
          <div key={recipe._id} style={recipeCard}>
            <div style={imageWrapper}>
              <img
                src={recipe.image || "https://via.placeholder.com/400x300?text=Delicious+Food"}
                alt={recipe.title}
                style={imageStyle}
              />
              <div style={badgeStyle}>{recipe.category || "General"}</div>
            </div>

            <div style={cardBody}>
              <h3 style={recipeTitle}>{recipe.title}</h3>
              <p style={recipeDesc}>{recipe.description.slice(0, 90)}...</p>
              
              <div style={cardFooter}>
                <div style={authorInfo}>
                  <div style={avatar}>{(recipe.author?.username || "C")[0]}</div>
                  <span>by {recipe.author?.username || "Anonymous"}</span>
                </div>
                
                <Link to={`/recipe/${recipe._id}`} style={{ textDecoration: "none" }}>
                  <button style={viewButton}>View Details</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredRecipes.length === 0 && (
        <p style={{ marginTop: "50px", color: "#999" }}>No recipes found matching your search.</p>
      )}
    </div>
  );
};

// --- "Digital Cookbook" Theme Styles ---

const pageWrapper = {
  padding: "40px 10%",
  backgroundColor: "#fdfbf9",
  minHeight: "100vh",
};

const headerStyle = {
  textAlign: "center",
  marginBottom: "40px",
};

const titleStyle = {
  fontSize: "2.5rem",
  fontFamily: "'Playfair Display', serif",
  color: "#2d3436",
  marginBottom: "10px",
};

const subtitleStyle = {
  color: "#888",
  fontSize: "1.1rem",
};

const filterBar = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
  marginBottom: "50px",
  padding: "20px",
  backgroundColor: "#fff",
  borderRadius: "20px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
};

const searchInput = {
  padding: "12px 20px",
  borderRadius: "30px",
  border: "1px solid #eee",
  width: "300px",
  outline: "none",
  backgroundColor: "#f9f9f9",
};

const categoryGroup = {
  display: "flex",
  gap: "10px",
};

const categoryBtn = {
  padding: "8px 18px",
  borderRadius: "20px",
  cursor: "pointer",
  fontSize: "0.85rem",
  fontWeight: "600",
  transition: "all 0.3s ease",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: "35px",
};

const recipeCard = {
  backgroundColor: "#fff",
  borderRadius: "24px",
  overflow: "hidden",
  boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
  transition: "transform 0.3s ease",
};

const imageWrapper = {
  position: "relative",
  height: "220px",
};

const imageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const badgeStyle = {
  position: "absolute",
  top: "15px",
  left: "15px",
  backgroundColor: "rgba(255,255,255,0.9)",
  padding: "5px 12px",
  borderRadius: "15px",
  fontSize: "0.75rem",
  fontWeight: "700",
  color: "#6b8e6b",
  textTransform: "uppercase",
};

const cardBody = {
  padding: "25px",
};

const recipeTitle = {
  margin: "0 0 10px 0",
  fontSize: "1.3rem",
  color: "#333",
};

const recipeDesc = {
  color: "#777",
  fontSize: "0.9rem",
  lineHeight: "1.5",
  marginBottom: "20px",
};

const cardFooter = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderTop: "1px solid #f5f5f5",
  paddingTop: "15px",
};

const authorInfo = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "0.85rem",
  color: "#555",
};

const avatar = {
  width: "24px",
  height: "24px",
  backgroundColor: "#d27d56",
  color: "white",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.7rem",
  fontWeight: "bold",
};

const viewButton = {
  backgroundColor: "#2d3436",
  color: "white",
  border: "none",
  padding: "8px 16px",
  borderRadius: "12px",
  cursor: "pointer",
  fontSize: "0.85rem",
  fontWeight: "600",
};

export default RecipeExplorer;