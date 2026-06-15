const router = require("express").Router();

const {
  getUsers,
  blockUser,
  dashboardStats,
  getFoodRequests,
  updateFoodRequest,
  getAllReports,
  updateReportStatus,
} = require("../controllers/adminController");

/* =========================
   USERS
========================= */
router.get("/users", getUsers);
router.put("/block/:id", blockUser);

/* =========================
   DASHBOARD
========================= */
router.get("/stats", dashboardStats);

/* =========================
   FOOD REQUESTS
========================= */
router.get("/food-requests", getFoodRequests);
router.put("/food-requests/:id", updateFoodRequest);

/* =========================
   REPORTS
========================= */
router.get("/fake-reports", getAllReports);
router.put("/fake-reports/:id", updateReportStatus);

module.exports = router;