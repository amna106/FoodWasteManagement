const db = require("../config/db");

exports.addRating = async (req, res) => {
  console.log("🔥 ADD RATING API HIT");

  try {
    const {
      donation_id,
      donor_id,
      receiver_id,
      rating,
      review,
    } = req.body;

    console.log("📥 Data:", req.body);

    const sql = "CALL AddRating(?, ?, ?, ?, ?)";

    console.log("⏳ Calling Stored Procedure");

    const [result] = await db.query(sql, [
      donation_id,
      donor_id,
      receiver_id,
      rating,
      review,
    ]);

    console.log("✅ DB Result:", result);

    return res.status(200).json({
      success: true,
      message: "Rating Added Successfully",
    });

  } catch (err) {
    console.log("❌ DB ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Database error",
      error: err.message,
    });
  }
};