// routes/donationRoutes.js

const router = require("express").Router();

const {
  getAllDonations,
  addDonation,
  deleteDonation,
  getUserDonations,
} = require("../controllers/donationController");

// GET all donations
router.get("/", getAllDonations);

// ADD donation
router.post("/", addDonation);

// DELETE donation
router.delete("/:id", deleteDonation);

// GET user donations
router.get("/user/:id", getUserDonations);

module.exports = router;