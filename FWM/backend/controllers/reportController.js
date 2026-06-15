const db = require("../config/db");

/* =========================
   GET REPORTS
========================= */
exports.getAllReports = async (req, res) => {
  try {
    const [result] = await db.query(`
      SELECT * FROM fake_reports
      ORDER BY report_id DESC
    `);

    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

/* =========================
   UPDATE REPORT STATUS (FIXED)
========================= */
exports.updateReportStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // ✅ ONLY VALID VALUES
    const allowed = ["pending", "reviewed", "action_taken"];

    if (!allowed.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value",
        allowed,
      });
    }

    await db.query(
      "UPDATE fake_reports SET status=? WHERE report_id=?",
      [status, id]
    );

    res.json({ message: "Report updated successfully" });
  } catch (err) {
    console.log("Update Report Error:", err);
    res.status(500).json(err);
  }
};
exports.reportFakeDonor = async (req, res) => {
  try {
    const {
      reported_donor_id,
      reported_by,
      donation_id,
      reason,
    } = req.body;

    await db.query(
      `INSERT INTO fake_reports
      (reported_donor_id, reported_by, donation_id, reason)
      VALUES (?, ?, ?, ?)`,
      [
        reported_donor_id,
        reported_by,
        donation_id,
        reason,
      ]
    );

    res.json({
      message: "Report submitted successfully",
    });

  } catch (err) {
    console.log("Report Error:", err);
    res.status(500).json(err);
  }
};