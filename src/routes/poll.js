const express = require("express");
const router = express.Router();
const { createPoll, getAllPolls, singlePoll } = require("../controllers/polls");

router.post("/", createPoll);
router.get("/", getAllPolls);
router.route("/:id").get(singlePoll);

module.exports = router;
