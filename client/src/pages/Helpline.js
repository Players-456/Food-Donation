// client/src/pages/Helpline.js

import React from "react";

const NGO_LIST = [
  { name: "Roti Foundation",    phone: "+91 98765 43210", whatsapp: "9876543210", address: "Sector 12, Anand, Gujarat",    mapLink: "https://www.google.com/maps/search/?api=1&query=Anand+Gujarat",    timing: "Mon–Sat, 9AM–6PM",  emoji: "🏢", tag: "Food & Shelter",    color: "#0d9488" },
  { name: "Hunger Free India",  phone: "+91 91234 56789", whatsapp: "9123456789", address: "MG Road, Vadodara, Gujarat",   mapLink: "https://www.google.com/maps/search/?api=1&query=Vadodara+Gujarat", timing: "Mon–Sun, 8AM–8PM",  emoji: "🤝", tag: "24/7 Support",      color: "#3b82f6" },
  { name: "Anna Daan Samiti",   phone: "+91 87654 32109", whatsapp: "8765432109", address: "Station Road, Surat, Gujarat", mapLink: "https://www.google.com/maps/search/?api=1&query=Surat+Gujarat",    timing: "Mon–Fri, 10AM–5PM", emoji: "🌾", tag: "Community Kitchen", color: "#10b981" },
];

const STEPS = [
  { icon: "👀", title: "Spot Someone in Need",        desc: "Notice a hungry person, family, or child nearby who needs food but has no access to a phone or internet." },
  { icon: "📞", title: "Call the NGO",                desc: "Dial any NGO helpline number listed below. You can make this call on their behalf — no registration required." },
  { icon: "📍", title: "Share the Location",          desc: "Tell the NGO the exact address — street name, landmark, or neighborhood — so the volunteer can find them easily." },
  { icon: "⏳", title: "NGO Registers the Request",   desc: "The NGO logs the request into our system and assigns an available volunteer for food pickup and delivery." },
  { icon: "🍱", title: "Food Gets Delivered",         desc: "A volunteer delivers approved food donations directly to the person in need. Your one call made a real difference!" },
];

const FAQS = [
  { q: "Do I need to be registered to call the helpline?",  a: "No. Anyone — neighbor, passerby, local resident — can call on behalf of someone in need. No login or registration required." },
  { q: "What information should I provide?",                a: "Just share the location (street, landmark, area) and approximate number of people who need food. The NGO will handle the rest." },
  { q: "How quickly will food be delivered?",               a: "Depending on availability, volunteers typically respond within a few hours of the NGO approving the request." },
  { q: "What if the NGO doesn't answer?",                   a: "Try another NGO from the list below, or use the WhatsApp option to send a message. You can also try the emergency helpline." },
];

const STEP_COLORS = ["#0d9488", "#3b82f6", "#10b981", "#8b5cf6", "#f59e0b"];

function Helpline() {
  return (
    <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"40px 20px" }}>

      {/* ── HERO ── */}
      <div style={{
        background:"linear-gradient(135deg, #042f2e 0%, #0d9488 60%, #14b8a6 100%)",
        borderRadius:"28px", padding:"64px 40px",
        textAlign:"center", marginBottom:"56px",
        position:"relative", overflow:"hidden"
      }}>
        <div style={{ position:"absolute", top:"-80px", right:"-80px", width:"250px", height:"250px", background:"rgba(255,255,255,0.06)", borderRadius:"50%" }}/>
        <div style={{ position:"absolute", bottom:"-50px", left:"-50px", width:"180px", height:"180px", background:"rgba(255,255,255,0.04)", borderRadius:"50%" }}/>

        <div style={{ fontSize:"60px", marginBottom:"16px" }}>🆘</div>
        <h1 style={{ color:"white", fontFamily:"Syne, sans-serif", fontSize:"clamp(2rem,5vw,3rem)", fontWeight:"800", margin:"0 0 16px", letterSpacing:"-0.03em" }}>
          Help & Helpline Center
        </h1>
        <p style={{ color:"rgba(255,255,255,0.88)", fontSize:"clamp(14px,2vw,17px)", maxWidth:"620px", margin:"0 auto 28px", lineHeight:"1.8" }}>
          See someone who is hungry but has no phone or internet access?<br/>
          <strong>You can call on their behalf — it only takes a minute.</strong>
        </p>
        <div style={{ display:"flex", justifyContent:"center", gap:"12px", flexWrap:"wrap" }}>
          {["No Login Required", "Free of Cost", "Available Daily"].map(tag => (
            <span key={tag} style={{ padding:"8px 18px", background:"rgba(255,255,255,0.15)", borderRadius:"99px", color:"white", fontFamily:"Syne, sans-serif", fontWeight:"700", fontSize:"13px", border:"1px solid rgba(255,255,255,0.25)" }}>
              ✓ {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <div style={{ marginBottom:"56px" }}>
        <div style={{ textAlign:"center", marginBottom:"36px" }}>
          <h2 style={{ fontFamily:"Syne, sans-serif", fontSize:"1.8rem", fontWeight:"800", marginBottom:"10px", color:"#0d9488" }}>🔁 How It Works</h2>
          <p style={{ color:"#6b7280", fontSize:"15px", maxWidth:"500px", margin:"0 auto" }}>A simple 5-step process — anyone can follow it, no technical knowledge needed.</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:"16px" }}>
          {STEPS.map((step, i) => (
            <div key={i} style={{
              background: [
                "linear-gradient(135deg, rgba(13,148,136,0.14), rgba(13,148,136,0.06))",
                "linear-gradient(135deg, rgba(59,130,246,0.14), rgba(59,130,246,0.06))",
                "linear-gradient(135deg, rgba(16,185,129,0.14), rgba(16,185,129,0.06))",
                "linear-gradient(135deg, rgba(139,92,246,0.14), rgba(139,92,246,0.06))",
                "linear-gradient(135deg, rgba(245,158,11,0.14), rgba(245,158,11,0.06))"
              ][i],
              border:`1.5px solid ${STEP_COLORS[i]}45`,
              borderTop:`3px solid ${STEP_COLORS[i]}`,
              borderRadius:"18px", padding:"24px",
              textAlign:"center", position:"relative"
            }}>
              <div style={{ position:"absolute", top:"10px", right:"12px", fontFamily:"Syne, sans-serif", fontWeight:"800", fontSize:"26px", color:`${STEP_COLORS[i]}15` }}>
                {String(i+1).padStart(2,"0")}
              </div>
              <div style={{ width:"52px", height:"52px", borderRadius:"14px", background:`${STEP_COLORS[i]}15`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"26px", margin:"0 auto 14px" }}>
                {step.icon}
              </div>
              <h3 style={{ fontFamily:"Syne, sans-serif", fontSize:"13px", fontWeight:"800", marginBottom:"10px", color:STEP_COLORS[i] }}>{step.title}</h3>
              <p style={{ fontSize:"12px", color:"#6b7280", lineHeight:"1.7", margin:0 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── NGO HELPLINE CARDS ── */}
      <div style={{ marginBottom:"56px" }}>
        <div style={{ textAlign:"center", marginBottom:"36px" }}>
          <h2 style={{ fontFamily:"Syne, sans-serif", fontSize:"1.8rem", fontWeight:"800", marginBottom:"10px", color:"#0d9488" }}>🏢 NGO Helpline Numbers</h2>
          <p style={{ color:"#6b7280", fontSize:"15px" }}>Contact any of these verified NGOs — they are ready to help!</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"20px" }}>
          {NGO_LIST.map((ngo, i) => (
            <div key={i} style={{
              background: i===0
                ? "linear-gradient(135deg, rgba(13,148,136,0.14), rgba(13,148,136,0.06))"
                : i===1
                ? "linear-gradient(135deg, rgba(59,130,246,0.14), rgba(59,130,246,0.06))"
                : "linear-gradient(135deg, rgba(16,185,129,0.14), rgba(16,185,129,0.06))",
              border:`1.5px solid ${ngo.color}45`,
              borderLeft:`4px solid ${ngo.color}`,
              borderRadius:"20px", padding:"28px",
              boxShadow:`0 4px 20px rgba(0,0,0,0.15)`,
              transition:"transform 0.3s ease"
            }}>
              <div style={{ display:"flex", alignItems:"center", gap:"14px", marginBottom:"18px" }}>
                <div style={{ width:"52px", height:"52px", background:`${ngo.color}18`, borderRadius:"14px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"26px", flexShrink:0 }}>
                  {ngo.emoji}
                </div>
                <div>
                  <h3 style={{ fontFamily:"Syne, sans-serif", fontSize:"16px", fontWeight:"800", margin:"0 0 4px", color:ngo.color }}>{ngo.name}</h3>
                  <span style={{ display:"inline-block", padding:"2px 10px", background:`${ngo.color}18`, color:ngo.color, borderRadius:"99px", fontSize:"11px", fontFamily:"Syne, sans-serif", fontWeight:"700", border:`1px solid ${ngo.color}30` }}>
                    {ngo.tag}
                  </span>
                </div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:"8px", marginBottom:"18px" }}>
                {[["📍", ngo.address],["⏰", ngo.timing],["📞", ngo.phone]].map(([icon, text], j) => (
                  <div key={j} style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                    <span style={{ fontSize:"15px" }}>{icon}</span>
                    <span style={{ fontSize: j===2 ? "14px" : "13px", fontWeight: j===2 ? "700" : "400", color: j===2 ? ngo.color : "#6b7280", fontFamily: j===2 ? "Syne, sans-serif" : "inherit" }}>{text}</span>
                  </div>
                ))}
              </div>
              <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
                <a href={`tel:${ngo.phone.replace(/\s/g,"")}`} style={{ flex:1, padding:"11px 14px", background:`linear-gradient(135deg,${ngo.color},${ngo.color}cc)`, color:"white", borderRadius:"12px", textDecoration:"none", textAlign:"center", fontFamily:"Syne, sans-serif", fontWeight:"700", fontSize:"13px", boxShadow:`0 4px 12px ${ngo.color}35` }}>
                  📞 Call Now
                </a>
                <a href={`https://wa.me/${ngo.whatsapp}`} target="_blank" rel="noreferrer" style={{ flex:1, padding:"11px 14px", background:"linear-gradient(135deg,#25d366,#128c7e)", color:"white", borderRadius:"12px", textDecoration:"none", textAlign:"center", fontFamily:"Syne, sans-serif", fontWeight:"700", fontSize:"13px", boxShadow:"0 4px 12px rgba(37,211,102,0.3)" }}>
                  💬 WhatsApp
                </a>
                <a href={ngo.mapLink} target="_blank" rel="noreferrer" style={{ padding:"11px 14px", background:`${ngo.color}12`, color:ngo.color, borderRadius:"12px", textDecoration:"none", textAlign:"center", fontFamily:"Syne, sans-serif", fontWeight:"700", fontSize:"13px", border:`1px solid ${ngo.color}25` }}>
                  🗺️ Map
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── EMERGENCY BOX ── */}
      <div style={{
        background:"linear-gradient(135deg, rgba(239,68,68,0.08), rgba(239,68,68,0.04))",
        border:"2px solid rgba(239,68,68,0.2)",
        borderRadius:"24px", padding:"40px",
        textAlign:"center", marginBottom:"48px"
      }}>
        <div style={{ fontSize:"44px", marginBottom:"14px" }}>🚨</div>
        <h3 style={{ fontFamily:"Syne, sans-serif", fontSize:"1.4rem", fontWeight:"800", color:"#ef4444", marginBottom:"10px" }}>Emergency Food Helpline</h3>
        <p style={{ color:"#6b7280", fontSize:"15px", marginBottom:"22px", maxWidth:"500px", margin:"0 auto 22px", lineHeight:"1.7" }}>
          For urgent situations where someone needs immediate food assistance — call our 24/7 emergency line.
        </p>
        <a href="tel:1800-XXX-XXXX" style={{ display:"inline-block", padding:"15px 40px", background:"linear-gradient(135deg,#ef4444,#dc2626)", color:"white", borderRadius:"99px", textDecoration:"none", fontFamily:"Syne, sans-serif", fontWeight:"800", fontSize:"16px", boxShadow:"0 6px 20px rgba(239,68,68,0.35)" }}>
          📞 1800-XXX-XXXX (Toll Free)
        </a>
        <div style={{ display:"flex", justifyContent:"center", gap:"24px", marginTop:"16px", flexWrap:"wrap" }}>
          {["24/7 Available","Completely Free","No Internet Needed"].map(t => (
            <span key={t} style={{ fontSize:"13px", color:"#9ca3af", fontWeight:"600" }}>✓ {t}</span>
          ))}
        </div>
      </div>

      {/* ── FAQ ── */}
      <div style={{ marginBottom:"48px" }}>
        <div style={{ textAlign:"center", marginBottom:"32px" }}>
          <h2 style={{ fontFamily:"Syne, sans-serif", fontSize:"1.8rem", fontWeight:"800", marginBottom:"10px", color:"#0d9488" }}>❓ Frequently Asked Questions</h2>
          <p style={{ color:"#6b7280", fontSize:"15px" }}>Common questions about using the helpline</p>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:"14px" }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{
              background: [
                "linear-gradient(135deg, rgba(13,148,136,0.12), rgba(13,148,136,0.05))",
                "linear-gradient(135deg, rgba(59,130,246,0.12), rgba(59,130,246,0.05))",
                "linear-gradient(135deg, rgba(16,185,129,0.12), rgba(16,185,129,0.05))",
                "linear-gradient(135deg, rgba(139,92,246,0.12), rgba(139,92,246,0.05))"
              ][i%4],
              border:`1.5px solid ${STEP_COLORS[i%4]}40`,
              borderLeft:`4px solid ${STEP_COLORS[i%4]}`,
              borderRadius:"16px", padding:"22px 28px",
              boxShadow:"0 2px 12px rgba(0,0,0,0.04)"
            }}>
              <h4 style={{ fontFamily:"Syne, sans-serif", fontSize:"15px", fontWeight:"800", color:STEP_COLORS[i%4], marginBottom:"8px" }}>Q: {faq.q}</h4>
              <p style={{ fontSize:"14px", color:"#6b7280", lineHeight:"1.7", margin:0 }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM QUOTE ── */}
      <div style={{ background:"rgba(13,148,136,0.06)", border:"1px solid rgba(13,148,136,0.15)", borderRadius:"24px", padding:"40px", textAlign:"center" }}>
        <div style={{ fontSize:"36px", marginBottom:"14px" }}>💡</div>
        <p style={{ fontFamily:"Syne, sans-serif", fontSize:"1.15rem", fontWeight:"700", color:"#0d9488", margin:"0 0 10px" }}>Remember</p>
        <p style={{ color:"#6b7280", fontSize:"15px", lineHeight:"1.9", margin:0, maxWidth:"600px", marginInline:"auto" }}>
          A person in need may not have a phone — <strong>but you do.</strong><br/>
          One call from you can connect them to a warm meal.<br/>
          <span style={{ color:"#0d9488", fontWeight:"700" }}>Be the bridge. Be the change. 🙏</span>
        </p>
      </div>

    </div>
  );
}

export default Helpline;