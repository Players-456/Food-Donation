// client/src/pages/Feedback.js

import { useState } from "react";
import API from "../services/api";

const RATINGS = [
  { value: 5, stars: "★★★★★", label: "Excellent" },
  { value: 4, stars: "★★★★☆", label: "Good" },
  { value: 3, stars: "★★★☆☆", label: "Average" },
  { value: 2, stars: "★★☆☆☆", label: "Poor" },
  { value: 1, stars: "★☆☆☆☆", label: "Terrible" },
];

const labelStyle = {
  display: "block",
  fontFamily: "Syne, sans-serif",
  fontWeight: "700",
  fontSize: "11px",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#9ca3af",
  marginBottom: "10px"
};

function Feedback() {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/feedback/add", { rating, comment });
      setSubmitted(true);
      setComment("");
      setRating(5);
    } catch (error) {
      alert("Failed to submit feedback");
    } finally {
      setLoading(false);
    }
  };

  const selectedRating = RATINGS.find(r => r.value === Number(rating));

  // ✅ Success screen
  if (submitted) {
    return (
      <div style={{
        minHeight: "92vh", display: "flex",
        alignItems: "center", justifyContent: "center", padding: "40px 20px"
      }}>
        <div style={{
          textAlign: "center", maxWidth: "400px",
          animation: "revealCard 0.6s cubic-bezier(0.16,1,0.3,1) both"
        }}>
          <div style={{ fontSize: "72px", marginBottom: "20px" }}>🎉</div>
          <h2 style={{
            fontFamily: "Syne, sans-serif", fontWeight: "800",
            fontSize: "1.6rem", marginBottom: "12px"
          }}>
            Thank You!
          </h2>
          <p style={{ color: "#6b7280", fontSize: "15px", lineHeight: "1.8", marginBottom: "28px" }}>
            Your feedback helps us improve the platform and serve the community better.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            style={{
              padding: "13px 32px",
              background: "linear-gradient(135deg, #0d9488, #2dd4bf)",
              color: "white", border: "none", borderRadius: "12px",
              fontFamily: "Syne, sans-serif", fontWeight: "700",
              fontSize: "14px", cursor: "pointer"
            }}
          >
            ✍️ Submit Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "92vh", display: "flex",
      alignItems: "center", justifyContent: "center", padding: "40px 20px"
    }}>
      <div style={{
        width: "100%", maxWidth: "500px",
        background: "rgba(13,148,136,0.06)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        borderRadius: "28px",
        border: "1px solid var(--border, rgba(0,0,0,0.08))",
        boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
        overflow: "hidden",
        animation: "revealCard 0.6s cubic-bezier(0.16,1,0.3,1) both"
      }}>

        {/* ── Header ── */}
        <div style={{
          background: "linear-gradient(135deg, #0d9488, #2dd4bf)",
          padding: "32px 40px", textAlign: "center"
        }}>
          <div style={{ fontSize: "44px", marginBottom: "8px" }}>💬</div>
          <h2 style={{
            color: "white", fontFamily: "Syne, sans-serif",
            fontSize: "1.6rem", fontWeight: "800", margin: "0 0 6px"
          }}>
            Give Feedback
          </h2>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "14px", margin: 0 }}>
            Help us improve by sharing your experience
          </p>
        </div>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit} style={{ padding: "32px 40px" }}>

          {/* Star Rating — clickable cards */}
          <div style={{ marginBottom: "24px" }}>
            <label style={labelStyle}>⭐ Rating</label>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {RATINGS.map((r) => (
                <div
                  key={r.value}
                  onClick={() => setRating(r.value)}
                  style={{
                    display: "flex", alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    border: `2px solid ${Number(rating) === r.value ? "#0d9488" : "rgba(13,148,136,0.15)"}`,
                    background: Number(rating) === r.value ? "rgba(13,148,136,0.08)" : "transparent",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                >
                  <span style={{
                    color: "#f59e0b", fontSize: "18px", letterSpacing: "2px"
                  }}>
                    {r.stars}
                  </span>
                  <span style={{
                    fontFamily: "Syne, sans-serif", fontWeight: "700",
                    fontSize: "13px",
                    color: Number(rating) === r.value ? "#0d9488" : "#9ca3af"
                  }}>
                    {r.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div style={{ marginBottom: "24px" }}>
            <label style={labelStyle}>✍️ Your Comment</label>
            <textarea
              placeholder="Write your feedback here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              rows={4}
              style={{
                margin: 0, resize: "vertical",
                border: "2px solid rgba(13,148,136,0.25)",
                borderRadius: "12px", padding: "13px 16px",
                fontSize: "15px", width: "100%", boxSizing: "border-box"
              }}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%", padding: "15px", fontSize: "15px",
              fontWeight: "800", borderRadius: "14px",
              background: loading ? "#ccc" : "linear-gradient(135deg, #0d9488, #2dd4bf)",
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "⏳ Submitting..." : `🚀 Submit — ${selectedRating?.stars}`}
          </button>

        </form>
      </div>
    </div>
  );
}

export default Feedback;