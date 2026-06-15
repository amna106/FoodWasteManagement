import { useEffect, useState } from "react";
import API from "../api";

export default function MyDonations() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user?.id) {
      console.log("User not found");
      return;
    }
    API.get(`/donations/user/${user.id}`)
  .then((res) => {
    console.log("User ID:", user.id);
    console.log("Response:", res.data);
    setDonations(res.data);
  })

    
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const completeDonation = async (id) => {
    try {
      await API.post("/requests/complete", {
        donation_id: id,
      });

      alert("Donation Completed");

      setDonations((prev) =>
        prev.filter((d) => d.donation_id !== id)
      );
    } catch (error) {
      console.log(error);
      alert("Error completing donation");
    }
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
        My Donations
      </h1>

      {donations.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            fontSize: "18px",
            color: "#666",
          }}
        >
          No donations found
        </p>
      ) : (
        donations.map((donation) => (
          <div
            key={donation.donation_id}
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
              {donation.food_name}
            </h3>

            <p>
              <strong>Category:</strong> {donation.category}
            </p>

            <p>
              <strong>Quantity:</strong> {donation.quantity}
            </p>

            <p>
              <strong>Status:</strong> {donation.status}
            </p>

            <button
              onClick={() =>
                completeDonation(donation.donation_id)
              }
              style={{
                marginTop: "10px",
                background: "#2e7d32",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Complete Donation
            </button>
          </div>
        ))
      )}
    </div>
  );
}