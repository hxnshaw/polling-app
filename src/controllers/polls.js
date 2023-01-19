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
    res.status(200).send(polls.rows);
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

module.exports = { createPoll, getAllPolls, singlePoll };
