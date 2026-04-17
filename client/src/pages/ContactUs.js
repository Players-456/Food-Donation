// src/pages/ContactUs.js
import React, { useState } from "react";
import axios from "axios";

function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    try {
      await axios.post("http://localhost:5000/api/contact", form);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const labelStyle = {
    display: "block",
    fontFamily: "Syne, sans-serif",
    fontWeight: "700",
    fontSize: "11px",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#9ca3af",
    marginBottom: "6px",
    textAlign: "left"
  };

  const inputStyle = {
    margin: 0,
    background: "rgba(13,148,136,0.06)",
    border: "1.5px solid rgba(13,148,136,0.2)",
    borderRadius: "12px",
    color: "inherit",
  };

  return (
    <>
      <style>{`
        @keyframes contactSlideUp {
          from { opacity:0; transform:translateY(40px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .contact-input:focus {
          border-color: #0d9488 !important;
          box-shadow: 0 0 0 3px rgba(13,148,136,0.15) !important;
          outline: none !important;
          background: rgba(13,148,136,0.09) !important;
        }
        .contact-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(13,148,136,0.4) !important;
        }
        .contact-info-item:hover { color: #0d9488 !important; }
      `}</style>

      <div style={{
        minHeight: "92vh", display: "flex",
        alignItems: "center", justifyContent: "center",
        padding: "40px 20px"
      }}>
        <div style={{
          width: "100%", maxWidth: "500px",
          background: "rgba(13,148,136,0.05)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: "28px",
          border: "1px solid rgba(13,148,136,0.2)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.25), 0 0 40px rgba(13,148,136,0.08)",
          overflow: "hidden",
          animation: "contactSlideUp 0.6s cubic-bezier(0.16,1,0.3,1) both"
        }}>

          {/* ── Header ── */}
          <div style={{
            background: "linear-gradient(135deg, #042f2e 0%, #0d9488 60%, #14b8a6 100%)",
            padding: "36px 40px", textAlign: "center",
            position: "relative", overflow: "hidden"
          }}>
            <div style={{ position:"absolute", top:"-50px", right:"-50px", width:"150px", height:"150px", background:"rgba(255,255,255,0.06)", borderRadius:"50%", pointerEvents:"none" }}/>
            <div style={{ position:"absolute", bottom:"-30px", left:"-30px", width:"100px", height:"100px", background:"rgba(255,255,255,0.04)", borderRadius:"50%", pointerEvents:"none" }}/>
            <div style={{ fontSize:"44px", marginBottom:"10px" }}>📞</div>
            <h2 style={{ color:"white", fontFamily:"Syne, sans-serif", fontSize:"1.7rem", fontWeight:"800", margin:"0 0 6px", letterSpacing:"-0.02em" }}>
              Contact Us
            </h2>
            <p style={{ color:"rgba(255,255,255,0.82)", margin:0, fontSize:"14px" }}>
              Have questions or suggestions? We'd love to hear from you!
            </p>
          </div>

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} style={{ padding: "32px 40px" }}>

            {/* Status Messages */}
            {status === "success" && (
              <div style={{
                padding:"12px 16px", borderRadius:"12px", marginBottom:"20px",
                background:"rgba(16,185,129,0.1)", color:"#10b981",
                border:"1.5px solid rgba(16,185,129,0.25)", fontSize:"14px", fontWeight:"600"
              }}>✅ Message sent! We'll get back to you soon.</div>
            )}
            {status === "error" && (
              <div style={{
                padding:"12px 16px", borderRadius:"12px", marginBottom:"20px",
                background:"rgba(239,68,68,0.08)", color:"#ef4444",
                border:"1.5px solid rgba(239,68,68,0.2)", fontSize:"14px", fontWeight:"600"
              }}>❌ Failed to send. Please try again.</div>
            )}

            {/* Name */}
            <div style={{ marginBottom:"16px" }}>
              <label style={labelStyle}>👤 Your Name</label>
              <input className="contact-input" type="text" name="name"
                placeholder="Enter your name..."
                value={form.name} onChange={handleChange} required style={inputStyle} />
            </div>

            {/* Email */}
            <div style={{ marginBottom:"16px" }}>
              <label style={labelStyle}>📧 Your Email</label>
              <input className="contact-input" type="email" name="email"
                placeholder="Enter your email..."
                value={form.email} onChange={handleChange} required style={inputStyle} />
            </div>

            {/* Message */}
            <div style={{ marginBottom:"24px" }}>
              <label style={labelStyle}>💬 Message</label>
              <textarea className="contact-input" name="message"
                placeholder="Write your message..."
                rows="4" value={form.message} onChange={handleChange} required
                style={{ ...inputStyle, resize:"vertical" }} />
            </div>

            {/* Submit */}
            <button className="contact-submit" type="submit" disabled={loading} style={{
              width:"100%", padding:"15px",
              fontSize:"15px", fontWeight:"800",
              fontFamily:"Syne, sans-serif",
              borderRadius:"14px", border:"none",
              background: loading ? "#ccc" : "linear-gradient(135deg, #0d9488, #14b8a6)",
              color:"white", cursor: loading ? "not-allowed" : "pointer",
              transition:"all 0.25s ease",
              boxShadow:"0 4px 16px rgba(13,148,136,0.3)"
            }}>
              {loading ? "⏳ Sending..." : "🚀 Send Message"}
            </button>

            {/* Divider */}
            <div style={{ display:"flex", alignItems:"center", gap:"12px", margin:"20px 0" }}>
              <div style={{ flex:1, height:"1px", background:"rgba(13,148,136,0.15)" }}/>
              <span style={{ fontSize:"11px", color:"#6b7280", fontWeight:"600" }}>CONTACT INFO</span>
              <div style={{ flex:1, height:"1px", background:"rgba(13,148,136,0.15)" }}/>
            </div>

            {/* Contact Info */}
            <div style={{ display:"flex", justifyContent:"center", gap:"16px", flexWrap:"wrap" }}>
              {[
                { icon:"📧", text:"support@fooddonation.com" },
                { icon:"📍", text:"Pune, India" },
                { icon:"📞", text:"+91 98765 43210" },
              ].map((item, i) => (
                <span key={i} className="contact-info-item" style={{
                  fontSize:"12px", color:"#6b7280", fontWeight:"600",
                  display:"flex", alignItems:"center", gap:"5px",
                  transition:"color 0.2s ease", cursor:"default"
                }}>
                  {item.icon} {item.text}
                </span>
              ))}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ContactUs;