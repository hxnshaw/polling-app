const pool = require("../db");

const createPoll = async (req, res) => {
  const { title, descriptions } = req.body;

  try {
    const data = await pool.query(`SELECT * FROM poll WHERE title=$1`, [title]);
    const arr = data.rows;
    if (arr.length != 0) {
      return res.status(400).json({
        error: "Poll already exists.",
      });
    } else {
      const poll = {
        title,
        descriptions,
      };
      pool.query(
        "INSERT INTO poll (title, descriptions) VALUES ($1,$2)",
        [poll.title, poll.descriptions],
        (err) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              error: err.message,
            });
          } else {
            res.status(201).send({ poll });
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllPolls = async (req, res) => {
  try {
    const polls = await pool.query(`SELECT * FROM poll`);
    const data = polls.rows;
    res.status(200).send({ count: data.length, data });
  } catch (error) {
    res.status(error.code).send(error.message);
  }
};

const singlePoll = async (req, res) => {
  const { id } = req.params;
  try {
    const poll = await pool.query(`SELECT * FROM poll WHERE id = $1`, [id]);
    res.status(200).send(poll.rows);
  } catch (error) {
    res.status(error.code).send(error.message);
  }
};

const updatePoll = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, descriptions } = req.body;
    const updatePoll = await pool.query(
      `UPDATE poll SET title=$1,descriptions=$2 WHERE id=$3 RETURNING *`,
      [title, descriptions, id]
    );
    const data = updatePoll.rows;
    res.status(200).send({ message: "Update Successful", data });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deletePoll = async (req, res) => {
  try {
    const { id } = req.params;
    const deletePoll = await pool.query(`DELETE FROM poll WHERE id=$1`, [id]);
    console.log(deletePoll.command);
    res.status(200).send({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  createPoll,
  getAllPolls,
  singlePoll,
  updatePoll,
  deletePoll,
};
