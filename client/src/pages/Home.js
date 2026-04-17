// client/src/pages/Home.js

import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import API from "../services/api";

// ── Animated Counter Hook ─────────────────────────────────
function useCountUp(target, duration = 1800) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const elRef = useRef(null);
  const rafRef = useRef(null);

  // IntersectionObserver — start only when visible
  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Animate when started
  useEffect(() => {
    if (!started || target === 0) return;
    setCount(0);
    const startTime = performance.now();
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [started, target, duration]);

  return { count, elRef };
}

// ── Stat Card — tinted gradient like About page ───────────
function StatCard({ icon, label, value, suffix = "", color, grad, border, delay = 0 }) {
  const { count, elRef } = useCountUp(value);
  return (
    <div ref={elRef} style={{
      background: grad,
      border: `1.5px solid ${border}`,
      borderLeft: `4px solid ${color}`,
      borderRadius: "20px",
      padding: "28px 20px",
      textAlign: "center",
      flex: "1", minWidth: "140px",
      animation: `revealCard 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s both`,
      position: "relative",
      overflow: "hidden"
    }}>
      <div style={{ fontSize: "36px", marginBottom: "10px" }}>{icon}</div>
      <div style={{
        fontFamily: "Syne, sans-serif", fontWeight: "800",
        fontSize: "2.4rem", color: color, lineHeight: 1
      }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: "13px", marginTop: "8px", fontWeight: "600", opacity: 0.7 }}>
        {label}
      </div>
    </div>
  );
}

// ── Dynamic Hero Component ───────────────────────────────
const HERO_WORDS = [
  { text: "Donors",     color: "#0d9488", emoji: "🍱", route: "/register", desc: "Add surplus food donations" },
  { text: "NGOs",       color: "#3b82f6", emoji: "🏢", route: "/register", desc: "Approve & coordinate" },
  { text: "Volunteers", color: "#10b981", emoji: "🚚", route: "/register", desc: "Deliver to those in need" },
  { text: "Everyone",   color: "#f59e0b", emoji: "🌍", route: "/register", desc: "Make a difference today" },
];

function DynamicHero({ stats, navigate, user }) {
  const [wordIdx, setWordIdx]       = useState(0);
  const [displayed, setDisplayed]   = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused]     = useState(false);
  const timerRef                    = useRef(null);

  useEffect(() => {
    const word = HERO_WORDS[wordIdx].text;

    if (isPaused) {
      timerRef.current = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 1800);
      return () => clearTimeout(timerRef.current);
    }

    if (!isDeleting && displayed === word) {
      setIsPaused(true);
      return;
    }

    if (isDeleting && displayed === "") {
      setIsDeleting(false);
      setWordIdx(prev => (prev + 1) % HERO_WORDS.length);
      return;
    }

    const speed = isDeleting ? 60 : 100;
    timerRef.current = setTimeout(() => {
      setDisplayed(prev =>
        isDeleting ? prev.slice(0, -1) : word.slice(0, prev.length + 1)
      );
    }, speed);

    return () => clearTimeout(timerRef.current);
  }, [displayed, isDeleting, isPaused, wordIdx]);

  const word = HERO_WORDS[wordIdx];

  return (
    <div style={{
      position:"relative", overflow:"hidden",
      borderRadius:"28px", minHeight:"520px",
      display:"flex", alignItems:"stretch",
      background:"linear-gradient(135deg, #020d0d 0%, #042f2e 40%, #065f52 70%, #042f2e 100%)",
      justifyContent:"flex-start",
    }}>
      {/* Background — try public folder image, fallback to gradient */}
      <div style={{
        position:"absolute", inset:0, zIndex:0,
        backgroundImage:"url('/hero-bg.jpg')",
        backgroundSize:"cover",
        backgroundPosition:"center",
        backgroundRepeat:"no-repeat",
        pointerEvents:"none"
      }}/>
      {/* Rich gradient overlay */}
      <div style={{
        position:"absolute", inset:0, zIndex:1,
        background:`
          radial-gradient(ellipse at 15% 50%, rgba(2,47,40,0.88) 0%, transparent 60%),
          linear-gradient(135deg, rgba(2,13,13,0.93) 0%, rgba(4,47,46,0.82) 40%, rgba(6,79,66,0.75) 70%, rgba(4,47,46,0.88) 100%)
        `,
        pointerEvents:"none"
      }}/>

      {/* Background decorative circles */}
      <div style={{ position:"absolute", top:"-120px", right:"-120px", width:"400px", height:"400px", borderRadius:"50%", border:"1px solid rgba(13,148,136,0.08)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", top:"-60px", right:"-60px", width:"250px", height:"250px", borderRadius:"50%", border:"1px solid rgba(13,148,136,0.12)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", bottom:"-80px", left:"-80px", width:"280px", height:"280px", borderRadius:"50%", border:"1px solid rgba(13,148,136,0.07)", pointerEvents:"none" }}/>
      {/* Grid */}
      <div style={{ position:"absolute", inset:0, zIndex:1, backgroundImage:"linear-gradient(rgba(13,148,136,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(13,148,136,0.04) 1px,transparent 1px)", backgroundSize:"60px 60px", pointerEvents:"none" }}/>
      {/* Vignette */}
      <div style={{ position:"absolute", inset:0, zIndex:1, background:"radial-gradient(ellipse at center, transparent 45%, rgba(2,13,13,0.6) 100%)", pointerEvents:"none" }}/>

      {/* ── LEFT CONTENT ── */}
      <div style={{ flex:"1.2", padding:"60px 56px", position:"relative", zIndex:2, textAlign:"left", display:"flex", flexDirection:"column", justifyContent:"center", minHeight:"520px" }}>

        {/* Live badge */}
        <div className="hero-content-anim" style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:"rgba(13,148,136,0.12)", border:"1px solid rgba(45,212,191,0.25)", borderRadius:"99px", padding:"6px 16px", marginBottom:"32px" }}>
          <span style={{ width:"7px", height:"7px", borderRadius:"50%", background:"#2dd4bf", display:"inline-block", animation:"livePulse 1.5s infinite" }}/>
          <span style={{ fontSize:"11px", color:"#2dd4bf", fontWeight:"700", letterSpacing:"0.1em", textTransform:"uppercase" }}>Live Platform · Real-time Tracking</span>
        </div>

        {/* Main heading — static */}
        <div className="hero-content-anim-2" style={{ fontFamily:"Syne, sans-serif", fontWeight:"900", fontSize:"clamp(2rem,4vw,3.4rem)", color:"white", lineHeight:"1.05", letterSpacing:"-0.04em", marginBottom:"8px" }}>
          Reducing Food Waste,
        </div>

        {/* Dynamic typewriter line */}
        <div className="hero-content-anim-3" style={{ fontFamily:"Syne, sans-serif", fontWeight:"900", fontSize:"clamp(2rem,4vw,3.4rem)", lineHeight:"1.05", letterSpacing:"-0.04em", marginBottom:"28px", display:"flex", alignItems:"center", gap:"14px", flexWrap:"wrap" }}>
          <span style={{ color:"rgba(255,255,255,0.75)" }}>Feeding</span>
          <span style={{
            color: word.color,
            display:"inline-block",
            textShadow:`0 0 30px ${word.color}50`,
            minWidth:"220px",
            transition:"color 0.3s ease"
          }}>
            {word.emoji} {displayed}
          </span>
          {/* Blinking cursor */}
          <span style={{
            width:"3px",
            height:"0.85em",
            background: word.color,
            display:"inline-block",
            animation:"cursorBlink 0.8s infinite",
            borderRadius:"2px",
            verticalAlign:"middle",
            transition:"background 0.3s ease"
          }}/>
        </div>

        <p style={{ fontSize:"15px", color:"rgba(255,255,255,0.55)", lineHeight:"1.9", marginBottom:"36px", maxWidth:"420px", textAlign:"left" }}>
          A smart digital platform connecting donors, NGOs, and volunteers
          to ensure surplus food reaches those who need it — efficiently and transparently.
        </p>

        {/* Stats row */}
        <div style={{ display:"flex", gap:"24px", marginBottom:"36px", flexWrap:"wrap", justifyContent:"flex-start" }}>
          {[
            { n: stats.total+"+",         l:"Donations",    c:"#0d9488" },
            { n: (stats.delivered*3)+"+", l:"People Helped", c:"#10b981" },
            { n: (stats.delivered*5)+"+", l:"Meals Served",  c:"#f59e0b" },
          ].map((s,i) => (
            <div key={i} style={{ textAlign:"left" }}>
              <div style={{ fontFamily:"Syne, sans-serif", fontWeight:"800", fontSize:"1.6rem", color:s.c, lineHeight:1 }}>{s.n}</div>
              <div style={{ fontSize:"11px", color:"rgba(255,255,255,0.4)", textTransform:"uppercase", letterSpacing:"0.08em", marginTop:"3px" }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display:"flex", gap:"12px", flexWrap:"wrap", justifyContent:"flex-start" }}>
          {!user && (
            <button onClick={() => navigate("/register")} style={{ background:`linear-gradient(135deg, #0d9488, #14b8a6)`, boxShadow:"0 4px 20px rgba(13,148,136,0.45)", border:"none", padding:"14px 32px", borderRadius:"14px", color:"white", fontFamily:"Syne, sans-serif", fontWeight:"800", fontSize:"15px", cursor:"pointer", transition:"all 0.25s ease" }}
              onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
              onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
              🚀 Get Started
            </button>
          )}
          {user?.role === "donor" && (
            <button onClick={() => navigate("/add-donation")} style={{ background:"linear-gradient(135deg,#0d9488,#14b8a6)", boxShadow:"0 4px 20px rgba(13,148,136,0.45)", border:"none", padding:"14px 32px", borderRadius:"14px", color:"white", fontFamily:"Syne, sans-serif", fontWeight:"800", fontSize:"15px", cursor:"pointer", transition:"all 0.25s ease" }}
              onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
              onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
              🍱 Donate Food
            </button>
          )}
          <button onClick={() => navigate("/about")} style={{ background:"rgba(255,255,255,0.07)", border:"1.5px solid rgba(255,255,255,0.2)", backdropFilter:"blur(8px)", padding:"14px 32px", borderRadius:"14px", color:"white", fontFamily:"Syne, sans-serif", fontWeight:"700", fontSize:"15px", cursor:"pointer", transition:"all 0.25s ease" }}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.12)";e.currentTarget.style.borderColor="rgba(255,255,255,0.35)"}}
            onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.07)";e.currentTarget.style.borderColor="rgba(255,255,255,0.2)"}}>
            Learn More ↗
          </button>
        </div>
      </div>

      {/* ── RIGHT: Role Cards ── */}
      <div style={{ width:"320px", flexShrink:0, padding:"40px 32px", display:"flex", flexDirection:"column", gap:"12px", zIndex:2 }}>
        {HERO_WORDS.slice(0,3).map((w, i) => (
          <div key={i} className="role-card" onClick={() => navigate(user ? (w.route === "/register" ? "/" : w.route) : "/register")} style={{
            background: wordIdx === i ? `rgba(${w.color === "#0d9488" ? "13,148,136" : w.color === "#3b82f6" ? "59,130,246" : "16,185,129"},0.15)` : "rgba(255,255,255,0.04)",
            border: `1px solid ${wordIdx === i ? w.color+"50" : "rgba(255,255,255,0.08)"}`,
            borderRadius:"14px", padding:"14px 18px",
            display:"flex", alignItems:"center", gap:"12px",
            cursor:"pointer", transition:"all 0.3s ease",
            transform: wordIdx === i ? "translateX(-4px)" : "none",
          }}>
            <div style={{ width:"40px", height:"40px", borderRadius:"10px", background: wordIdx === i ? `${w.color}25` : "rgba(255,255,255,0.06)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"20px", flexShrink:0, transition:"all 0.3s" }}>{w.emoji}</div>
            <div>
              <div style={{ fontSize:"14px", fontWeight:"700", color: wordIdx === i ? w.color : "rgba(255,255,255,0.65)", fontFamily:"Syne, sans-serif", transition:"color 0.3s" }}>{w.text}</div>
              <div style={{ fontSize:"11px", color:"rgba(255,255,255,0.3)", marginTop:"2px" }}>
                {w.text === "Donors" && "Add surplus food donations"}
                {w.text === "NGOs" && "Approve & coordinate"}
                {w.text === "Volunteers" && "Deliver to those in need"}
              </div>
            </div>
            {wordIdx === i && <div style={{ marginLeft:"auto", width:"6px", height:"6px", borderRadius:"50%", background:w.color, flexShrink:0 }}/>}
          </div>
        ))}

        {/* Live indicator */}
        <div style={{ background:"rgba(0,0,0,0.3)", border:"1px solid rgba(13,148,136,0.2)", borderRadius:"12px", padding:"12px 16px", display:"flex", alignItems:"center", gap:"10px" }}>
          <span style={{ width:"8px", height:"8px", borderRadius:"50%", background:"#10b981", display:"inline-block", flexShrink:0, animation:"livePulse 1.5s infinite" }}/>
          <span style={{ fontSize:"12px", color:"rgba(255,255,255,0.6)", fontWeight:"500" }}>
            <b style={{ color:"#10b981" }}>{stats.total}+</b> donations active right now
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Main Home ─────────────────────────────────────────────
function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, delivered: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/donations/stats");
        setStats(res.data);
      } catch {
        try {
          const res = await API.get("/donations");
          const all = res.data;
          setStats({
            total:     all.length,
            pending:   all.filter(d => d.status === "Pending").length,
            approved:  all.filter(d => d.status === "Approved").length,
            delivered: all.filter(d => d.status === "Delivered").length,
          });
        } catch {}
      }
    };
    fetchStats();
  }, []);

  const mealsDelivered = stats.delivered * 5;
  const peopleHelped  = stats.delivered * 3;
  const kgSaved       = stats.total * 2;

  return (
    <div className="home-container">

      {/* ── HERO — Dynamic Text ── */}
      <style>{`
        @keyframes cursorBlink {
          0%,100% { opacity:1; }
          50%      { opacity:0; }
        }
        @keyframes livePulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.5; transform:scale(1.5); }
        }
        @keyframes heroSlideUp {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .hero-content-anim { animation: heroSlideUp 0.7s cubic-bezier(0.16,1,0.3,1) both; }
        .hero-content-anim-2 { animation: heroSlideUp 0.7s 0.1s cubic-bezier(0.16,1,0.3,1) both; }
        .hero-content-anim-3 { animation: heroSlideUp 0.7s 0.2s cubic-bezier(0.16,1,0.3,1) both; }
        .role-card:hover { transform: translateX(-6px) !important; }
      `}</style>

      <DynamicHero stats={stats} navigate={navigate} user={user} />

            <hr />

      {/* ── IMPACT TRACKER ── */}
      <div style={{ padding: "20px 0 10px" }}>
        <h2 className="section-title" style={{ marginBottom: "6px" }}>🌍 Our Impact</h2>
        <p style={{ textAlign:"center", color:"#6b7280", fontSize:"14px", marginBottom:"28px" }}>
          Together, we're making a real difference
        </p>

        <div style={{ display:"flex", gap:"16px", flexWrap:"wrap", justifyContent:"center" }}>
          <StatCard icon="🍲" label="Meals Delivered" value={mealsDelivered} suffix="+"
            color="#0d9488"
            grad="linear-gradient(135deg, rgba(13,148,136,0.13), rgba(13,148,136,0.04))"
            border="rgba(13,148,136,0.3)" delay={0} />
          <StatCard icon="👥" label="People Helped" value={peopleHelped} suffix="+"
            color="#7c3aed"
            grad="linear-gradient(135deg, rgba(124,58,237,0.13), rgba(124,58,237,0.04))"
            border="rgba(124,58,237,0.3)" delay={0.1} />
          <StatCard icon="🌱" label="KGs Food Saved" value={kgSaved} suffix="+"
            color="#16a34a"
            grad="linear-gradient(135deg, rgba(22,163,74,0.13), rgba(22,163,74,0.04))"
            border="rgba(22,163,74,0.3)" delay={0.2} />
        </div>

        {/* Motivational Banner */}
        <div style={{
          marginTop:"28px",
          background:"linear-gradient(135deg, rgba(13,148,136,0.08), rgba(13,148,136,0.05))",
          border:"1.5px solid rgba(13,148,136,0.18)",
          borderLeft:"4px solid #0d9488",
          borderRadius:"18px", padding:"22px 32px", textAlign:"center"
        }}>
          <p style={{ fontFamily:"Syne, sans-serif", fontWeight:"700", fontSize:"15px", color:"#0d9488", margin:"0 0 6px" }}>
            Every donation counts 🙏
          </p>
          <p style={{ color:"#6b7280", fontSize:"14px", margin:0 }}>
            Each meal delivered = one less person sleeping hungry tonight
          </p>
        </div>
      </div>

      <hr />

      {/* ── HOW IT WORKS ── */}
      <h2 className="section-title">How It Works</h2>
      <div className="how-it-works">
        <div className="step"><h3>🍱 Donor</h3><p>Lists surplus food with location, quantity and photo.</p></div>
        <div className="step"><h3>🏢 NGO</h3><p>Reviews, verifies and approves the donation.</p></div>
        <div className="step"><h3>🚚 Volunteer</h3><p>Collects and delivers food to beneficiaries.</p></div>
      </div>

    </div>
  );
}

export default Home;