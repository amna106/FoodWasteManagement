const db = require("../config/db");
const sendEmail = require("../utils/sendEmail");

/* =========================
   CREATE EMERGENCY REQUEST
========================= */
exports.createEmergency = async (req, res) => {
  try {
    const {
      ngo_name,
      requested_by,
      emergency_type,
      food_required,
      quantity,
      location,
      contact_number,
      urgency_level,
    } = req.body;

    const sql = `
      INSERT INTO emergency_requests
      (
        ngo_name,
        requested_by,
        emergency_type,
        food_required,
        quantity,
        location,
        contact_number,
        urgency_level
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await db.query(sql, [
      ngo_name,
      requested_by,
      emergency_type,
      food_required,
      quantity,
      location,
      contact_number,
      urgency_level,
    ]);

    // 🔥 GET USER EMAIL
    const [user] = await db.query(
      "SELECT full_name, email FROM users WHERE id = ?",
      [requested_by]
    );

    if (user.length > 0) {
      try {
        await sendEmail(
          user[0].email,
          "Emergency Request Submitted 🚨",
          `Hello ${user[0].full_name},

Your emergency request has been successfully submitted.

Details:
NGO Name: ${ngo_name}
Emergency Type: ${emergency_type}
Food Required: ${food_required}
Quantity: ${quantity}
Urgency: ${urgency_level}

Our team will contact you soon.

Food Waste Management Team`
        );
      } catch (emailErr) {
        console.log("Email error:", emailErr);
      }
    }

    res.json({
      message: "Emergency Request Added",
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

/* =========================
   GET ALL EMERGENCY REQUESTS
========================= */
exports.getEmergency = async (req, res) => {
  try {
    const [result] = await db.query(
      "SELECT * FROM emergency_requests ORDER BY emergency_request_id DESC"
    );

    res.json(result);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};