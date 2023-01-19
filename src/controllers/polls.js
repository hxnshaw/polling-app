const pool = require("../db");

const createPoll = async (req, res) => {
  const { title, descriptions } = req.body;
  res.send({ title, descriptions });
};

module.exports = createPoll;
