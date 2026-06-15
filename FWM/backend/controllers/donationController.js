const sendEmail = require("../utils/sendEmail");
const db = require("../config/db");

/* =========================
   AUTO EXPIRE FUNCTION
========================= */
const autoExpireDonations = async () => {
  try {
    await db.query(`
      UPDATE donations
      SET status = 'expired'
      WHERE expiry_time < NOW()
      AND status = 'available'
    `);
  } catch (err) {
    console.log("Auto expire error:", err);
  }
};

/* =========================
   GET ALL DONATIONS
========================= */
exports.getAllDonations = async (req, res) => {
  try {
    await autoExpireDonations();

    const sql = `
      SELECT donations.*, users.full_name
      FROM donations
      JOIN users ON donations.donor_id = users.id
      ORDER BY donations.donation_id DESC
    `;

    const [result] = await db.query(sql);

    res.json(result);

  } catch (err) {
    console.log("getAllDonations error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   ADD DONATION
========================= */
exports.addDonation = async (req, res) => {
  try {
    const {
      donor_id,
      food_name,
      category,
      quantity,
      expiry_time,
      pickup_address,
      latitude,
      longitude,
      image,
    } = req.body;

    const sql = `
      INSERT INTO donations (
        donor_id,
        food_name,
        category,
        quantity,
        expiry_time,
        pickup_address,
        latitude,
        longitude,
        image,
        status,
        approval_status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'available', 'pending')
    `;

    await db.query(sql, [
      donor_id,
      food_name,
      category,
      quantity,
      expiry_time,
      pickup_address,
      latitude,
      longitude,
      image,
    ]);

    // Get donor details
    const [users] = await db.query(
      "SELECT full_name, email FROM users WHERE id = ?",
      [donor_id]
    );

    if (users.length > 0) {
      try {
        await sendEmail(
          users[0].email,
          "Donation Added Successfully",
          `Hello ${users[0].full_name},

Your food donation has been added successfully.

Food: ${food_name}
Category: ${category}
Quantity: ${quantity}
Expiry Time: ${expiry_time}

Status: Pending Approval

Thank you for helping reduce food waste.

Food Waste Management Team`
        );
      } catch (emailErr) {
        console.log("Email failed:", emailErr);
      }
    }

    res.status(201).json({
      message: "Donation Added Successfully",
    });

  } catch (err) {
    console.log("addDonation error:", err);
    res.status(500).json({
      message: "Server error",
    });
  }
};

/* =========================
   DELETE DONATION
========================= */
exports.deleteDonation = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM donations WHERE donation_id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Donation not found",
      });
    }

    res.json({
      message: "Donation Deleted Successfully",
    });

  } catch (err) {
    console.log("deleteDonation error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   GET USER DONATIONS
========================= */
exports.getUserDonations = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "SELECT * FROM donations WHERE donor_id = ?",
      [id]
    );

    res.json(result);

  } catch (err) {
    console.log("getUserDonations error:", err);
    res.status(500).json({ message: "Server error" });
  }
};