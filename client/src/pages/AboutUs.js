// client/src/pages/AboutUs.js
import React from "react";

const ROLES = [
  { emoji: "🍱", title: "Donors",     desc: "List surplus food with location, quantity & photos.",       color: "#0d9488", grad: "linear-gradient(135deg, rgba(13,148,136,0.15), rgba(13,148,136,0.05))", border: "rgba(13,148,136,0.3)"  },
  { emoji: "🏢", title: "NGOs",       desc: "Verify, approve and coordinate food donations.",            color: "#3498db", grad: "linear-gradient(135deg, rgba(52,152,219,0.15), rgba(52,152,219,0.05))",  border: "rgba(52,152,219,0.3)"  },
  { emoji: "🚚", title: "Volunteers", desc: "Pick up and deliver approved food to those in need.",       color: "#16a34a", grad: "linear-gradient(135deg, rgba(22,163,74,0.15), rgba(22,163,74,0.05))",    border: "rgba(22,163,74,0.3)"   },
  { emoji: "📊", title: "Admins",     desc: "Monitor the entire pipeline and ensure smooth operations.", color: "#7c3aed", grad: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(124,58,237,0.05))",  border: "rgba(124,58,237,0.3)"  },
];

const VALUES = [
  { icon: "🔐", title: "Transparency", desc: "Every donation is traceable — from submission to delivery.",          color: "#0d9488", grad: "linear-gradient(135deg, rgba(13,148,136,0.12), rgba(13,148,136,0.04))"  },
  { icon: "⚡", title: "Efficiency",   desc: "Role-based access ensures everyone acts fast and effectively.",       color: "#f59e0b", grad: "linear-gradient(135deg, rgba(245,158,11,0.12), rgba(245,158,11,0.04))"  },
  { icon: "❤️", title: "Compassion",  desc: "No good food should go to waste while people go hungry.",             color: "#e11d48", grad: "linear-gradient(135deg, rgba(225,29,72,0.12), rgba(225,29,72,0.04))"    },
  { icon: "🌍", title: "Community",   desc: "Donors, NGOs, volunteers united on one platform.",                    color: "#0ea5e9", grad: "linear-gradient(135deg, rgba(14,165,233,0.12), rgba(14,165,233,0.04))"  },
];

function AboutUs() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 20px 60px" }}>

      {/* ── HERO ── */}
      <div style={{
        background: "linear-gradient(135deg, #0d9488 0%, #14b8a6 60%, #2dd4bf 100%)",
        borderRadius: "28px", padding: "56px 40px",
        textAlign: "center", marginBottom: "40px",
        position: "relative", overflow: "hidden"
      }}>
        <div style={{ position:"absolute", top:"-60px", right:"-60px", width:"220px", height:"220px", background:"rgba(255,255,255,0.08)", borderRadius:"50%" }}/>
        <div style={{ position:"absolute", bottom:"-40px", left:"-40px", width:"160px", height:"160px", background:"rgba(255,255,255,0.06)", borderRadius:"50%" }}/>
        <div style={{ fontSize:"56px", marginBottom:"14px" }}>🍲</div>
        <h1 style={{ color:"white", fontFamily:"Syne, sans-serif", fontSize:"clamp(1.8rem,4vw,2.6rem)", fontWeight:"800", margin:"0 0 14px", letterSpacing:"-0.03em" }}>
          About Us
        </h1>
        <p style={{ color:"rgba(255,255,255,0.92)", fontSize:"16px", maxWidth:"560px", margin:"0 auto", lineHeight:"1.8" }}>
          A social-impact platform connecting <strong>donors, NGOs & volunteers</strong> to
          ensure surplus food reaches those who need it most.
        </p>
      </div>

      {/* ── MISSION + VISION ── */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:"20px", marginBottom:"32px" }}>
        <div style={{
          background: "linear-gradient(135deg, rgba(13,148,136,0.15), rgba(13,148,136,0.05))",
          borderRadius:"20px", borderLeft:"4px solid #0d9488",
          border:"1.5px solid rgba(13,148,136,0.3)", borderLeftColor:"#0d9488",
          padding:"28px"
        }}>
          <div style={{ fontSize:"36px", marginBottom:"12px" }}>🌍</div>
          <h2 style={{ fontFamily:"Syne, sans-serif", fontWeight:"800", fontSize:"1.2rem", marginBottom:"12px", color:"#0d9488" }}>
            Our Mission
          </h2>
          <p style={{ fontSize:"14px", lineHeight:"1.9", margin:0 }}>
            No good food should go to waste while people sleep hungry. We build a
            <strong> transparent, reliable system</strong> where surplus food reaches those
            who need it most — on time, every time.
          </p>
        </div>

        <div style={{
          background: "linear-gradient(135deg, rgba(52,152,219,0.15), rgba(52,152,219,0.05))",
          borderRadius:"20px", border:"1.5px solid rgba(52,152,219,0.3)",
          borderLeft:"4px solid #3498db", borderLeftColor:"#3498db",
          padding:"28px"
        }}>
          <div style={{ fontSize:"36px", marginBottom:"12px" }}>👁️</div>
          <h2 style={{ fontFamily:"Syne, sans-serif", fontWeight:"800", fontSize:"1.2rem", marginBottom:"12px", color:"#3498db" }}>
            Our Vision
          </h2>
          <p style={{ fontSize:"14px", lineHeight:"1.9", margin:0 }}>
            A world where technology empowers communities to share resources responsibly.
            By digitizing donation workflows, we strive toward a
            <strong> hunger-free society</strong> built on trust and accountability.
          </p>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <div style={{ marginBottom:"32px" }}>
        <h2 style={{ fontFamily:"Syne, sans-serif", fontWeight:"800", fontSize:"1.3rem", textAlign:"center", marginBottom:"20px", color:"#0d9488" }}>
          🔁 How It Works
        </h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:"14px" }}>
          {ROLES.map((role, i) => (
            <div key={i} style={{
              background: role.grad,
              border:`1.5px solid ${role.border}`,
              borderLeft:`4px solid ${role.color}`,
              borderRadius:"16px",
              padding:"22px 16px",
              position:"relative"
            }}>
              <div style={{ position:"absolute", top:"10px", right:"12px", fontFamily:"Syne, sans-serif", fontWeight:"800", fontSize:"22px", color:`${role.color}30` }}>
                {String(i+1).padStart(2,"0")}
              </div>
              <div style={{ width:"48px", height:"48px", borderRadius:"12px", background:`${role.color}20`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"24px", marginBottom:"12px" }}>
                {role.emoji}
              </div>
              <h3 style={{ fontFamily:"Syne, sans-serif", fontWeight:"800", fontSize:"15px", color:role.color, marginBottom:"8px" }}>
                {role.title}
              </h3>
              <p style={{ fontSize:"12px", lineHeight:"1.7", margin:0 }}>
                {role.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Flow */}
        <div style={{ marginTop:"16px", padding:"14px 20px", background:"rgba(13,148,136,0.07)", borderRadius:"12px", textAlign:"center", border:"1px solid rgba(13,148,136,0.15)" }}>
          <p style={{ fontFamily:"Syne, sans-serif", fontWeight:"700", fontSize:"13px", color:"#0d9488", margin:0 }}>
            🍱 Donor adds food &nbsp;→&nbsp; 🏢 NGO approves &nbsp;→&nbsp; 🚚 Volunteer delivers &nbsp;→&nbsp; ❤️ Lives impacted
          </p>
        </div>
      </div>

      {/* ── CORE VALUES ── */}
      <div style={{ marginBottom:"32px" }}>
        <h2 style={{ fontFamily:"Syne, sans-serif", fontWeight:"800", fontSize:"1.3rem", textAlign:"center", marginBottom:"20px", color:"#0d9488" }}>
          💎 Core Values
        </h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:"14px" }}>
          {VALUES.map((v, i) => (
            <div key={i} style={{
              background: v.grad,
              border:`1.5px solid ${v.color}30`,
              borderLeft:`4px solid ${v.color}`,
              borderRadius:"18px",
              padding:"22px 18px"
            }}>
              <div style={{ fontSize:"30px", marginBottom:"10px" }}>{v.icon}</div>
              <h3 style={{ fontFamily:"Syne, sans-serif", fontWeight:"800", fontSize:"14px", marginBottom:"8px", color:v.color }}>
                {v.title}
              </h3>
              <p style={{ fontSize:"13px", lineHeight:"1.7", margin:0 }}>
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── WHY THIS PLATFORM ── */}
      <div style={{
        background: "linear-gradient(135deg, rgba(22,163,74,0.15), rgba(22,163,74,0.05))",
        borderRadius:"20px", border:"1.5px solid rgba(22,163,74,0.3)",
        borderLeft:"4px solid #16a34a", borderLeftColor:"#16a34a",
        padding:"28px", marginBottom:"32px"
      }}>
        <div style={{ fontSize:"32px", marginBottom:"12px" }}>💡</div>
        <h2 style={{ fontFamily:"Syne, sans-serif", fontWeight:"800", fontSize:"1.2rem", marginBottom:"12px", color:"#16a34a" }}>
          Why This Platform?
        </h2>
        <p style={{ fontSize:"14px", lineHeight:"1.9", margin:0 }}>
          Millions of tons of food are wasted every year while countless people lack access
          to daily meals. Our platform bridges this gap using{" "}
          <strong style={{ color:"#0d9488" }}>modern web technologies, role-based access control,
          real-time tracking,</strong> and automated email notifications —
          ensuring every donation is accountable and every delivery is confirmed.
        </p>
      </div>

      {/* ── QUOTE ── */}
      <div style={{
        background:"rgba(13,148,136,0.07)",
        border:"1.5px solid rgba(13,148,136,0.18)",
        borderRadius:"20px", padding:"40px", textAlign:"center"
      }}>
        <div style={{ fontSize:"44px", opacity:0.25, marginBottom:"12px", fontFamily:"Georgia,serif", lineHeight:1 }}>"</div>
        <p style={{ fontFamily:"Syne, sans-serif", fontSize:"1.1rem", fontWeight:"700", fontStyle:"italic", color:"#0d9488", maxWidth:"540px", margin:"0 auto 12px", lineHeight:"1.8" }}>
          Small acts, when multiplied by millions of people,<br />can transform the world.
        </p>
        <p style={{ fontSize:"13px", fontWeight:"600", margin:0, opacity:0.6 }}>
          — Together, we make every meal count 🙏
        </p>
      </div>

    </div>
  );
}

export default AboutUs;