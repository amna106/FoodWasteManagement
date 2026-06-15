const express = require("express");
const router = express.Router();

const {
  getFoodRequests,
  updateFoodRequest,
  getAllReports,
  updateReportStatus,
} = require("../controllers/adminController");

// FOOD REQUESTS
router.get("/food-requests", getFoodRequests);
router.put("/food-requests/:id", updateFoodRequest);

// REPORTS
router.get("/fake-reports", getAllReports);
router.put("/fake-reports/:id", updateReportStatus);

module.exports = router;