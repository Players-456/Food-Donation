// client/src/pages/DonorDashboard.js
import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { SkeletonGrid, useToast } from "../components/UIComponents";

function DonorDashboard() {
  const [allDonations, setAllDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const { showToast, ToastContainer } = useToast();

  const getTimeline = (status) => {
    if (status === "Pending")   return "🟡 Pending → ⚪ Approved → ⚪ Delivered";
    if (status === "Approved")  return "✅ Pending → 🟡 Approved → ⚪ Delivered";
    if (status === "Delivered") return "✅ Pending → ✅ Approved → 🚚 Delivered";
    return "";
  };

  const fetchDonations = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token || !user) return;
    setLoading(true);
    try {
      const res = await API.get("/donations");
      const myDonations = res.data.filter(d => d.donor?._id === user.id);
      setAllDonations(myDonations);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      } else {
        showToast("Failed to load donations", "error");
      }
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    fetchDonations();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const filtered = allDonations.filter(d => {
    const matchSearch =
      d.foodName?.toLowerCase().includes(search.toLowerCase()) ||
      d.location?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "" || d.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const getStatusColor = (s) =>
    s === "Pending" ? "#f59e0b" : s === "Approved" ? "#0d9488" : "#3b82f6";

  return (
    <div className="dashboard">
      <ToastContainer />

      <h2>🍱 Donor Dashboard</h2>
      <p>Welcome, <b>{user?.name}</b>!</p>

      <Link to="/add-donation">
        <button style={{ marginBottom:"24px", marginTop:"12px" }}>+ Add Donation</button>
      </Link>

      <h3 style={{ marginBottom:"16px" }}>My Donations</h3>

      <div style={{
        display:"flex", gap:"12px", flexWrap:"wrap", marginBottom:"24px",
        padding:"20px", background:"rgba(13,148,136,0.05)",
        borderRadius:"16px", border:"1px solid rgba(13,148,136,0.12)"
      }}>
        <input type="text" placeholder="🔍 Search by food name or location..."
          value={search} onChange={e => setSearch(e.target.value)}
          style={{ flex:"2", minWidth:"200px", margin:0 }} />
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          style={{ flex:"1", minWidth:"150px", margin:0 }}>
          <option value="">All Status</option>
          <option value="Pending">🟡 Pending</option>
          <option value="Approved">🟢 Approved</option>
          <option value="Delivered">🚚 Delivered</option>
        </select>
        <button onClick={() => { setSearch(""); setStatusFilter(""); }} style={{
          background:"transparent", border:"2px solid #0d9488", color:"#0d9488",
          padding:"10px 20px", borderRadius:"10px", fontWeight:"700", boxShadow:"none"
        }}>✕ Clear</button>
      </div>

      {!loading && (
        <p style={{ marginBottom:"16px", color:"#6b7280", fontSize:"14px" }}>
          {filtered.length === 0
            ? "No donations found"
            : `Showing ${filtered.length} of ${allDonations.length} donations`}
        </p>
      )}

      {loading ? <SkeletonGrid count={3} /> : (
        <ul style={{ listStyle:"none", padding:0 }}>
          {filtered.map(d => (
            <li key={d._id} className="list-item">
              <b style={{ fontSize:"16px" }}>{d.foodName}</b>
              <span style={{ color:"#6b7280", marginLeft:"8px" }}>— {d.quantity}</span><br />
              <span style={{ fontSize:"13px", color:"#9ca3af" }}>
                📌 Status: <b style={{ color: getStatusColor(d.status) }}>{d.status}</b>
              </span>
              <p style={{ marginTop:"6px", fontSize:"13px", color:"#9ca3af" }}>
                {getTimeline(d.status)}
              </p>
              {d.locationImage && (
                <div style={{ marginTop:"10px" }}>
                  <img src={`http://localhost:5000/uploads/${d.locationImage}`}
                    alt="Location" width="220" style={{ borderRadius:"10px" }} />
                </div>
              )}
              {d.mapLink && (
                <p style={{ marginTop:"6px" }}>
                  <a href={d.mapLink} target="_blank" rel="noreferrer"
                    style={{ fontSize:"13px", color:"#0d9488" }}>
                    📍 Open in Google Maps
                  </a>
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DonorDashboard;