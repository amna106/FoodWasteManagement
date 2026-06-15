import { useEffect, useState } from "react";
import API from "../api";
import DonorNavbar from "../components/DonorNavbar";
import DonationCard from "../components/DonationCard";

const Dashboard = () => {
  const [donations, setDonations] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const res = await API.get("/donations");
      setDonations(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={page}>
      <DonorNavbar />

      <div style={container}>
        <div style={hero}>
          <h1 style={{ margin: 0 }}>
            Welcome, {user?.full_name || "Donor"} 👋
          </h1>
          <p style={subText}>
            Share surplus food and help reduce food waste 🍱
          </p>
        </div>

        <div style={sectionHeader}>
          <h2 style={{ marginBottom: "5px" }}>Available Donations</h2>
          <p style={{ margin: 0, color: "#777" }}>
            Browse all active food donations
          </p>
        </div>

        <div style={grid}>
          {donations.length > 0 ? (
            donations.map((donation) => (
              <DonationCard
                key={donation.donation_id}
                donation={donation}
              />
            ))
          ) : (
            <p style={{ color: "#777" }}>No donations available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

/* ================= STYLES ================= */

const page = {
  background: "#f5f7fb",
  minHeight: "100vh",
};

const container = {
  maxWidth: "1100px",
  margin: "auto",
  padding: "30px",
};

const hero = {
  background: "linear-gradient(135deg, #289168, #1e6f50)",
  color: "#fff",
  padding: "30px",
  borderRadius: "14px",
  marginBottom: "25px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
};

const subText = {
  marginTop: "10px",
  color: "#e9f5ef",
};

const sectionHeader = {
  marginBottom: "20px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
  gap: "20px",
};