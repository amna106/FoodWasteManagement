const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Static files
app.use("/uploads", express.static("uploads"));

/* =========================
   ROUTES
========================= */

app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/donations", require("./routes/donationRoutes"));
app.use("/api", require("./routes/foodRequestRoutes"));
app.use("/api/requests", require("./routes/requestRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));
app.use("/api/admin", require("./routes/adminFoodRoutes"));
app.use("/api/admin", require("./routes/adminUserRoutes"));
app.use("/api/emergency", require("./routes/emergencyRoutes"));
app.use("/api/ratings", require("./routes/ratingRoutes"));

/* =========================
   TEST ROUTE
========================= */

app.get("/", (req, res) => {
  res.send("Backend Running");
});

/* =========================
   SERVER START
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server Running on Port ${PORT}`);
});