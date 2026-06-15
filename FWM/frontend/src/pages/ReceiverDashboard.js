import { useEffect, useState, useCallback } from "react";
import API from "../api";
import ReceiverNavbar from "../components/ReceiverNavbar";

const ReceiverDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [myRequests, setMyRequests] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  // Load donations
  const loadDonations = async () => {
    try {
      const res = await API.get("/donations");
      setDonations(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Load requests
  const loadMyRequests = useCallback(async () => {
    try {
      const res = await API.get(`/receiver/requests/${user.id}`);
      setMyRequests(res.data);
    } catch (err) {
      console.log(err);
    }
  }, [user.id]);

  useEffect(() => {
    loadDonations();
    loadMyRequests();
  }, [loadMyRequests]);

  // Send request
  const sendRequest = async (donation_id) => {
    try {
      await API.post("/food-requests", {
        donation_id,
        receiver_id: user.id,
      });

      alert("Request Sent Successfully");
      loadMyRequests();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={page}>
      <ReceiverNavbar />

      <div style={container}>
        {/* HEADER */}
        <div style={hero}>
          <h1 style={{ margin: 0 }}>
            Receiver Dashboard 🍽️
          </h1>
          <p style={subText}>
            Request available food donations and track status
          </p>
        </div>

        {/* DONATIONS */}
        <h2>Available Donations</h2>

        <div style={grid}>
          {donations.length > 0 ? (
            donations.map((item) => (
              <div key={item.donation_id} style={card}>
                <h3>{item.food_name}</h3>
                <p>Quantity: {item.quantity}</p>

                <button
                  style={btn}
                  onClick={() => sendRequest(item.donation_id)}
                >
                  Request Food
                </button>
              </div>
            ))
          ) : (
            <p>No donations available</p>
          )}
        </div>

        {/* REQUESTS */}
        <h2 style={{ marginTop: "30px" }}>My Requests</h2>

        <div style={grid}>
          {myRequests.length > 0 ? (
            myRequests.map((req) => (
              <div key={req.request_id} style={card2}>
                <p><b>Donation ID:</b> {req.donation_id}</p>

                <span style={status(req.status)}>
                  {req.status}
                </span>
              </div>
            ))
          ) : (
            <p>No requests yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReceiverDashboard;
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
  padding: "25px",
  borderRadius: "14px",
  marginBottom: "25px",
};

const subText = {
  marginTop: "8px",
  color: "#e9f5ef",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "15px",
};

const card = {
  background: "#fff",
  padding: "15px",
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};

const card2 = {
  background: "#fff",
  padding: "15px",
  borderRadius: "10px",
  borderLeft: "4px solid #289168",
};

const btn = {
  marginTop: "10px",
  padding: "8px 12px",
  background: "#289168",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const status = (s) => ({
  display: "inline-block",
  padding: "4px 10px",
  borderRadius: "20px",
  fontSize: "12px",
  background:
    s === "accepted"
      ? "#d1fae5"
      : s === "rejected"
      ? "#fee2e2"
      : s === "completed"
      ? "#dbeafe"
      : "#f3f4f6",
});