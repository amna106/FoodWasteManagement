const router = require("express").Router();

const {
  addRating,
} = require("../controllers/ratingController");

router.post("/", addRating);

module.exports = router;