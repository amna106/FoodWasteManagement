const router = require("express").Router();

const {
  getUsers,
  blockUser,
  dashboardStats,
} = require("../controllers/adminController");

router.get("/users", getUsers);
router.put("/block/:id", blockUser);
router.get("/stats", dashboardStats);

module.exports = router;