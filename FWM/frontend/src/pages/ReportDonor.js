import { useState } from "react";
import API from "../api";
import { useLocation, useNavigate } from "react-router-dom";

export default function ReportDonor() {
  const [reason, setReason] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const donorId = location.state?.donorId;
  const donationId = location.state?.donationId;

  const submitReport = async () => {
    try {
      // DEBUG (optional)
      console.log("STATE:", location.state);
      console.log("DONOR:", donorId);
      console.log("DONATION:", donationId);

      // VALIDATION
      if (!donorId || !donationId) {
        alert("Invalid report access. Go from Donations page.");
        return;
      }

      if (!reason.trim()) {
        alert("Please write a reason");
        return;
      }

      await API.post("/reports/report", {
        reported_donor_id: donorId,
        reported_by: user.id,
        donation_id: donationId,
        reason: reason,
      });

      alert("Report submitted successfully");

      setReason("");

      // optional redirect
      navigate("/donations");

    } catch (err) {
      console.log("Report Error:", err);
      alert("Failed to submit report");
    }
  };

  // ❌ SAFE GUARD (IMPORTANT)
  if (!donorId || !donationId) {
    return (
      <div style={styles.errorBox}>
        <h2>Invalid Report Access</h2>
        <p>Please go to Donations page and click Report button first.</p>

        <button
          onClick={() => navigate("/donations")}
          style={styles.backBtn}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Report Donor</h2>

        <p style={styles.subtitle}>
          Write the reason for reporting this donor
        </p>

        <textarea
          placeholder="Write reason..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          style={styles.textarea}
        />

        <button onClick={submitReport} style={styles.button}>
          Submit Report
        </button>
      </div>
    </div>
  );
}

/* =========================
   INLINE CSS
========================= */
const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #e8f5e9, #c8e6c9)",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "500px",
    background: "#fff",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.15)",
  },

  title: {
    textAlign: "center",
    color: "#2e7d32",
    marginBottom: "10px",
  },

  subtitle: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#666",
  },

  textarea: {
    width: "100%",
    height: "120px",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    resize: "none",
  },

  button: {
    width: "100%",
    marginTop: "15px",
    padding: "12px",
    background: "#e53935",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  errorBox: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "red",
    textAlign: "center",
  },

  backBtn: {
    marginTop: "15px",
    padding: "10px 20px",
    background: "#2e7d32",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};