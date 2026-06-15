const sendEmail = require("../utils/sendEmail");
const db = require("../config/db");

/* =========================
   CREATE FOOD REQUEST
========================= */
exports.createFoodRequest = (req, res) => {
  const { donation_id, receiver_id, delivery_type } = req.body;

  const sql = `
    INSERT INTO food_requests 
    (
      donation_id,
      receiver_id,
      admin_id,
      delivery_type,
      status
    )
    VALUES (?, ?, 1, ?, 'pending')
  `;

  db.query(sql, [donation_id, receiver_id, delivery_type], (err) => {
    if (err) {
      return res.status(500).json(err);
    }

    // Get receiver email
    db.query(
      "SELECT full_name, email FROM users WHERE id = ?",
      [receiver_id],
      async (err2, result) => {
        if (!err2 && result.length > 0) {
          await sendEmail(
            result[0].email,
            "Food Request Submitted",
            `Hello ${result[0].full_name},

Your food request has been submitted successfully.

Delivery Type: ${delivery_type}
Request Status: Pending Approval

Please wait for admin/donor response.

Food Waste Management Team`
          );
        }
      }
    );

    res.json({
      message: "Request sent successfully",
    });
  });
};


/* =========================
   GET RECEIVER REQUESTS
========================= */
exports.getReceiverRequests = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT *
    FROM food_requests
    WHERE receiver_id = ?
    ORDER BY request_time DESC
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};


/* =========================
   ACCEPT REQUEST
========================= */
exports.acceptRequest = (req, res) => {
  const { request_id, donation_id } = req.body;

  db.query(
    "CALL AcceptRequest(?, ?)",
    [request_id, donation_id],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      // Get receiver email
      db.query(
        `
        SELECT u.full_name, u.email
        FROM food_requests fr
        JOIN users u ON fr.receiver_id = u.id
        WHERE fr.request_id = ?
        `,
        [request_id],
        async (err2, result) => {
          if (!err2 && result.length > 0) {
            await sendEmail(
              result[0].email,
              "Food Request Approved 🎉",
              `Hello ${result[0].full_name},

Congratulations! Your food request has been APPROVED.

You can now collect your food donation.

Food Waste Management Team`
            );
          }
        }
      );

      res.json({
        message: "Request Accepted",
      });
    }
  );
};


/* =========================
   COMPLETE DONATION
========================= */
exports.completeDonation = (req, res) => {
  const { donation_id } = req.body;

  db.query(
    "CALL CompleteDonation(?)",
    [donation_id],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Donation Completed",
      });
    }
  );
};