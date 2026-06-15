const router = require("express").Router();

const {
  createFoodRequest,
  getReceiverRequests,
} = require("../controllers/foodRequestController");

// Receiver sends request
router.post("/food-requests", createFoodRequest);

// Receiver sees own requests
router.get("/receiver/requests/:id", getReceiverRequests);

module.exports = router;