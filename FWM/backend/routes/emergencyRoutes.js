const router = require("express").Router();

const {
  createEmergency,
  getEmergency,
} = require("../controllers/emergencyController");

router.post("/", createEmergency);
router.get("/", getEmergency);

module.exports = router;
