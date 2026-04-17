// client/src/pages/AdminDashboard.js
import { useEffect, useState, useCallback } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { SkeletonGrid, useToast } from "../components/UIComponents";

const COLORS = ["#f59e0b", "#0d9488", "#3b82f6"];

function AdminDashboard() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const { showToast, ToastContainer } = useToast();

  const fetchDonations = useCallback(async () => {
    setLoading(true);
    try {
      const res = await API.get("/donations");
      setDonations(res.data);
    } catch (err) {
      showToast("Failed to load donations", "error");
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!user || user.role !== "admin") { navigate("/dashboard"); return; }
    fetchDonations();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pendingCount   = donations.filter(d => d.status === "Pending").length;
  const approvedCount  = donations.filter(d => d.status === "Approved").length;
  const deliveredCount = donations.filter(d => d.status === "Delivered").length;

  const pieData = [
    { name: "Pending",   value: pendingCount },
    { name: "Approved",  value: approvedCount },
    { name: "Delivered", value: deliveredCount },
  ];
  const barData = [
    { status: "Pending",   count: pendingCount },
    { status: "Approved",  count: approvedCount },
    { status: "Delivered", count: deliveredCount },
  ];

  const getStatusColor = (s) =>
    s === "Pending" ? "#f59e0b" : s === "Approved" ? "#0d9488" : "#3b82f6";

  return (
    <div className="dashboard">
      <ToastContainer />
      <h2>📊 Admin Analytics Dashboard</h2>
      <p>Welcome, <b>{user?.name}</b> (Admin)</p>

      {loading ? <SkeletonGrid count={4} /> : (
        <div style={{ display:"flex", gap:"16px", marginBottom:"24px", flexWrap:"wrap" }}>
          {[
            { label:"Total",     value: donations.length, color:"#0d9488", icon:"📦" },
            { label:"Pending",   value: pendingCount,     color:"#f59e0b", icon:"🟡" },
            { label:"Approved",  value: approvedCount,    color:"#10b981", icon:"🟢" },
            { label:"Delivered", value: deliveredCount,   color:"#3b82f6", icon:"🚚" },
          ].map(card => (
            <div key={card.label} className="card" style={{
              flex:"1", minWidth:"120px", textAlign:"center",
              borderTop:`3px solid ${card.color}`, padding:"16px"
            }}>
              <div style={{ fontSize:"24px" }}>{card.icon}</div>
              <div style={{ fontFamily:"Syne, sans-serif", fontWeight:"800", fontSize:"1.8rem", color:card.color, lineHeight:1 }}>
                {card.value}
              </div>
              <div style={{ fontSize:"12px", color:"#6b7280", marginTop:"4px", fontWeight:"600" }}>{card.label}</div>
            </div>
          ))}
        </div>
      )}

      <hr />
      <h3 style={{ marginTop:"20px" }}>📈 Donation Analytics</h3>

      {loading ? <SkeletonGrid count={2} /> : donations.length === 0 ? (
        <p style={{ color:"#6b7280", textAlign:"center", padding:"40px" }}>No donation data yet.</p>
      ) : (
        <div style={{ display:"flex", justifyContent:"space-around", flexWrap:"wrap", gap:"20px" }}>
          <div>
            <h4 style={{ textAlign:"center", marginBottom:"12px" }}>Donation Distribution</h4>
            <PieChart width={300} height={280}>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90}
                label={({ name, value }) => value > 0 ? `${name}: ${value}` : ""}
                isAnimationActive animationDuration={600}>
                {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip /><Legend />
            </PieChart>
          </div>
          <div>
            <h4 style={{ textAlign:"center", marginBottom:"12px" }}>Status Comparison</h4>
            <BarChart width={320} height={280} data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" /><YAxis allowDecimals={false} />
              <Tooltip /><Legend />
              <Bar dataKey="count" isAnimationActive animationDuration={600}>
                {barData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Bar>
            </BarChart>
          </div>
        </div>
      )}

      <hr />
      <h3 style={{ marginTop:"20px" }}>📋 All Donations</h3>

      {loading ? <SkeletonGrid count={3} /> : donations.length === 0 ? (
        <p>No donations found.</p>
      ) : (
        donations.map(d => (
          <div key={d._id} className="list-item">
            <b>{d.foodName}</b> — {d.quantity}<br />
            👤 Donor: {d.donor?.name || "N/A"}<br />
            📌 Status: <b style={{ color: getStatusColor(d.status) }}>{d.status}</b><br />
            {d.location && <span>📍 {d.location}</span>}
          </div>
        ))
      )}
    </div>
  );
}

export default AdminDashboard;