// client/src/pages/Login.js
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      const role = res.data.user.role;
      if (role === "admin") navigate("/admin-dashboard");
      else if (role === "ngo") navigate("/ngo-dashboard");
      else if (role === "volunteer") navigate("/volunteer-dashboard");
      else navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
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

  return (
    <>
      <style>{`
        .login-input:focus {
          border-color: #0d9488 !important;
          box-shadow: 0 0 0 3px rgba(13,148,136,0.15) !important;
          outline: none;
        }
        .login-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(255,107,43,0.4) !important;
        }
        .login-submit:active { transform: translateY(0); }
        body.dark .login-input { background: rgba(255,255,255,0.08) !important; color: #e8e6e0 !important; }
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
          width: "100%", maxWidth: "440px",
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
            padding: "36px 40px", textAlign: "center",
            position: "relative", overflow: "hidden"
          }}>
            <div style={{ position:"absolute", top:"-40px", right:"-40px", width:"120px", height:"120px", background:"rgba(255,255,255,0.08)", borderRadius:"50%" }}/>
            <div style={{ position:"absolute", bottom:"-30px", left:"-30px", width:"90px", height:"90px", background:"rgba(255,255,255,0.06)", borderRadius:"50%" }}/>
            <div style={{ fontSize:"44px", marginBottom:"10px" }}>🍲</div>
            <h2 style={{ color:"white", fontFamily:"Syne, sans-serif", fontWeight:"800", fontSize:"1.6rem", margin:"0 0 6px" }}>
              Welcome Back!
            </h2>
            <p style={{ color:"rgba(255,255,255,0.85)", fontSize:"14px", margin:0 }}>
              Login to continue your impact
            </p>
          </div>

          {/* ── Form ── */}
          <form onSubmit={handleLogin} style={{ padding: "32px 40px" }}>

            <div style={{ marginBottom: "18px" }}>
              <label style={labelStyle}>📧 Email Address</label>
              <input
                className="login-input"
                type="email"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label style={labelStyle}>🔐 Password</label>
              <div style={{ position: "relative" }}>
                <input
                  className="login-input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ ...inputStyle, paddingRight: "70px" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute", right: "12px", top: "50%",
                    transform: "translateY(-50%)",
                    background: "transparent", border: "none",
                    cursor: "pointer", color: "#0d9488",
                    fontFamily: "Syne, sans-serif", fontWeight: "700", fontSize: "12px"
                  }}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div style={{
                padding: "12px 16px", borderRadius: "12px", marginBottom: "18px",
                background: "rgba(231,76,60,0.08)", color: "#e74c3c",
                border: "1.5px solid rgba(231,76,60,0.2)",
                fontSize: "14px", fontWeight: "600"
              }}>
                ❌ {error}
              </div>
            )}

            {/* Submit */}
            <button
              className="login-submit"
              type="submit"
              disabled={loading}
              style={{
                width: "100%", padding: "15px",
                background: loading ? "#ccc" : "linear-gradient(135deg, #0d9488, #2dd4bf)",
                color: "white", border: "none", borderRadius: "14px",
                fontFamily: "Syne, sans-serif", fontWeight: "800", fontSize: "15px",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "transform 0.2s, box-shadow 0.2s"
              }}
            >
              {loading ? "⏳ Logging in..." : "🚀 Login"}
            </button>

            {/* Divider */}
            <div style={{ display:"flex", alignItems:"center", gap:"12px", margin:"20px 0" }}>
              <div style={{ flex:1, height:"1px", background:"rgba(13,148,136,0.12)" }}/>
              <span style={{ fontSize:"12px", color:"#9ca3af", fontWeight:"600" }}>OR</span>
              <div style={{ flex:1, height:"1px", background:"rgba(13,148,136,0.12)" }}/>
            </div>

            <p style={{ textAlign:"center", fontSize:"14px", margin:0 }}>
              New here?{" "}
              <Link to="/register" style={{ color:"#0d9488", fontWeight:"700", textDecoration:"none" }}>
                Create an account →
              </Link>
            </p>

          </form>
        </div>
      </div>
    </>
  );
}

export default Login;