import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { register } = useAuth();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(form);
  };

  return (
    <div style={pageWrapper}>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <span style={{ fontSize: "3rem" }}>👩‍🍳</span>
          <h2 style={titleStyle}>Create Your Kitchen</h2>
          <p style={subtitleStyle}>Join the FlavorShare community today.</p>
        </div>

        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputGroup}>
            <label style={labelStyle}>Chef Name</label>
            <input
              type="text"
              name="username"
              placeholder="e.g. GordonR"
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>

          <div style={inputGroup}>
            <label style={labelStyle}>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="chef@flavorshare.com"
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>

          <div style={inputGroup}>
            <label style={labelStyle}>Secret Sauce (Password)</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>

          <button 
            type="submit" 
            style={buttonStyle}
            onMouseOver={(e) => e.target.style.backgroundColor = "#5a7a5a"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#6b8e6b"}
          >
            Start Cooking
          </button>
        </form>
        
        <p style={footerStyle}>
          Already have an account? <span style={{ color: "#d27d56", cursor: "pointer" }}>Sign In</span>
        </p>
      </div>
    </div>
  );
};

// --- Culinary Theme Styles ---

const pageWrapper = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: "#f9f6f2", // Soft cream/parchment
  fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
};

const cardStyle = {
  backgroundColor: "#ffffff",
  padding: "40px",
  borderRadius: "20px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
  width: "100%",
  maxWidth: "400px",
  textAlign: "center",
};

const headerStyle = {
  marginBottom: "30px",
};

const titleStyle = {
  margin: "10px 0 5px 0",
  color: "#3e3e3e",
  fontSize: "1.8rem",
  fontWeight: "600",
};

const subtitleStyle = {
  color: "#8e8e8e",
  fontSize: "0.9rem",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const inputGroup = {
  textAlign: "left",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
};

const labelStyle = {
  fontSize: "0.85rem",
  fontWeight: "600",
  color: "#555",
  marginLeft: "5px",
};

const inputStyle = {
  padding: "12px 15px",
  borderRadius: "12px",
  border: "2px solid #eee",
  fontSize: "1rem",
  outline: "none",
  transition: "border-color 0.2s",
  backgroundColor: "#fafafa",
};

const buttonStyle = {
  marginTop: "10px",
  padding: "14px",
  borderRadius: "12px",
  border: "none",
  backgroundColor: "#6b8e6b", // Muted Sage Green
  color: "white",
  fontSize: "1rem",
  fontWeight: "600",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};

const footerStyle = {
  marginTop: "25px",
  fontSize: "0.85rem",
  color: "#8e8e8e",
};

export default Register;