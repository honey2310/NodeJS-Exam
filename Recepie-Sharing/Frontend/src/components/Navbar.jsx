import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav style={navWrapper}>
      <div style={navContainer}>
        {/* Logo */}
        <Link to="/" style={logoWrapper}>
          <span style={logoIcon}>🍳</span>
          <h1 style={logoText}>FlavorShare</h1>
        </Link>

        {/* Links */}
        <div style={navLinks}>
          <Link to="/receipe" style={linkItem}>Explore</Link>
          {user && (
            <>
              <Link to="/add-receipe" style={linkItem}>Add Recipe</Link>
              <Link to="/my-recipes" style={linkItem}>My Kitchen</Link>
            </>
          )}
        </div>

        {/* Auth */}
        <div style={authSection}>
          {!user ? (
            <>
              <Link to="/login" style={loginItem}>Login</Link>
              <Link to="/register" style={registerBtn}>Join</Link>
            </>
          ) : (
            <div style={userControls}>
              <span style={chefName}>Chef {user.username}</span>
              <button onClick={logout} style={logoutBtn}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

// --- Simple Minimalist Navbar Styles ---

const navWrapper = {
  backgroundColor: "#ffffff",
  borderBottom: "1px solid #eee",
  padding: "0 40px",
  position: "sticky",
  top: 0,
  zIndex: 1000,
};

const navContainer = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  maxWidth: "1100px",
  margin: "0 auto",
  height: "70px",
};

const logoWrapper = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  textDecoration: "none",
};

const logoIcon = { fontSize: "1.2rem" };

const logoText = {
  fontSize: "1.2rem",
  fontWeight: "700",
  color: "#333",
  margin: 0,
  letterSpacing: "-0.5px",
};

const navLinks = {
  display: "flex",
  gap: "30px",
};

const linkItem = {
  textDecoration: "none",
  color: "#666",
  fontSize: "0.9rem",
  fontWeight: "500",
};

const authSection = {
  display: "flex",
  alignItems: "center",
  gap: "20px",
};

const loginItem = {
  textDecoration: "none",
  color: "#666",
  fontSize: "0.9rem",
};

const registerBtn = {
  textDecoration: "none",
  color: "#6b8e6b", // Sage Green
  fontSize: "0.9rem",
  fontWeight: "bold",
  border: "1.5px solid #6b8e6b",
  padding: "6px 16px",
  borderRadius: "6px",
};

const userControls = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
};

const chefName = {
  fontSize: "0.85rem",
  color: "#999",
};

const logoutBtn = {
  background: "none",
  border: "none",
  color: "#dc3545", // Red
  fontSize: "0.85rem",
  cursor: "pointer",
  padding: 0,
};

export default Navbar;