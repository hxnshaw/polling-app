const pool = require("../db");

const createPoll = async (req, res) => {
  const { title, descriptions } = req.body;
  //res.send({ title, descriptions });
  try {
    const data = await pool.query(`SELECT * FROM poll WHERE title=$1`, [
      ($1 = title),
    ]);
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

module.exports = createPoll;
