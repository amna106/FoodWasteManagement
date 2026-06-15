import { useEffect, useState } from "react";
import API from "../api";

export default function FoodRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const res = await API.get("/requests");
      console.log("Requests:", res.data);
      setRequests(res.data);
    } catch (err) {
      console.log("Error loading requests:", err);
    }
  };

  const acceptRequest = async (request_id, donation_id) => {
    try {
      await API.post("/requests/accept", {
        request_id,
        donation_id,
      });

      alert("Accepted");
      loadRequests();

    } catch (err) {
      console.log("Accept error:", err);
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
        Food Requests
      </h1>

      {requests.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            fontSize: "18px",
            color: "#666",
          }}
        >
          No Requests Found
        </p>
      ) : (
        requests.map((item) => (
          <div
            key={item.request_id}
            style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "15px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              maxWidth: "600px",
              margin: "15px auto",
            }}
          >
            <p>
              <strong>Request ID:</strong> {item.request_id}
            </p>

            <p>
              <strong>User:</strong> {item.full_name}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              <span
                style={{
                  color:
                    item.status === "accepted"
                      ? "green"
                      : item.status === "pending"
                      ? "orange"
                      : "red",
                  fontWeight: "bold",
                }}
              >
                {item.status}
              </span>
            </p>

            {item.status === "pending" && (
              <button
                onClick={() =>
                  acceptRequest(
                    item.request_id,
                    item.donation_id
                  )
                }
                style={{
                  background: "#2e7d32",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "15px",
                }}
              >
                Accept Request
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}