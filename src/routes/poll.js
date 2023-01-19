const express = require("express");
const router = express.Router();
const {
  createPoll,
  getAllPolls,
  singlePoll,
  updatePoll,
} = require("../controllers/polls");

router.post("/", createPoll);
router.get("/", getAllPolls);
router.route("/:id").get(singlePoll).put(updatePoll);

module.exports = router;
