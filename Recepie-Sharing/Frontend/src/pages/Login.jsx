import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const AuthContainer = () => {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true); // Toggle State
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      await login({ email: form.email, password: form.password });
    } else {
      await register(form);
    }
  };

  return (
    <div style={pageWrapper}>
      <div style={authCard}>
        {/* --- TOGGLE SWITCHER --- */}
        <div style={toggleContainer}>
          <div
            style={{
              ...toggleSlider,
              transform: isLogin ? "translateX(0%)" : "translateX(100%)",
            }}
          />
          <button
            onClick={() => setIsLogin(true)}
            style={{ ...toggleButton, color: isLogin ? "#fff" : "#666" }}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsLogin(false)}
            style={{ ...toggleButton, color: !isLogin ? "#fff" : "#666" }}
          >
            Sign Up
          </button>
        </div>

        {/* --- FORM CONTENT --- */}
        <div style={contentPadding}>
          <div style={headerSection}>
            <h2 style={titleStyle}>{isLogin ? "Welcome Back" : "Create Account"}</h2>
            <p style={subtitleStyle}>
              {isLogin ? "Good to see you, Chef!" : "Join our community of foodies."}
            </p>
          </div>

          <form onSubmit={handleSubmit} style={formStyle}>
            {!isLogin && (
              <div style={inputGroup}>
                <label style={labelStyle}>Chef Name</label>
                <input
                  type="text"
                  name="username"
                  placeholder="e.g. GordonR"
                  onChange={handleChange}
                  style={premiumInput}
                  required
                />
              </div>
            )}

            <div style={inputGroup}>
              <label style={labelStyle}>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="chef@flavorshare.com"
                onChange={handleChange}
                style={premiumInput}
                required
              />
            </div>

            <div style={inputGroup}>
              <label style={labelStyle}>Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                onChange={handleChange}
                style={premiumInput}
                required
              />
            </div>

            <button type="submit" style={primaryButton}>
              {isLogin ? "Start Cooking →" : "Get Your Apron →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- Styles ---

const pageWrapper = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "90vh",
  backgroundColor: "#fdfbf9",
};

const authCard = {
  width: "100%",
  maxWidth: "420px",
  backgroundColor: "#ffffff",
  borderRadius: "30px",
  boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
  padding: "10px", // Padding around the toggle
  overflow: "hidden",
};

const toggleContainer = {
  display: "flex",
  position: "relative",
  backgroundColor: "#f0f0f0",
  borderRadius: "20px",
  margin: "20px 30px 10px 30px",
  height: "50px",
  alignItems: "center",
  cursor: "pointer",
};

const toggleSlider = {
  position: "absolute",
  width: "50%",
  height: "85%",
  left: "2%",
  backgroundColor: "#6b8e6b", // Sage Green
  borderRadius: "18px",
  transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  zIndex: 1,
};

const toggleButton = {
  flex: 1,
  background: "none",
  border: "none",
  fontSize: "0.95rem",
  fontWeight: "700",
  zIndex: 2,
  cursor: "pointer",
  transition: "color 0.3s",
};

const contentPadding = {
  padding: "30px 40px 40px 40px",
};

const headerSection = {
  textAlign: "center",
  marginBottom: "25px",
};

const titleStyle = {
  fontSize: "1.6rem",
  fontWeight: "800",
  color: "#2d3436",
  margin: "0 0 5px 0",
};

const subtitleStyle = {
  fontSize: "0.9rem",
  color: "#999",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "18px",
};

const inputGroup = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
};

const labelStyle = {
  fontSize: "0.75rem",
  fontWeight: "700",
  color: "#555",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const premiumInput = {
  padding: "12px 16px",
  borderRadius: "12px",
  border: "1.5px solid #eee",
  backgroundColor: "#fafafa",
  fontSize: "1rem",
  outline: "none",
  color: "#333",
};

const primaryButton = {
  marginTop: "10px",
  padding: "16px",
  borderRadius: "15px",
  border: "none",
  backgroundColor: "#2d3436", // Bold Charcoal
  color: "#fff",
  fontSize: "1rem",
  fontWeight: "700",
  cursor: "pointer",
  boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  transition: "transform 0.2s ease",
};

export default AuthContainer;