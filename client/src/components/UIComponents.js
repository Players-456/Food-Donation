// client/src/components/UIComponents.js
// ═══════════════════════════════════════════════════════
//  Global UI Components:
//  1. PageLoader     — website open hote waqt
//  2. SkeletonCard   — loading state cards
//  3. Toast          — success/error notifications
//  4. ConfirmPopup   — delete/approve se pehle
// ═══════════════════════════════════════════════════════

import { useState, useEffect, useCallback } from "react";

const TEAL = "#0d9488";
const TEAL_LIGHT = "#2dd4bf";

// ─────────────────────────────────────────────────────
// 1. PAGE LOADER
// Usage: <PageLoader /> in App.js, hide after 1.5s
// ─────────────────────────────────────────────────────
export function PageLoader({ show }) {
  const [visible, setVisible] = useState(show);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (!show) {
      setFadeOut(true);
      const t = setTimeout(() => setVisible(false), 600);
      return () => clearTimeout(t);
    } else {
      setVisible(true);
      setFadeOut(false);
    }
  }, [show]);

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes loaderSpin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes loaderPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%       { transform: scale(1.15); opacity: 0.7; }
        }
        @keyframes loaderFadeOut {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
        @keyframes loaderDot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40%            { transform: scale(1); opacity: 1; }
        }
      `}</style>
      <div style={{
        position: "fixed", inset: 0, zIndex: 99999,
        background: "linear-gradient(135deg, #020d0d 0%, #042f2e 50%, #0d9488 100%)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: "28px",
        animation: fadeOut ? "loaderFadeOut 0.6s ease forwards" : "none",
        pointerEvents: fadeOut ? "none" : "all"
      }}>
        {/* Outer ring */}
        <div style={{ position: "relative", width: "90px", height: "90px" }}>
          <div style={{
            position: "absolute", inset: 0,
            border: "3px solid rgba(13,148,136,0.15)",
            borderTop: `3px solid ${TEAL_LIGHT}`,
            borderRadius: "50%",
            animation: "loaderSpin 1s linear infinite",
            boxShadow: `0 0 20px rgba(45,212,191,0.3)`
          }}/>
          <div style={{
            position: "absolute", inset: "10px",
            border: "2px solid rgba(13,148,136,0.1)",
            borderBottom: `2px solid ${TEAL}`,
            borderRadius: "50%",
            animation: "loaderSpin 0.7s linear infinite reverse"
          }}/>
          {/* Center bowl emoji */}
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "28px",
            animation: "loaderPulse 2s ease-in-out infinite"
          }}>🍲</div>
        </div>

        {/* Brand name */}
        <div style={{ textAlign: "center" }}>
          <div style={{
            fontFamily: "Syne, sans-serif", fontWeight: "800",
            fontSize: "1.4rem", color: "white", letterSpacing: "-0.02em",
            marginBottom: "6px"
          }}>Food Donation</div>
          <div style={{ color: TEAL_LIGHT, fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Loading Platform...
          </div>
        </div>

        {/* Animated dots */}
        <div style={{ display: "flex", gap: "8px" }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: "8px", height: "8px", borderRadius: "50%",
              background: TEAL_LIGHT,
              boxShadow: `0 0 8px ${TEAL_LIGHT}`,
              animation: `loaderDot 1.2s ease-in-out ${i * 0.2}s infinite`
            }}/>
          ))}
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────
// 2. SKELETON CARD
// Usage: {loading ? <SkeletonCard /> : <ActualCard />}
// ─────────────────────────────────────────────────────
export function SkeletonCard({ lines = 3, showAvatar = false, height = "180px" }) {
  return (
    <>
      <style>{`
        @keyframes shimmerMove {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        .skeleton-line {
          background: linear-gradient(90deg,
            rgba(13,148,136,0.08) 25%,
            rgba(45,212,191,0.15) 50%,
            rgba(13,148,136,0.08) 75%
          );
          background-size: 800px 100%;
          animation: shimmerMove 1.6s infinite linear;
          border-radius: 8px;
        }
      `}</style>
      <div style={{
        background: "rgba(13,148,136,0.05)",
        border: "1px solid rgba(13,148,136,0.12)",
        borderRadius: "18px", padding: "22px",
        minHeight: height, backdropFilter: "blur(12px)"
      }}>
        {showAvatar && (
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}>
            <div className="skeleton-line" style={{ width: "44px", height: "44px", borderRadius: "50%" }}/>
            <div style={{ flex: 1 }}>
              <div className="skeleton-line" style={{ height: "14px", width: "60%", marginBottom: "8px" }}/>
              <div className="skeleton-line" style={{ height: "11px", width: "40%" }}/>
            </div>
          </div>
        )}
        {/* Title */}
        <div className="skeleton-line" style={{ height: "18px", width: "70%", marginBottom: "14px" }}/>
        {/* Lines */}
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="skeleton-line" style={{
            height: "12px",
            width: i === lines - 1 ? "55%" : "100%",
            marginBottom: "10px"
          }}/>
        ))}
        {/* Button placeholder */}
        <div className="skeleton-line" style={{ height: "36px", width: "120px", marginTop: "14px", borderRadius: "12px" }}/>
      </div>
    </>
  );
}

// Skeleton Grid — multiple cards
export function SkeletonGrid({ count = 4, cols = 4 }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(auto-fit, minmax(220px, 1fr))`,
      gap: "16px"
    }}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} lines={2} height="150px" />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────
// 3. TOAST NOTIFICATION SYSTEM
// Usage:
//   const { showToast, ToastContainer } = useToast();
//   showToast("Donation approved!", "success");
//   <ToastContainer />
// ─────────────────────────────────────────────────────
export function useToast() {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "success", duration = 3500) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type, visible: true }]);
    setTimeout(() => {
      setToasts(prev => prev.map(t => t.id === id ? { ...t, visible: false } : t));
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 400);
    }, duration);
  }, []);

  const removeToast = (id) => {
    setToasts(prev => prev.map(t => t.id === id ? { ...t, visible: false } : t));
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 400);
  };

  const ICONS = { success: "✅", error: "❌", warning: "⚠️", info: "ℹ️" };
  const COLORS = {
    success: { bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.35)", text: "#10b981" },
    error:   { bg: "rgba(239,68,68,0.12)",  border: "rgba(239,68,68,0.35)",  text: "#ef4444" },
    warning: { bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.35)", text: "#f59e0b" },
    info:    { bg: "rgba(13,148,136,0.12)", border: "rgba(13,148,136,0.35)", text: TEAL },
  };

  const ToastContainer = () => (
    <>
      <style>{`
        @keyframes toastSlideIn {
          from { opacity: 0; transform: translateX(100%) scale(0.9); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes toastSlideOut {
          from { opacity: 1; transform: translateX(0) scale(1); }
          to   { opacity: 0; transform: translateX(100%) scale(0.9); }
        }
      `}</style>
      <div style={{
        position: "fixed", top: "80px", right: "20px",
        zIndex: 99998, display: "flex", flexDirection: "column", gap: "10px",
        maxWidth: "360px", width: "calc(100% - 40px)"
      }}>
        {toasts.map(toast => {
          const c = COLORS[toast.type] || COLORS.info;
          return (
            <div key={toast.id} style={{
              background: c.bg,
              border: `1.5px solid ${c.border}`,
              borderLeft: `4px solid ${c.text}`,
              borderRadius: "14px", padding: "14px 18px",
              backdropFilter: "blur(16px)",
              boxShadow: `0 8px 32px rgba(0,0,0,0.2), 0 0 12px ${c.border}`,
              display: "flex", alignItems: "center", gap: "12px",
              animation: toast.visible
                ? "toastSlideIn 0.4s cubic-bezier(0.16,1,0.3,1) forwards"
                : "toastSlideOut 0.4s ease forwards",
              cursor: "pointer"
            }} onClick={() => removeToast(toast.id)}>
              <span style={{ fontSize: "18px", flexShrink: 0 }}>{ICONS[toast.type]}</span>
              <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--text, #e2e8f0)", flex: 1, lineHeight: "1.5" }}>
                {toast.message}
              </span>
              <span style={{ color: c.text, fontSize: "16px", opacity: 0.7, flexShrink: 0 }}>✕</span>
            </div>
          );
        })}
      </div>
    </>
  );

  return { showToast, ToastContainer };
}

// ─────────────────────────────────────────────────────
// 4. CONFIRM POPUP
// Usage:
//   const { confirm, ConfirmDialog } = useConfirm();
//   await confirm({ title, message, type }) → true/false
//   <ConfirmDialog />
// ─────────────────────────────────────────────────────
export function useConfirm() {
  const [dialog, setDialog] = useState(null);

  const confirm = useCallback(({ title = "Are you sure?", message = "", type = "danger", confirmText = "Confirm", cancelText = "Cancel" }) => {
    return new Promise((resolve) => {
      setDialog({ title, message, type, confirmText, cancelText, resolve });
    });
  }, []);

  const TYPES = {
    danger:  { color: "#ef4444", icon: "🗑️", bg: "rgba(239,68,68,0.1)",  border: "rgba(239,68,68,0.25)"  },
    success: { color: "#10b981", icon: "✅", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.25)" },
    warning: { color: "#f59e0b", icon: "⚠️", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.25)" },
    info:    { color: TEAL,      icon: "💡", bg: "rgba(13,148,136,0.1)", border: "rgba(13,148,136,0.25)" },
  };

  const ConfirmDialog = () => {
    if (!dialog) return null;
    const t = TYPES[dialog.type] || TYPES.danger;

    const handleConfirm = () => { dialog.resolve(true);  setDialog(null); };
    const handleCancel  = () => { dialog.resolve(false); setDialog(null); };

    return (
      <>
        <style>{`
          @keyframes confirmBackdrop {
            from { opacity: 0; }
            to   { opacity: 1; }
          }
          @keyframes confirmSlide {
            from { opacity: 0; transform: scale(0.85) translateY(-20px); }
            to   { opacity: 1; transform: scale(1) translateY(0); }
          }
          .confirm-btn-cancel:hover  { background: rgba(255,255,255,0.08) !important; }
          .confirm-btn-action:hover  { filter: brightness(1.1) !important; transform: translateY(-1px) !important; box-shadow: 0 8px 24px rgba(0,0,0,0.3) !important; }
        `}</style>

        {/* Backdrop + Centered Dialog Wrapper */}
        <div onClick={handleCancel} style={{
          position: "fixed", inset: 0, zIndex: 99997,
          background: "rgba(0,0,0,0.65)",
          backdropFilter: "blur(6px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "20px",
          animation: "confirmBackdrop 0.3s ease forwards"
        }}>
        {/* Dialog */}
        <div onClick={e => e.stopPropagation()} style={{
          position: "relative",
          zIndex: 99998,
          width: "min(420px, calc(100vw - 40px))",
          maxHeight: "85vh",
          overflowY: "auto",
          background: "rgba(10,22,40,0.98)",
          border: `1.5px solid ${t.border}`,
          borderRadius: "24px", padding: "32px",
          boxShadow: `0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px ${t.border}`,
          backdropFilter: "blur(20px)",
          animation: "confirmSlide 0.4s cubic-bezier(0.16,1,0.3,1) forwards"
        }}>
          {/* Icon */}
          <div style={{
            width: "60px", height: "60px", borderRadius: "18px",
            background: t.bg, border: `1.5px solid ${t.border}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "28px", marginBottom: "20px"
          }}>
            {t.icon}
          </div>

          <h3 style={{
            fontFamily: "Syne, sans-serif", fontWeight: "800",
            fontSize: "1.2rem", color: "white", margin: "0 0 10px"
          }}>{dialog.title}</h3>

          {dialog.message && (
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", lineHeight: "1.7", margin: "0 0 24px" }}>
              {dialog.message}
            </p>
          )}

          <div style={{ display: "flex", gap: "10px" }}>
            <button className="confirm-btn-cancel" onClick={handleCancel} style={{
              flex: 1, padding: "12px",
              background: "rgba(255,255,255,0.05)",
              border: "1.5px solid rgba(255,255,255,0.1)",
              borderRadius: "12px", color: "rgba(255,255,255,0.7)",
              fontFamily: "Syne, sans-serif", fontWeight: "700",
              fontSize: "14px", cursor: "pointer", transition: "all 0.2s ease"
            }}>{dialog.cancelText}</button>

            <button className="confirm-btn-action" onClick={handleConfirm} style={{
              flex: 1, padding: "12px",
              background: `linear-gradient(135deg, ${t.color}, ${t.color}cc)`,
              border: "none", borderRadius: "12px", color: "white",
              fontFamily: "Syne, sans-serif", fontWeight: "800",
              fontSize: "14px", cursor: "pointer", transition: "all 0.2s ease",
              boxShadow: `0 4px 16px ${t.color}40`
            }}>{dialog.confirmText}</button>
          </div>
        </div>
        </div>
      </>
    );
  };

  return { confirm, ConfirmDialog };
}

// ─────────────────────────────────────────────────────
// USAGE EXAMPLES (in your dashboard/page files):
// ─────────────────────────────────────────────────────
/*

// ── Page Loader in App.js ──
import { PageLoader } from "./components/UIComponents";
const [loading, setLoading] = useState(true);
useEffect(() => { setTimeout(() => setLoading(false), 1800); }, []);
<PageLoader show={loading} />

// ── Skeleton in Dashboard ──
import { SkeletonGrid } from "./components/UIComponents";
{loading ? <SkeletonGrid count={4} /> : <ActualCards />}

// ── Toast Notifications ──
import { useToast } from "./components/UIComponents";
const { showToast, ToastContainer } = useToast();
<ToastContainer />
showToast("Donation approved! ✅", "success");
showToast("Something went wrong", "error");
showToast("Please check details", "warning");

// ── Confirm Popup ──
import { useConfirm } from "./components/UIComponents";
const { confirm, ConfirmDialog } = useConfirm();
<ConfirmDialog />
const ok = await confirm({
  title: "Approve Donation?",
  message: "This will notify the donor via email.",
  type: "success",
  confirmText: "Yes, Approve",
  cancelText: "Cancel"
});
if (ok) { // proceed }

*/