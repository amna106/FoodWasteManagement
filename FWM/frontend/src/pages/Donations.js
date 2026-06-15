import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Donations() {
  const [donations, setDonations] = useState([]);
  const [deliveryType, setDeliveryType] = useState("pickup");

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    loadDonations();
  }, []);

  const loadDonations = async () => {
    try {
      const res = await API.get("/donations");
      setDonations(res.data);
    } catch (err) {
      console.log("Load error:", err);
    }
  };

  // Request Food with Pickup/Delivery
  const requestFood = async (id) => {
    try {
      await API.post("/food-requests", {
        donation_id: id,
        receiver_id: user.id,
        delivery_type: deliveryType,
      });

      alert("Food Request Sent to Admin Successfully");
    } catch (err) {
      console.log("Request error:", err);
      alert("Request Failed");
    }
  };

  // Report Donor
  const reportDonor = (item) => {
    navigate("/report", {
      state: {
        donorId: item.donor_id,
        donationId: item.donation_id,
      },
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7f6",
        padding: "30px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#2e7d32",
          marginBottom: "30px",
        }}
      >
        Available Donations
      </h1>

      {donations.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            fontSize: "18px",
            color: "#666",
          }}
        >
          No Donations Available
        </p>
      ) : (
        donations.map((item) => (
          <div
            key={item.donation_id}
            style={{
              background: "#fff",
              maxWidth: "700px",
              margin: "15px auto",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h3
              style={{
                color: "#2e7d32",
                marginBottom: "10px",
              }}
            >
              {item.food_name}
            </h3>

            <p>
              <strong>Quantity:</strong> {item.quantity}
            </p>

            <p>
              <strong>Category:</strong> {item.category}
            </p>

            <p>
              <strong>Pickup Address:</strong> {item.pickup_address}
            </p>

            <p>
              <strong>Expiry:</strong>{" "}
              {new Date(item.expiry_time).toLocaleString()}
            </p>

            <p>
              <strong>Donor:</strong> {item.full_name}
            </p>

            {/* Pickup / Delivery Selection */}
            <div style={{ marginTop: "10px" }}>
              <label>
                <strong>Collection Type:</strong>
              </label>

              <br />

              <select
                value={deliveryType}
                onChange={(e) =>
                  setDeliveryType(e.target.value)
                }
                style={{
                  marginTop: "5px",
                  padding: "8px",
                  borderRadius: "6px",
                }}
              >
                <option value="pickup">
                  📦 Pickup
                </option>

                <option value="delivery">
                  🚚 Delivery
                </option>
              </select>
            </div>

            <div
              style={{
                marginTop: "15px",
                display: "flex",
                gap: "10px",
              }}
            >
              <button
                onClick={() =>
                  requestFood(item.donation_id)
                }
                style={{
                  background: "#2e7d32",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Request Food
              </button>

              <button
                onClick={() => reportDonor(item)}
                style={{
                  background: "#d32f2f",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Report Donor
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}