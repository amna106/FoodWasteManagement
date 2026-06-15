import { useState } from "react";
import API from "../api";
import DonorNavbar from "../components/DonorNavbar";

const Emergency = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    ngo_name: "",
    requested_by: user?.id,
    emergency_type: "",
    food_required: "",
    quantity: "",
    location: "",
    contact_number: "",
    urgency_level: "High",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/emergency", formData);

      alert("Emergency Request Sent 🚨");

      setFormData({
        ngo_name: "",
        requested_by: user?.id,
        emergency_type: "",
        food_required: "",
        quantity: "",
        location: "",
        contact_number: "",
        urgency_level: "High",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={page}>
      <DonorNavbar />

      <div style={container}>
        {/* HEADER */}
        <div style={header}>
          <h1 style={{ margin: 0, color: "#b30000" }}>
            Emergency Request 🚨
          </h1>
          <p style={{ color: "#666" }}>
            Submit urgent food requirement for NGOs or disaster situations
          </p>
        </div>

        {/* FORM CARD */}
        <div style={card}>
          <form onSubmit={handleSubmit} style={form}>
            <input
              type="text"
              name="ngo_name"
              placeholder="NGO Name"
              value={formData.ngo_name}
              onChange={handleChange}
              style={input}
              required
            />

            <input
              type="text"
              name="emergency_type"
              placeholder="Emergency Type (Flood, Earthquake...)"
              value={formData.emergency_type}
              onChange={handleChange}
              style={input}
              required
            />

            <input
              type="text"
              name="food_required"
              placeholder="Food Required"
              value={formData.food_required}
              onChange={handleChange}
              style={input}
              required
            />

            <input
              type="text"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              style={input}
              required
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              style={input}
              required
            />

            <input
              type="text"
              name="contact_number"
              placeholder="Contact Number"
              value={formData.contact_number}
              onChange={handleChange}
              style={input}
              required
            />

            {/* URGENCY LEVEL */}
            <select
              name="urgency_level"
              value={formData.urgency_level}
              onChange={handleChange}
              style={select}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>

            <button
              type="submit"
              style={loading ? btnDisabled : btn}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Emergency Request"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Emergency;
const page = {
  background: "#f5f7fb",
  minHeight: "100vh",
};

const container = {
  maxWidth: "600px",
  margin: "auto",
  padding: "30px",
};

const header = {
  textAlign: "center",
  marginBottom: "20px",
};

const card = {
  background: "#fff",
  padding: "25px",
  borderRadius: "14px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  borderTop: "4px solid #e74c3c",
};

const form = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const input = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  outline: "none",
};

const select = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  background: "#fff",
};

const btn = {
  padding: "12px",
  background: "#e74c3c",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

const btnDisabled = {
  ...btn,
  background: "#f5a6a6",
  cursor: "not-allowed",
};