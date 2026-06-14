import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav>
      <Link to={user?.role === "admin" ? "/admin" : "/trainee"} style={{ display: "flex", alignItems: "center" }}>
        <h2>
          <span style={{ fontSize: "24px" }}>🎯</span> Task Allotment System
        </h2>
      </Link>
      
      {user && (
        <div className="nav-user">
          {user.role === "admin" && (
            <div style={{ display: "flex", gap: "16px", marginRight: "16px" }}>
              <Link to="/admin" style={{ fontWeight: 600, color: "var(--text-main)" }}>Dashboard</Link>
              <Link to="/approvals" style={{ fontWeight: 600, color: "var(--text-muted)", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "var(--text-main)"} onMouseLeave={(e) => e.target.style.color = "var(--text-muted)"}>Approvals</Link>
            </div>
          )}
          <span className="user-tag">
            👤 {user.name} ({user.role})
          </span>
          <button className="logout-btn" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;