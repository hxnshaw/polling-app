const express = require("express");
const router = express.Router();
const createPoll = require("../controllers/polls");

router.post("/", createPoll);

module.exports = router;
