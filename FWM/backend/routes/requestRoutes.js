const router = require("express").Router();

const {
  sendFoodRequest,
  acceptRequest,
  completeDonation,
  getAllRequests,
} = require("../controllers/requestController");

router.get("/", getAllRequests);
router.post("/send", sendFoodRequest);
router.post("/accept", acceptRequest);
router.post("/complete", completeDonation);

module.exports = router;