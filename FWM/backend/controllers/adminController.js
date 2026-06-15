const db = require("../config/db");

/* =========================
   GET USERS
========================= */
exports.getUsers = async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM users");
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

/* =========================
   BLOCK USER
========================= */
exports.blockUser = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(
      "UPDATE users SET account_status='blocked' WHERE id=?",
      [id]
    );

    res.json({ message: "User Blocked Successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};

/* =========================
   DASHBOARD STATS
========================= */
exports.dashboardStats = async (req, res) => {
  try {
    const [result] = await db.query(`
      SELECT
      (SELECT COUNT(*) FROM users) AS users,
      (SELECT COUNT(*) FROM donations) AS donations,
      (SELECT COUNT(*) FROM emergency_requests) AS emergency,
      (SELECT COUNT(*) FROM fake_reports) AS reports
    `);

    res.json(result[0]);
  } catch (err) {
    res.status(500).json(err);
  }
};

/* =========================
   FOOD REQUESTS
========================= */
exports.getFoodRequests = async (req, res) => {
  try {
    const [result] = await db.query(`
      SELECT * FROM food_requests
      ORDER BY request_id DESC
    `);

    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateFoodRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, delivery_type } = req.body;

    if (delivery_type) {
      await db.query(
        "UPDATE food_requests SET delivery_type=? WHERE request_id=?",
        [delivery_type, id]
      );
    }

    if (status) {
      await db.query(
        "UPDATE food_requests SET status=? WHERE request_id=?",
        [status, id]
      );
    }

    res.json({ message: "Food Request Updated" });
  } catch (err) {
    res.status(500).json(err);
  }
};

/* =========================
   REPORTS (ADD THESE MISSING)
========================= */
exports.getAllReports = async (req, res) => {
  try {
    const [result] = await db.query(`
      SELECT * FROM fake_reports
      ORDER BY report_id DESC
    `);

    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateReportStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await db.query(
      "UPDATE fake_reports SET status=? WHERE report_id=?",
      [status, id]
    );

    res.json({ message: "Report Updated Successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};