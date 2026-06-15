import { useState } from "react";
import API from "../api";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddRating() {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  const donationId = location.state?.donationId;
  const donorId = location.state?.donorId;

  const submitRating = async () => {
    console.log("🔥 BUTTON CLICKED");

    if (loading) return;

    if (!donationId || !donorId) {
      alert("Invalid access. Please go from donations page.");
      return;
    }

    try {
      setLoading(true);

      console.log("📤 Sending rating...");

      const res = await API.post("/ratings", {
        donation_id: donationId,
        donor_id: donorId,
        receiver_id: user?.id,
        rating: Number(rating),
        review,
      });

      console.log("✅ RESPONSE:", res.data);

      alert(res.data?.message || "Rating submitted");

      setRating(5);
      setReview("");

      navigate("/donations");

    } catch (err) {
      console.log("❌ ERROR:", err);
      alert(err.response?.data?.message || "Failed to submit rating");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <h2>⭐ Rate Donation</h2>

        <label>Rating (1 - 5)</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          style={styles.input}
        />

        <textarea
          placeholder="Write your review..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          style={styles.textarea}
        />

        <button
          onClick={submitRating}
          disabled={loading}
          style={{
            ...styles.button,
            opacity: loading ? 0.6 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Submitting..." : "Submit Rating"}
        </button>

      </div>
    </div>
  );
}

/* =========================
   STYLES
========================= */
const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f7f6",
  },

  card: {
    width: "400px",
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
  },

  textarea: {
    width: "100%",
    padding: "10px",
    height: "100px",
    marginBottom: "10px",
  },

  button: {
    width: "100%",
    padding: "10px",
    background: "#2e7d32",
    color: "white",
    border: "none",
    borderRadius: "6px",
  },
};