// client/src/pages/Register.js
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

const ROLES = [
  { value: "donor",     label: "Donor",     emoji: "🍱", desc: "Donate surplus food",      color: "#0d9488" },
  { value: "ngo",       label: "NGO",       emoji: "🏢", desc: "Approve & coordinate",     color: "#3498db" },
  { value: "volunteer", label: "Volunteer", emoji: "🚚", desc: "Deliver food to people",   color: "#16a34a" },
];

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [role, setRole] = useState("donor");
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "password") checkStrength(value);
  };

  const checkStrength = (pwd) => {
    if (pwd.length < 6) setStrength("Weak");
    else if (pwd.match(/[A-Z]/) && pwd.match(/[0-9]/) && pwd.length >= 8) setStrength("Strong");
    else setStrength("Medium");
  };

  const strengthColor = { Weak: "#ef4444", Medium: "#f59e0b", Strong: "#10b981" };
  const strengthWidth = { Weak: "30%", Medium: "65%", Strong: "100%" };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await API.post("/auth/register", { ...formData, role });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    margin: 0,
    border: "2px solid rgba(13,148,136,0.2)",
    borderRadius: "12px",
    padding: "13px 16px",
    fontSize: "15px",
    width: "100%",
    boxSizing: "border-box",
    transition: "border-color 0.25s, box-shadow 0.25s",
    background: "#f9f5f0",
    color: "#1a1a2e",
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

  const selectedRole = ROLES.find(r => r.value === role);

  return (
    <>
      <style>{`
        .reg-input:focus {
          border-color: #0d9488 !important;
          box-shadow: 0 0 0 3px rgba(13,148,136,0.15) !important;
          outline: none;
        }
        .reg-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(255,107,43,0.4) !important;
        }
        .reg-submit:active { transform: translateY(0); }
        body.dark .reg-input, body.dark .login-input { background: rgba(255,255,255,0.08) !important; color: #e8e6e0 !important; }
        .role-btn:hover { transform: translateY(-2px); }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{
        minHeight: "92vh", display: "flex",
        alignItems: "center", justifyContent: "center", padding: "40px 20px"
      }}>
        <div style={{
          width: "100%", maxWidth: "480px",
          background: "rgba(13,148,136,0.06)",
          borderRadius: "28px",
          border: "1px solid rgba(13,148,136,0.2)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.3), 0 0 40px rgba(13,148,136,0.15)",
          overflow: "hidden",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          animation: "slideUp 0.6s cubic-bezier(0.16,1,0.3,1) both"
        }}>

          {/* ── Header ── */}
          <div style={{
            background: "linear-gradient(135deg, #0d9488, #2dd4bf)",
            padding: "32px 40px", textAlign: "center",
            position: "relative", overflow: "hidden"
          }}>
            <div style={{ position:"absolute", top:"-40px", right:"-40px", width:"120px", height:"120px", background:"rgba(255,255,255,0.08)", borderRadius:"50%" }}/>
            <div style={{ position:"absolute", bottom:"-30px", left:"-30px", width:"90px", height:"90px", background:"rgba(255,255,255,0.06)", borderRadius:"50%" }}/>
            <div style={{ fontSize:"44px", marginBottom:"10px" }}>🌟</div>
            <h2 style={{ color:"white", fontFamily:"Syne, sans-serif", fontWeight:"800", fontSize:"1.6rem", margin:"0 0 6px" }}>
              Create Account
            </h2>
            <p style={{ color:"rgba(255,255,255,0.85)", fontSize:"14px", margin:0 }}>
              Join the food donation community
            </p>
          </div>

          {/* ── Form ── */}
          <form onSubmit={handleRegister} style={{ padding: "32px 40px" }}>

            {/* Name */}
            <div style={{ marginBottom: "16px" }}>
              <label style={labelStyle}>👤 Full Name</label>
              <input className="reg-input" type="text" name="name"
                placeholder="Enter your full name..."
                value={formData.name} onChange={handleChange} required style={inputStyle} />
            </div>

            {/* Email */}
            <div style={{ marginBottom: "16px" }}>
              <label style={labelStyle}>📧 Email Address</label>
              <input className="reg-input" type="email" name="email"
                placeholder="Enter your email..."
                value={formData.email} onChange={handleChange} required style={inputStyle} />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "8px" }}>
              <label style={labelStyle}>🔐 Password</label>
              <div style={{ position: "relative" }}>
                <input className="reg-input"
                  type={showPassword ? "text" : "password"} name="password"
                  placeholder="Min 6 characters..."
                  value={formData.password} onChange={handleChange} required
                  style={{ ...inputStyle, paddingRight: "70px" }} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{
                  position:"absolute", right:"12px", top:"50%", transform:"translateY(-50%)",
                  background:"transparent", border:"none", cursor:"pointer",
                  color:"#0d9488", fontFamily:"Syne, sans-serif", fontWeight:"700", fontSize:"12px"
                }}>
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Password Strength */}
            {formData.password && (
              <div style={{ marginBottom: "16px" }}>
                <div style={{ height:"5px", borderRadius:"99px", background:"rgba(0,0,0,0.08)", overflow:"hidden", marginBottom:"4px" }}>
                  <div style={{
                    height:"100%", borderRadius:"99px",
                    background: strengthColor[strength],
                    width: strengthWidth[strength],
                    transition: "width 0.4s ease"
                  }}/>
                </div>
                <small style={{ color: strengthColor[strength], fontWeight:"700", fontSize:"11px" }}>
                  {strength} Password
                </small>
              </div>
            )}

            {/* Role Selection */}
            <div style={{ marginBottom: "22px" }}>
              <label style={labelStyle}>🎭 I am a...</label>
              <div style={{ display:"flex", gap:"10px" }}>
                {ROLES.map((r) => (
                  <div key={r.value} className="role-btn"
                    onClick={() => setRole(r.value)}
                    style={{
                      flex: 1, textAlign:"center", padding:"12px 8px",
                      borderRadius:"14px", cursor:"pointer",
                      border: `2px solid ${role === r.value ? r.color : "rgba(13,148,136,0.15)"}`,
                      background: role === r.value
                        ? `linear-gradient(135deg, ${r.color}18, ${r.color}08)`
                        : "transparent",
                      transition: "all 0.2s ease"
                    }}>
                    <div style={{ fontSize:"22px", marginBottom:"4px" }}>{r.emoji}</div>
                    <div style={{ fontFamily:"Syne, sans-serif", fontWeight:"800", fontSize:"12px", color: role === r.value ? r.color : "#6b7280" }}>
                      {r.label}
                    </div>
                    <div style={{ fontSize:"10px", color:"#9ca3af", marginTop:"2px" }}>{r.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div style={{
                padding:"12px 16px", borderRadius:"12px", marginBottom:"16px",
                background:"rgba(231,76,60,0.08)", color:"#e74c3c",
                border:"1.5px solid rgba(231,76,60,0.2)",
                fontSize:"14px", fontWeight:"600"
              }}>
                ❌ {error}
              </div>
            )}

            {/* Submit */}
            <button className="reg-submit" type="submit" disabled={loading} style={{
              width:"100%", padding:"15px",
              background: loading ? "#ccc" : `linear-gradient(135deg, ${selectedRole?.color || "#0d9488"}, #2dd4bf)`,
              color:"white", border:"none", borderRadius:"14px",
              fontFamily:"Syne, sans-serif", fontWeight:"800", fontSize:"15px",
              cursor: loading ? "not-allowed" : "pointer",
              transition:"transform 0.2s, box-shadow 0.2s"
            }}>
              {loading ? "⏳ Creating Account..." : `✅ Register as ${selectedRole?.label}`}
            </button>

            {/* Divider */}
            <div style={{ display:"flex", alignItems:"center", gap:"12px", margin:"20px 0" }}>
              <div style={{ flex:1, height:"1px", background:"rgba(13,148,136,0.12)" }}/>
              <span style={{ fontSize:"12px", color:"#9ca3af", fontWeight:"600" }}>OR</span>
              <div style={{ flex:1, height:"1px", background:"rgba(13,148,136,0.12)" }}/>
            </div>

            <p style={{ textAlign:"center", fontSize:"14px", margin:0 }}>
              Already have account?{" "}
              <Link to="/login" style={{ color:"#0d9488", fontWeight:"700", textDecoration:"none" }}>
                Login →
              </Link>
            </p>

          </form>
        </div>
      </div>
    </>
  );
}

export default Register;