import { useNavigate } from "react-router-dom";

const DonationCard = ({ donation }) => {
  const navigate = useNavigate();

  return (
    <div className="card" style={styles.card}>

      <h2 style={styles.title}>
        {donation.food_name}
      </h2>

      <p>
        <strong>Category:</strong> {donation.category}
      </p>

      <p>
        <strong>Quantity:</strong> {donation.quantity}
      </p>

      <p>
        <strong>Address:</strong> {donation.pickup_address}
      </p>

      {/* ================= REPORT BUTTON ================= */}
      <button
        style={styles.reportBtn}
        onClick={() =>
          navigate("/report", {
            state: {
              donorId: donation.donor_id,
              donationId: donation.donation_id,
            },
          })
        }
      >
        🚨 Report Donor
      </button>

      {/* ================= RATE BUTTON ================= */}
      <button
        style={styles.rateBtn}
        onClick={() =>
          navigate("/add-rating", {
            state: {
              donorId: donation.donor_id,
              donationId: donation.donation_id,
            },
          })
        }
      >
        ⭐ Rate Donation
      </button>

    </div>
  );
};

export default DonationCard;

/* =========================
   SIMPLE STYLES
========================= */
const styles = {
  card: {
    background: "#fff",
    padding: "20px",
    margin: "15px auto",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    maxWidth: "500px",
  },

  title: {
    color: "#289168",
    marginBottom: "10px",
  },

  reportBtn: {
    marginTop: "10px",
    width: "100%",
    padding: "10px",
    background: "#39f085",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  rateBtn: {
    marginTop: "10px",
    width: "100%",
    padding: "10px",
    background: "#289168",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};