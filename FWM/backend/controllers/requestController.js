const db = require("../config/db");
const sendEmail = require("../utils/sendEmail");

/* =========================
   GET ALL REQUESTS
========================= */
exports.getAllRequests = async (req, res) => {
  try {
    const [result] = await db.query(`
      SELECT 
        fr.request_id,
        fr.donation_id,
        fr.receiver_id,
        fr.status,
        u.full_name
      FROM food_requests fr
      JOIN users u ON fr.receiver_id = u.id
    `);

    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err });
  }
};


/* =========================
   SEND FOOD REQUEST
========================= */
exports.sendFoodRequest = async (req, res) => {
  try {
    const { donation_id, receiver_id } = req.body;

    await db.query("CALL SendFoodRequest(?, ?)", [
      donation_id,
      receiver_id,
    ]);

    // 🔥 GET RECEIVER EMAIL
    const [user] = await db.query(
      "SELECT full_name, email FROM users WHERE id = ?",
      [receiver_id]
    );

    if (user.length > 0) {
      try {
        await sendEmail(
          user[0].email,
          "Food Request Submitted",
          `Hello ${user[0].full_name},

Your food request has been submitted successfully.

Donation ID: ${donation_id}

Please wait for donor approval.`
        );
      } catch (emailErr) {
        console.log("Email Error:", emailErr);
      }
    }

    res.json({ message: "Request Sent Successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error", error: err });
  }
};


/* =========================
   ACCEPT REQUEST
========================= */
exports.acceptRequest = async (req, res) => {
  try {
    const { request_id, donation_id } = req.body;

    await db.query("CALL AcceptRequest(?, ?)", [
      request_id,
      donation_id,
    ]);

    // 🔥 GET RECEIVER EMAIL
    const [receiver] = await db.query(`
      SELECT u.full_name, u.email
      FROM food_requests fr
      JOIN users u ON fr.receiver_id = u.id
      WHERE fr.request_id = ?
    `, [request_id]);

    if (receiver.length > 0) {
      try {
        await sendEmail(
          receiver[0].email,
          "Request Approved 🎉",
          `Hello ${receiver[0].full_name},

Good news! Your food request has been ACCEPTED.

You can now collect your food donation.`
        );
      } catch (emailErr) {
        console.log("Email Error:", emailErr);
      }
    }

    res.json({ message: "Request Accepted" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error", error: err });
  }
};


/* =========================
   COMPLETE DONATION
========================= */
exports.completeDonation = async (req, res) => {
  try {
    const { donation_id } = req.body;

    await db.query("CALL CompleteDonation(?)", [
      donation_id,
    ]);

    // 🔥 GET DONOR + RECEIVER INFO
    const [data] = await db.query(`
      SELECT 
        d.food_name,
        u1.full_name AS donor_name,
        u1.email AS donor_email,
        u2.full_name AS receiver_name,
        u2.email AS receiver_email
      FROM donations d
      JOIN users u1 ON d.donor_id = u1.id
      JOIN food_requests fr ON fr.donation_id = d.donation_id
      JOIN users u2 ON fr.receiver_id = u2.id
      WHERE d.donation_id = ?
      LIMIT 1
    `, [donation_id]);

    if (data.length > 0) {
      try {
        // Donor email
        await sendEmail(
          data[0].donor_email,
          "Donation Completed ✅",
          `Hello ${data[0].donor_name},

Your donation "${data[0].food_name}" has been completed successfully.

Thank you for your contribution.`
        );

        // Receiver email
        await sendEmail(
          data[0].receiver_email,
          "Donation Received 🎉",
          `Hello ${data[0].receiver_name},

You have successfully received the donation "${data[0].food_name}".

Enjoy & stay safe.`
        );

      } catch (emailErr) {
        console.log("Email Error:", emailErr);
      }
    }

    res.json({ message: "Donation Completed" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error", error: err });
  }
};