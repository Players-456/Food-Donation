// client/src/pages/AddDonation.js

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const inputStyle = {
  margin: 0,
  color: "#1a1a2e",
  background: "#f5f0e8",
};

const labelStyle = {
  display: "block",
  fontFamily: "Syne, sans-serif",
  fontWeight: "700",
  fontSize: "12px",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#6b7280",
  marginBottom: "8px"
};

function AddDonation() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    foodName: "",
    quantity: "",
    expiryDate: "",
    location: ""
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    if (!user) { navigate("/"); return; }
    if (user.role !== "donor") navigate("/dashboard");
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (file) => {
    if (!file) return;
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleFileInput = (e) => handleFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("donor", user.id);
    data.append("foodName", form.foodName);
    data.append("quantity", form.quantity);
    data.append("expiryDate", form.expiryDate);
    data.append("location", form.location);
    if (image) data.append("locationImage", image);

    try {
      await API.post("/donations/add", data);
      navigate("/dashboard");
    } catch (err) {
      alert("Error adding donation");
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div style={{
      minHeight: "92vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "560px",
        background: "var(--bg-card, #fff)",
        borderRadius: "28px",
        border: "1px solid var(--border, rgba(0,0,0,0.08))",
        boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
        overflow: "hidden",
        animation: "revealCard 0.6s cubic-bezier(0.16,1,0.3,1) both"
      }}>

        {/* ── Header ── */}
        <div style={{
          background: "linear-gradient(135deg, #ff6b2b, #ffb347)",
          padding: "32px 40px",
          textAlign: "center"
        }}>
          <div style={{ fontSize: "48px", marginBottom: "8px" }}>🍱</div>
          <h2 style={{
            color: "white",
            fontFamily: "Syne, sans-serif",
            fontSize: "1.6rem",
            fontWeight: "800",
            margin: 0,
            letterSpacing: "-0.02em"
          }}>
            Add Donation
          </h2>
          <p style={{ color: "rgba(255,255,255,0.85)", margin: "6px 0 0", fontSize: "14px" }}>
            Help reduce food waste & feed those in need
          </p>
        </div>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit} style={{ padding: "36px 40px" }}>

          {/* Food Name */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>🍽️ Food Name</label>
            <input
              name="foodName"
              placeholder="e.g. Rice & Dal, Pizza, Biryani..."
              value={form.foodName}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          {/* Quantity */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>📦 Quantity</label>
            <input
              name="quantity"
              placeholder="e.g. 5 kg, 20 plates, 10 boxes..."
              value={form.quantity}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          {/* Expiry Date */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>⏰ Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              min={today}
              value={form.expiryDate}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          {/* Location */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>📍 Location</label>
            <input
              name="location"
              placeholder="e.g. Sector 12, Anand, Gujarat..."
              value={form.location}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          {/* Image Upload — Drag & Drop */}
          <div style={{ marginBottom: "28px" }}>
            <label style={labelStyle}>📸 Location Photo</label>

            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById("fileInput").click()}
              style={{
                border: `2px dashed ${dragOver ? "#ff6b2b" : "rgba(255,107,43,0.3)"}`,
                borderRadius: "16px",
                padding: "28px",
                textAlign: "center",
                cursor: "pointer",
                background: dragOver ? "rgba(255,107,43,0.08)" : "rgba(255,107,43,0.02)",
                transition: "all 0.3s ease",
              }}
            >
              {imagePreview ? (
                <div>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      width: "100%",
                      maxHeight: "180px",
                      objectFit: "cover",
                      borderRadius: "12px",
                      marginBottom: "10px"
                    }}
                  />
                  <p style={{ fontSize: "13px", color: "#ff6b2b", fontWeight: "600" }}>
                    ✅ {image?.name} — Click to change
                  </p>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: "36px", marginBottom: "10px" }}>📷</div>
                  <p style={{ fontFamily: "Syne, sans-serif", fontWeight: "700", fontSize: "14px", color: "#4b5563", margin: 0 }}>
                    Drag & drop or click to upload
                  </p>
                  <p style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>
                    PNG, JPG supported
                  </p>
                </div>
              )}
            </div>

            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              style={{ display: "none" }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "16px",
              fontSize: "16px",
              fontWeight: "800",
              borderRadius: "14px",
              background: loading ? "#ccc" : "linear-gradient(135deg, #ff6b2b, #ffb347)",
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "⏳ Submitting..." : "🚀 Submit Donation"}
          </button>

          {/* Cancel */}
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            style={{
              width: "100%",
              marginTop: "12px",
              padding: "14px",
              background: "transparent",
              border: "2px solid rgba(255,107,43,0.3)",
              color: "#ff6b2b",
              borderRadius: "14px",
              fontWeight: "700",
              boxShadow: "none"
            }}
          >
            Cancel
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddDonation;