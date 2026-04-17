// client/src/pages/VolunteerDashboard.js
import { useEffect, useState, useCallback } from "react";
import API from "../services/api";
import { SkeletonGrid, useToast, useConfirm } from "../components/UIComponents";

function VolunteerDashboard() {
  const [allDonations, setAllDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const { showToast, ToastContainer } = useToast();
  const { confirm, ConfirmDialog } = useConfirm();

  const fetchDonations = useCallback(async () => {
    setLoading(true);
    try {
      const res = await API.get("/donations");
      setAllDonations(res.data.filter(d => d.status === "Approved"));
    } catch (err) {
      showToast("Failed to load donations", "error");
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deliverDonation = useCallback(async (id, foodName) => {
    const ok = await confirm({
      title: "Mark as Delivered?",
      message: `Confirm that "${foodName}" has been successfully delivered to the beneficiary.`,
      type: "info",
      confirmText: "🚚 Yes, Delivered!",
      cancelText: "Cancel",
    });
    if (!ok) return;
    try {
      await API.put(`/donations/deliver/${id}`);
      showToast(`"${foodName}" marked as delivered! 📧 Donor notified.`, "success");
      fetchDonations();
    } catch (err) {
      showToast("Failed to update delivery status", "error");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchDonations();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = allDonations.filter(d => {
    const matchSearch =
      d.foodName?.toLowerCase().includes(search.toLowerCase()) ||
      d.donor?.name?.toLowerCase().includes(search.toLowerCase());
    const matchLocation =
      locationFilter === "" ||
      d.location?.toLowerCase().includes(locationFilter.toLowerCase());
    return matchSearch && matchLocation;
  });

  return (
    <div className="dashboard">
      <ToastContainer />
      <ConfirmDialog />

      <h2>🚚 Volunteer Dashboard</h2>
      <p style={{ marginBottom:"20px" }}>Approved donations ready for delivery</p>

      <div style={{
        display:"flex", gap:"12px", flexWrap:"wrap", marginBottom:"24px",
        padding:"20px", background:"rgba(16,185,129,0.05)",
        borderRadius:"16px", border:"1px solid rgba(16,185,129,0.15)"
      }}>
        <input type="text" placeholder="🔍 Search by food name or donor..."
          value={search} onChange={e => setSearch(e.target.value)}
          style={{ flex:"2", minWidth:"200px", margin:0 }} />
        <input type="text" placeholder="📍 Filter by location..."
          value={locationFilter} onChange={e => setLocationFilter(e.target.value)}
          style={{ flex:"1", minWidth:"150px", margin:0 }} />
        <button onClick={() => { setSearch(""); setLocationFilter(""); }} style={{
          background:"transparent", border:"2px solid #10b981", color:"#10b981",
          padding:"10px 20px", borderRadius:"10px", fontWeight:"700", boxShadow:"none"
        }}>✕ Clear</button>
      </div>

      {!loading && (
        <p style={{ marginBottom:"16px", color:"#6b7280", fontSize:"14px" }}>
          {filtered.length === 0
            ? "No donations found"
            : `Showing ${filtered.length} of ${allDonations.length} approved donations`}
        </p>
      )}

      {loading ? <SkeletonGrid count={3} /> : filtered.length === 0 ? (
        <div style={{ textAlign:"center", padding:"60px 20px", color:"#6b7280" }}>
          <div style={{ fontSize:"48px", marginBottom:"12px" }}>📭</div>
          <p style={{ fontWeight:"600" }}>No approved donations yet!</p>
        </div>
      ) : (
        filtered.map(d => (
          <div key={d._id} className="list-item">
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:"10px" }}>
              <div>
                <b style={{ fontSize:"16px" }}>{d.foodName}</b>
                <span style={{ color:"#6b7280", marginLeft:"8px" }}>— {d.quantity}</span><br />
                <span style={{ fontSize:"13px", color:"#9ca3af" }}>👤 {d.donor?.name}</span>
                {d.location && <><br /><span style={{ fontSize:"13px", color:"#9ca3af" }}>📍 {d.location}</span></>}
                {d.expiryDate && <><br />
                  <span style={{ fontSize:"13px", color:"#f59e0b" }}>
                    ⏰ Expiry: {new Date(d.expiryDate).toLocaleDateString()}
                  </span>
                </>}
                {d.mapLink && <><br />
                  <a href={d.mapLink} target="_blank" rel="noreferrer"
                    style={{ fontSize:"13px", color:"#10b981" }}>🗺️ View on Map</a>
                </>}
              </div>
              <button onClick={() => deliverDonation(d._id, d.foodName)} style={{
                background:"linear-gradient(135deg, #3b82f6, #2563eb)",
                padding:"10px 20px", borderRadius:"10px", fontWeight:"700",
                boxShadow:"0 4px 12px rgba(59,130,246,0.4)", border:"none", color:"white", cursor:"pointer"
              }}>🚚 Mark Delivered</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default VolunteerDashboard;