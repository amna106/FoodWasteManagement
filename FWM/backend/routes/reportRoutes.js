const router = require("express").Router();
const {
  getAllReports,
  updateReportStatus,
  reportFakeDonor
} = require("../controllers/reportController");


router.post("/report", reportFakeDonor);

router.get("/fake-reports", getAllReports);

router.put("/fake-reports/:id", updateReportStatus);

module.exports = router;