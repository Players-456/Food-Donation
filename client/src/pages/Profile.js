// client/src/pages/Profile.js

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const ROLE_CONFIG = {
  donor:     { emoji: "🍱", color: "#0d9488", label: "Donor" },
  ngo:       { emoji: "🏢", color: "#3498db", label: "NGO" },
  volunteer: { emoji: "🚚", color: "#2ecc71", label: "Volunteer" },
  admin:     { emoji: "📊", color: "#9b59b6", label: "Admin" },
};

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (!stored) { navigate("/login"); return; }
    setUser(stored);
    setName(stored.name);
    // ✅ Trigger entrance animation
    setTimeout(() => setVisible(true), 50);
  }, [navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    if (newPassword && newPassword !== confirmPassword) {
      setMessage({ text: "New passwords do not match!", type: "error" });
      return;
    }

    setLoading(true);
    try {
      const payload = { name };
      if (newPassword) {
        payload.currentPassword = currentPassword;
        payload.newPassword = newPassword;
      }

      const res = await API.put("/auth/profile", payload);
      const updatedUser = { ...user, name: res.data.user.name };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      setMessage({ text: "✅ Profile updated successfully!", type: "success" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || "❌ Failed to update profile",
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  const config = ROLE_CONFIG[user.role] || { emoji: "👤", color: "#0d9488", label: user.role };
  const initial = user.name?.charAt(0)?.toUpperCase() || "?";

  // ✅ Shared input style — clearly visible border
  const inputStyle = {
    margin: 0,
    border: "2px solid rgba(13,148,136,0.25)",
    borderRadius: "12px",
    padding: "13px 16px",
    fontSize: "15px",
    width: "100%",
    boxSizing: "border-box",
    outline: "none",
    transition: "border-color 0.25s ease, box-shadow 0.25s ease",
    background: "var(--bg-input, rgba(255,255,255,0.05))",
  };

  const labelStyle = {
    display: "block",
    fontFamily: "Syne, sans-serif",
    fontWeight: "700",
    fontSize: "11px",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#9ca3af",
    marginBottom: "7px"
  };

  const fieldStyle = { marginBottom: "18px" };

  return (
    <>
      {/* ── Keyframe styles ── */}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes avatarPop {
          0%   { transform: scale(0.5); opacity: 0; }
          70%  { transform: scale(1.1); }
          100% { transform: scale(1);   opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .profile-input:focus {
          border-color: ${config.color} !important;
          box-shadow: 0 0 0 3px ${config.color}22 !important;
        }
        .profile-input:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          background: rgba(107,114,128,0.08) !important;
        }
        .save-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px ${config.color}44 !important;
        }
        .save-btn:active:not(:disabled) {
          transform: translateY(0);
        }
        .back-btn:hover {
          background: rgba(13,148,136,0.06) !important;
        }
      `}</style>

      <div style={{
        minHeight: "92vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px"
      }}>
        <div style={{
          width: "100%",
          maxWidth: "500px",
          background: "rgba(13,148,136,0.06)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          borderRadius: "28px",
          border: "1px solid var(--border, rgba(0,0,0,0.08))",
          boxShadow: "0 24px 64px rgba(0,0,0,0.12)",
          overflow: "hidden",
          // ✅ Slide up animation on mount
          animation: visible ? "slideUp 0.6s cubic-bezier(0.16,1,0.3,1) both" : "none",
          opacity: visible ? 1 : 0
        }}>

          {/* ── Header ── */}
          <div style={{
            background: `linear-gradient(135deg, ${config.color}, ${config.color}bb)`,
            padding: "36px 40px",
            textAlign: "center"
          }}>
            {/* ✅ Avatar with pop animation */}
            <div style={{
              width: "76px", height: "76px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 14px",
              fontFamily: "Syne, sans-serif",
              fontWeight: "800",
              fontSize: "2rem",
              color: "white",
              border: "3px solid rgba(255,255,255,0.5)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              animation: "avatarPop 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.2s both"
            }}>
              {initial}
            </div>

            <h2 style={{
              color: "white",
              fontFamily: "Syne, sans-serif",
              fontSize: "1.4rem",
              fontWeight: "800",
              margin: "0 0 8px",
              animation: "fadeIn 0.5s ease 0.3s both"
            }}>
              {user.name}
            </h2>
            <span style={{
              display: "inline-block",
              padding: "5px 16px",
              background: "rgba(255,255,255,0.22)",
              backdropFilter: "blur(8px)",
              borderRadius: "99px",
              color: "white",
              fontSize: "12px",
              fontFamily: "Syne, sans-serif",
              fontWeight: "700",
              border: "1px solid rgba(255,255,255,0.3)",
              animation: "fadeIn 0.5s ease 0.4s both"
            }}>
              {config.emoji} {config.label}
            </span>
          </div>

          {/* ── Form ── */}
          <form onSubmit={handleUpdate} style={{ padding: "32px 40px" }}>

            {/* Email — read only */}
            <div style={fieldStyle}>
              <label style={labelStyle}>📧 Email</label>
              <input
                className="profile-input"
                type="email"
                value={user.email}
                disabled
                style={{ ...inputStyle, border: "2px solid rgba(107,114,128,0.2)" }}
              />
              <p style={{ fontSize: "11px", color: "#9ca3af", marginTop: "5px" }}>
                Email cannot be changed
              </p>
            </div>

            {/* Name */}
            <div style={fieldStyle}>
              <label style={labelStyle}>👤 Display Name</label>
              <input
                className="profile-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            <hr style={{
              border: "none",
              borderTop: `1px solid ${config.color}22`,
              margin: "24px 0 20px"
            }} />

            <p style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: "700",
              fontSize: "12px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#6b7280",
              marginBottom: "18px"
            }}>
              🔐 Change Password (optional)
            </p>

            {/* Current Password */}
            <div style={fieldStyle}>
              <label style={labelStyle}>Current Password</label>
              <input
                className="profile-input"
                type="password"
                placeholder="Enter current password..."
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* New Password */}
            <div style={fieldStyle}>
              <label style={labelStyle}>New Password</label>
              <input
                className="profile-input"
                type="password"
                placeholder="Min 6 characters..."
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Confirm Password */}
            <div style={{ marginBottom: "24px" }}>
              <label style={labelStyle}>Confirm New Password</label>
              <input
                className="profile-input"
                type="password"
                placeholder="Repeat new password..."
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Status Message */}
            {message.text && (
              <div style={{
                padding: "13px 16px",
                borderRadius: "12px",
                marginBottom: "20px",
                fontSize: "14px",
                fontWeight: "600",
                background: message.type === "success"
                  ? "rgba(46,204,113,0.1)"
                  : "rgba(231,76,60,0.1)",
                color: message.type === "success" ? "#27ae60" : "#e74c3c",
                border: `1.5px solid ${message.type === "success"
                  ? "rgba(46,204,113,0.25)"
                  : "rgba(231,76,60,0.25)"}`,
                animation: "fadeIn 0.3s ease both"
              }}>
                {message.text}
              </div>
            )}

            {/* Save Button */}
            <button
              className="save-btn"
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "15px",
                fontSize: "15px",
                fontWeight: "800",
                borderRadius: "14px",
                background: loading
                  ? "#ccc"
                  : `linear-gradient(135deg, ${config.color}, ${config.color}bb)`,
                cursor: loading ? "not-allowed" : "pointer",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                border: "none",
                color: "white"
              }}
            >
              {loading ? "⏳ Saving..." : "💾 Save Changes"}
            </button>

            {/* Back Button */}
            <button
              className="back-btn"
              type="button"
              onClick={() => navigate(-1)}
              style={{
                width: "100%",
                marginTop: "12px",
                padding: "13px",
                background: "transparent",
                border: `2px solid ${config.color}33`,
                color: config.color,
                borderRadius: "14px",
                fontWeight: "700",
                boxShadow: "none",
                cursor: "pointer",
                transition: "background 0.2s ease",
                fontSize: "14px"
              }}
            >
              ← Go Back
            </button>

          </form>
        </div>
      </div>
    </>
  );
}

export default Profile;