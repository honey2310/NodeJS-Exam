import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await api.get(`/recipes/${id}`);
        setRecipe(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/recipes/${id}/comment`, { text: comment });
      setComment("");
      alert("Comment added!");
      // Optionally refresh the recipe to show new comments
    } catch (err) {
      console.error(err);
      alert("Login required!");
    }
  };

  if (!recipe) return <div style={loadingStyle}>Loading Manuscript...</div>;

  return (
    <div style={pageWrapper}>
      <article style={articleCard}>
        {/* Header Section */}
        <header style={headerSection}>
          <h1 style={titleStyle}>{recipe.title}</h1>
          <div style={metaRow}>
            <span style={authorTag}>By Chef {recipe.author?.username}</span>
            <span style={dateTag}>• 5 min read</span>
          </div>
        </header>

        {/* Hero Image */}
        <img
          src={
            recipe.image ||
            "https://via.placeholder.com/800x450?text=Recipe+Visual"
          }
          alt={recipe.title}
          style={heroImage}
        />

        {/* Description Section */}
        <section style={section}>
          <p style={descriptionText}>{recipe.description}</p>
        </section>

        {/* Ingredients & Instructions Grid */}
        <div style={detailsGrid}>
          <section style={column}>
            <h3 style={sectionLabel}>Ingredients</h3>
            <ul style={listStyle}>
              {recipe.ingredients?.map((item, index) => (
                <li key={index} style={listItem}>
                  <span style={bullet}>•</span> {item}
                </li>
              ))}
            </ul>
          </section>

          <section style={column}>
            <h3 style={sectionLabel}>Instructions</h3>
            <p style={instructionText}>{recipe.instructions}</p>
          </section>
        </div>

        <hr style={divider} />

        {/* Simple Comment Section */}
        <section style={commentSection}>
          <h3 style={commentTitle}>Discussion</h3>
          <form onSubmit={handleCommentSubmit} style={formStyle}>
            <textarea
              placeholder="Share your thoughts on this dish..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              style={textareaStyle}
            />
            <button type="submit" style={submitBtn}>
              Post Comment
            </button>
          </form>
        </section>
      </article>

      <div style={backRow}>
        <button onClick={() => navigate(-1)} style={backBtn}>
          ← Back to Collection
        </button>
      </div>
    </div>
  );
};

// --- Simple Minimalist Detail Styles ---

const pageWrapper = {
  backgroundColor: "#f9f9f9",
  minHeight: "100vh",
  padding: "40px 20px",
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
};

const articleCard = {
  maxWidth: "800px",
  margin: "0 auto",
  backgroundColor: "#fff",
  padding: "50px",
  borderRadius: "16px",
  border: "1px solid #eee",
  boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
};

const headerSection = { textAlign: "center", marginBottom: "30px" };

const titleStyle = {
  fontSize: "2.5rem",
  color: "#222",
  margin: "0 0 10px 0",
  letterSpacing: "-1px",
};

const metaRow = { fontSize: "0.9rem", color: "#999" };

const authorTag = { fontWeight: "bold", color: "#6b8e6b" };

const heroImage = {
  width: "100%",
  height: "400px",
  objectFit: "cover",
  borderRadius: "12px",
  marginBottom: "40px",
};

const section = { marginBottom: "30px" };

const descriptionText = {
  fontSize: "1.1rem",
  lineHeight: "1.7",
  color: "#444",
  margin: 0,
};

const detailsGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "40px",
  marginTop: "40px",
};

const sectionLabel = {
  fontSize: "0.85rem",
  textTransform: "uppercase",
  letterSpacing: "1px",
  color: "#888",
  marginBottom: "20px",
  borderBottom: "1px solid #eee",
  paddingBottom: "8px",
};

const listStyle = { listStyle: "none", padding: 0, margin: 0 };

const listItem = { marginBottom: "10px", fontSize: "1rem", color: "#555" };

const bullet = { color: "#6b8e6b", marginRight: "8px" };

const instructionText = {
  fontSize: "1rem",
  lineHeight: "1.6",
  color: "#555",
  whiteSpace: "pre-wrap",
};

const divider = {
  border: "none",
  borderTop: "1px solid #eee",
  margin: "40px 0",
};

const commentSection = { maxWidth: "600px" };

const commentTitle = {
  fontSize: "1.2rem",
  color: "#333",
  marginBottom: "15px",
};

const textareaStyle = {
  width: "100%",
  height: "100px",
  padding: "15px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  backgroundColor: "#fafafa",
  fontSize: "0.95rem",
  outline: "none",
  fontFamily: "inherit",
};

const submitBtn = {
  marginTop: "12px",
  padding: "10px 20px",
  background: "#333",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  cursor: "pointer",
};

const backRow = { textAlign: "center", marginTop: "30px" };

const backBtn = {
  background: "none",
  border: "none",
  color: "#999",
  cursor: "pointer",
  fontSize: "0.9rem",
};

const dateTag = {
  marginLeft: "5px",
  color: "#bbb", // A lighter gray than the author name
};

const column = {
  display: "flex",
  flexDirection: "column",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px", // Creates consistent space between the box and the button
  width: "100%",
};

const loadingStyle = {
  textAlign: "center",
  paddingTop: "100px",
  color: "#666",
};

export default RecipeDetails;
