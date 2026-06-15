import { useEffect, useState } from "react";
import API from "../api";
import AdminNavbar from "../components/AdminNavbar";

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
    fetchReports();
  }, []);

  /* ================= FOOD REQUESTS ================= */
  const fetchRequests = async () => {
    try {
      const res = await API.get("/admin/food-requests");
      setRequests(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/admin/food-requests/${id}`, { status });
      fetchRequests();
    } catch (err) {
      console.log(err);
    }
  };

  const updateCollectionType = async (id, type) => {
    try {
      await API.put(`/admin/food-requests/${id}`, {
        delivery_type: type,
      });
      fetchRequests();
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= REPORTS ================= */
  const fetchReports = async () => {
    try {
      const res = await API.get("/reports/fake-reports");
      setReports(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateReport = async (id, status) => {
    try {
      await API.put(`/reports/fake-reports/${id}`, { status });
      fetchReports();
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= UI BADGES ================= */
  const badge = (type) => ({
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    background:
      type === "accepted"
        ? "#dcfce7"
        : type === "rejected"
        ? "#fee2e2"
        : type === "completed"
        ? "#dbeafe"
        : "#f3f4f6",
  });

  const btn = (color) => ({
    padding: "6px 10px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "12px",
    background: color,
    color: "white",
  });

  const card = {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    marginBottom: "20px",
  };

  const table = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const th = {
    textAlign: "left",
    padding: "10px",
    background: "#f4f6f8",
    fontSize: "13px",
  };

  const td = {
    padding: "10px",
    borderBottom: "1px solid #eee",
    fontSize: "13px",
  };

  const actionRow = {
    display: "flex",
    gap: "6px",
    flexWrap: "wrap",
  };

  return (
    <div style={{ background: "#f4f6f8", minHeight: "100vh" }}>
      <AdminNavbar />

      <div style={{ padding: "25px", maxWidth: "1200px", margin: "auto" }}>
        <h1 style={{ marginBottom: "20px" }}>Admin Dashboard</h1>

        {/* ================= FOOD REQUESTS ================= */}
        <div style={card}>
          <h2>🍱 Food Requests</h2>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={table}>
                <thead>
                  <tr>
                    <th style={th}>ID</th>
                    <th style={th}>Donation</th>
                    <th style={th}>Receiver</th>
                    <th style={th}>Type</th>
                    <th style={th}>Status</th>
                    <th style={th}>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {requests.map((r) => (
                    <tr key={r.request_id}>
                      <td style={td}>{r.request_id}</td>
                      <td style={td}>{r.donation_id}</td>
                      <td style={td}>{r.receiver_id}</td>

                      <td style={td}>
                        {r.delivery_type ? (
                          r.delivery_type
                        ) : (
                          <div style={actionRow}>
                            <button
                              style={btn("#3b82f6")}
                              onClick={() =>
                                updateCollectionType(r.request_id, "pickup")
                              }
                            >
                              Pickup
                            </button>

                            <button
                              style={btn("#6366f1")}
                              onClick={() =>
                                updateCollectionType(r.request_id, "delivery")
                              }
                            >
                              Delivery
                            </button>
                          </div>
                        )}
                      </td>

                      <td style={td}>
                        <span style={badge(r.status)}>
                          {r.status}
                        </span>
                      </td>

                      <td style={td}>
                        <div style={actionRow}>
                          <button
                            style={btn("#22c55e")}
                            onClick={() =>
                              updateStatus(r.request_id, "accepted")
                            }
                          >
                            Accept
                          </button>

                          <button
                            style={btn("#ef4444")}
                            onClick={() =>
                              updateStatus(r.request_id, "rejected")
                            }
                          >
                            Reject
                          </button>

                          <button
                            style={btn("#0ea5e9")}
                            onClick={() =>
                              updateStatus(r.request_id, "completed")
                            }
                          >
                            Done
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ================= REPORTS ================= */}
        <div style={card}>
          <h2>🚨 Fake Reports</h2>

          <div style={{ overflowX: "auto" }}>
            <table style={table}>
              <thead>
                <tr>
                  <th style={th}>ID</th>
                  <th style={th}>Donor</th>
                  <th style={th}>Reason</th>
                  <th style={th}>Status</th>
                  <th style={th}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {reports.map((r) => (
                  <tr key={r.report_id}>
                    <td style={td}>{r.report_id}</td>
                    <td style={td}>{r.reported_donor_id}</td>
                    <td style={td}>{r.reason}</td>

                    <td style={td}>
                      <span style={badge(r.status)}>
                        {r.status}
                      </span>
                    </td>

                    <td style={td}>
                      <div style={actionRow}>
                        <button
                          style={btn("#f59e0b")}
                          onClick={() =>
                            updateReport(r.report_id, "reviewed")
                          }
                        >
                          Review
                        </button>

                        <button
                          style={btn("#22c55e")}
                          onClick={() =>
                            updateReport(r.report_id, "action_taken")
                          }
                        >
                          Action
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}