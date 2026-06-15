import { useState } from "react";
import API from "../api";
import DonorNavbar from "../components/DonorNavbar";

const AddDonation = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    donor_id: user?.id,
    food_name: "",
    category: "",
    quantity: "",
    expiry_time: "",
    pickup_address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ VALIDATION (IMPORTANT)
    if (
      !formData.food_name ||
      !formData.category ||
      !formData.quantity ||
      !formData.expiry_time ||
      !formData.pickup_address
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...formData,
        expiry_time: formData.expiry_time ? formData.expiry_time : null,
      };

      const res = await API.post("/donations", payload);

      alert(res.data.message || "Donation Added Successfully");

      // reset form
      setFormData({
        donor_id: user?.id,
        food_name: "",
        category: "",
        quantity: "",
        expiry_time: "",
        pickup_address: "",
      });
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Error adding donation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={page}>
      <DonorNavbar />

      <div style={container}>
        <h1>Add Donation 🍱</h1>

        <form onSubmit={handleSubmit} style={form}>
          <input
            name="food_name"
            placeholder="Food Name"
            value={formData.food_name}
            onChange={handleChange}
            style={input}
          />

          <input
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            style={input}
          />

          <input
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            style={input}
          />

          <input
            type="datetime-local"
            name="expiry_time"
            value={formData.expiry_time}
            onChange={handleChange}
            style={input}
          />

          <input
            name="pickup_address"
            placeholder="Pickup Address"
            value={formData.pickup_address}
            onChange={handleChange}
            style={input}
          />

          <button type="submit" style={btn} disabled={loading}>
            {loading ? "Adding..." : "Add Donation"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDonation;

/* ================= STYLES ================= */

const page = {
  background: "#f5f7fb",
  minHeight: "100vh",
};

const container = {
  maxWidth: "500px",
  margin: "auto",
  padding: "20px",
};

const form = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const input = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  outline: "none",
};

const btn = {
  padding: "10px",
  background: "#289168",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};