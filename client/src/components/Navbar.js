// client/src/components/Navbar.js

import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

// ── Role Config ───────────────────────────────────────────
const ROLE_CONFIG = {
  donor:     { emoji: "🍱", color: "#0d9488", label: "Donor",     dashboard: "/dashboard" },
  ngo:       { emoji: "🏢", color: "#3b82f6", label: "NGO",       dashboard: "/ngo-dashboard" },
  volunteer: { emoji: "🚚", color: "#10b981", label: "Volunteer", dashboard: "/volunteer-dashboard" },
  admin:     { emoji: "📊", color: "#8b5cf6", label: "Admin",     dashboard: "/admin-dashboard" },
};

// ── Active Nav Link ───────────────────────────────────────
function NavLink({ to, children, color }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <div style={{
        fontSize: "13px",
        color: isActive ? "#fff" : color || "rgba(255,255,255,0.45)",
        padding: "6px 14px",
        borderRadius: "8px 8px 0 0",
        cursor: "pointer",
        fontWeight: isActive ? "600" : "400",
        background: isActive ? "rgba(13,148,136,0.2)" : "transparent",
        borderBottom: isActive ? "2px solid #0d9488" : "2px solid transparent",
        transition: "all 0.2s ease",
        whiteSpace: "nowrap",
      }}
        onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = "rgba(255,255,255,0.75)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}}
        onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = color || "rgba(255,255,255,0.45)"; e.currentTarget.style.background = "transparent"; }}}
      >
        {children}
      </div>
    </Link>
  );
}

// ── Navbar ────────────────────────────────────────────────
function Navbar({ theme, setTheme }) {
  const navigate = useNavigate();
  let user = null;
  try { user = JSON.parse(localStorage.getItem("user")); } catch { user = null; }

  const config = user ? (ROLE_CONFIG[user.role] || { emoji: "👤", color: "#6b7280", label: user.role, dashboard: "/" }) : null;
  const initial = user?.name?.charAt(0)?.toUpperCase() || "?";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const toggleTheme = () => {
    const t = theme === "light" ? "dark" : "light";
    setTheme(t);
    localStorage.setItem("theme", t);
  };

  return (
    <>
      <style>{`
        @keyframes navPulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.5; transform:scale(1.4); }
        }
        @keyframes navFadeIn {
          from { opacity:0; transform:translateY(-100%); }
          to   { opacity:1; transform:translateY(0); }
        }
        .nav-icon-btn {
          width: 34px; height: 34px; border-radius: 9px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          font-size: 15px; cursor: pointer;
          transition: all 0.2s ease; flex-shrink: 0;
        }
        .nav-icon-btn:hover { background: rgba(13,148,136,0.15); border-color: rgba(13,148,136,0.3); }
        .logout-nav:hover { background: rgba(239,68,68,0.1) !important; border-color: rgba(239,68,68,0.35) !important; }
      `}</style>

      <nav style={{
        display: "flex", alignItems: "center",
        height: "62px", position: "sticky", top: 0, zIndex: 1000,
        background: "#070f1e",
        borderBottom: "1px solid rgba(13,148,136,0.15)",
        backdropFilter: "blur(20px)",
        animation: "navFadeIn 0.5s ease both",
      }}>

        {/* ── LEFT: Clipped Brand Panel ── */}
        <div style={{
          background: "linear-gradient(135deg, #0a7a70, #0d9488)",
          height: "100%", display: "flex", alignItems: "center",
          padding: "0 32px 0 20px", gap: "10px",
          clipPath: "polygon(0 0, 88% 0, 100% 100%, 0 100%)",
          minWidth: "220px", flexShrink: 0, cursor: "pointer"
        }} onClick={() => navigate("/")}>
          <div style={{
            width: "36px", height: "36px", borderRadius: "10px",
            background: "rgba(255,255,255,0.18)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "20px", flexShrink: 0
          }}>🍲</div>
          <div>
            <div style={{ fontSize: "14px", fontWeight: "700", color: "#fff", fontFamily: "Syne, sans-serif", lineHeight: 1.2 }}>
              Food Donation
            </div>
            <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.65)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Smart Distribution
            </div>
          </div>
        </div>

        {/* ── CENTER: Nav Links ── */}
        <div style={{ flex: 1, display: "flex", alignItems: "flex-end", justifyContent: "center", gap: "2px", height: "100%", paddingBottom: "0" }}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/helpline" color="rgba(239,68,68,0.7)">🆘 Help</NavLink>
          {user && <NavLink to="/feedback" color="rgba(45,212,191,0.75)">💬 Feedback</NavLink>}
          {user && config && (
            <NavLink to={config.dashboard} color={`${config.color}cc`}>
              {config.emoji} Dashboard
            </NavLink>
          )}
        </div>

        {/* ── RIGHT: Actions ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "0 20px", flexShrink: 0 }}>

          {/* Theme Toggle */}
          <div className="nav-icon-btn" onClick={toggleTheme}>
            {theme === "light" ? "🌙" : "☀️"}
          </div>



          {/* Divider */}
          <div style={{ width: "1px", height: "22px", background: "rgba(255,255,255,0.08)", flexShrink: 0 }} />

          {/* User Section */}
          {user ? (
            <>
              {/* Avatar + Info */}
              <div onClick={() => navigate("/profile")} style={{
                display: "flex", alignItems: "center", gap: "9px", cursor: "pointer",
                padding: "4px 12px 4px 4px",
                borderRadius: "99px",
                background: "rgba(13,148,136,0.1)",
                border: "1px solid rgba(13,148,136,0.2)",
                transition: "all 0.2s ease",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(13,148,136,0.45)"; e.currentTarget.style.background = "rgba(13,148,136,0.15)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(13,148,136,0.2)"; e.currentTarget.style.background = "rgba(13,148,136,0.1)"; }}
              >
                {/* Avatar */}
                <div style={{ position: "relative" }}>
                  <div style={{
                    width: "32px", height: "32px", borderRadius: "50%",
                    background: `linear-gradient(135deg, #0d9488, #2dd4bf)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "13px", fontWeight: "700", color: "#fff",
                    border: "2px solid rgba(13,148,136,0.4)",
                    fontFamily: "Syne, sans-serif"
                  }}>{initial}</div>
                  {/* Live dot */}
                  <div style={{
                    position: "absolute", bottom: "-1px", right: "-1px",
                    width: "9px", height: "9px", borderRadius: "50%",
                    background: "#10b981", border: "2px solid #070f1e",
                    animation: "navPulse 2s infinite"
                  }} />
                </div>
                {/* Name + Role */}
                <div style={{ lineHeight: 1.25 }}>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.9)", fontWeight: "600", fontFamily: "Syne, sans-serif", whiteSpace: "nowrap" }}>
                    {user.name}
                  </div>
                  <div style={{ fontSize: "10px", color: "#0d9488", whiteSpace: "nowrap" }}>
                    {config?.emoji} {config?.label} · Live
                  </div>
                </div>
              </div>

              {/* Logout */}
              <button className="logout-nav" onClick={logout} style={{
                display: "flex", alignItems: "center", gap: "6px",
                fontSize: "12px", color: "rgba(239,68,68,0.8)",
                padding: "7px 14px", borderRadius: "9px",
                border: "1px solid rgba(239,68,68,0.2)",
                background: "transparent", cursor: "pointer",
                fontFamily: "Syne, sans-serif", fontWeight: "600",
                transition: "all 0.2s ease", flexShrink: 0,
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <button style={{
                  fontSize: "13px", color: "#0d9488", padding: "7px 16px",
                  borderRadius: "9px", border: "1px solid rgba(13,148,136,0.35)",
                  background: "transparent", cursor: "pointer",
                  fontFamily: "Syne, sans-serif", fontWeight: "600",
                  transition: "all 0.2s ease",
                }}>Login</button>
              </Link>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <button style={{
                  fontSize: "13px", color: "#fff", padding: "7px 16px",
                  borderRadius: "9px", border: "none",
                  background: "linear-gradient(135deg, #0d9488, #14b8a6)",
                  cursor: "pointer", fontFamily: "Syne, sans-serif", fontWeight: "700",
                  boxShadow: "0 4px 12px rgba(13,148,136,0.35)",
                  transition: "all 0.2s ease",
                }}>Register</button>
              </Link>
            </>
          )}
        </div>
      </nav>


    </>
  );
}

export default Navbar;